import { useToasts } from '@geist-ui/react';
import { Toast } from '@geist-ui/react/dist/use-toasts/use-toast';
import { useSession } from 'next-auth/client';
import { ChangeEvent, FormEvent, useState } from 'react';
import { mutate } from 'swr';

import { ICode } from './ICode';

export const Form = (): JSX.Element => {
  const [url, setUrl] = useState('');
  const [, setToast] = useToasts();
  const [session, loading] = useSession();

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const showToast = (text: Toast['text'], type: Toast['type'] = 'default') => {
    setToast({ text, type, delay: 4000 });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!url) {
      showToast('Please input valid url!', 'warning');
    } else {
      const res = await fetch('/api/shortUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          longUrl: url,
        }),
      });
      if (res.ok) {
        showToast(
          <>
            <ICode text={url} />
            <span className="inline-block ml-1">
              has been added to your list.
            </span>
          </>
        );
      } else {
        const json = await res.json();
        showToast(json.error, 'error');
      }
      mutate('/api/shortUrl');
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-4">
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            name="url"
            id="url"
            className="block w-full px-4 py-3 pl-12 text-gray-900 placeholder-gray-400 bg-white border-0 rounded-md shadow-md appearance-none disabled:opacity-50 focus:outline-none focus:ring-0"
            placeholder={`${
              !session && !loading
                ? 'Login to shorten the link 😜'
                : 'URL to be shorten'
            }`}
            onChange={handleOnInputChange}
            disabled={!session && !loading}
            value={url}
          />
        </div>
        {/* <input
          type="text"
          name="url"
          id="url"
          className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 disabled:opacity-50"
          placeholder={`${
            !session && !loading ? 'Login to shorten the link 😜' : 'URL to be shorten'
          }`}
          onChange={handleOnInputChange}
          disabled={!session && !loading}
          value={url}
        /> */}
        <button
          className="flex items-center px-4 ml-2 text-white transition bg-indigo-500 rounded-md shadow-md select-none disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap hover:bg-indigo-600 focus:outline-none"
          type="submit"
          disabled={!session && !loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-5 h-5 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
          <span>Shorten</span>
        </button>
      </div>
    </form>
  );
};
