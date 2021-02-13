import { ChangeEvent, FormEvent, useState } from 'react';
import { mutate } from 'swr';

export const Form = (): JSX.Element => {
  const [url, setUrl] = useState('');

  const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await fetch('/api/shortUrl', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        longUrl: url,
      }),
    });
    mutate('/api/shortUrl');
    setUrl('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-4">
        <input
          type="text"
          name="url"
          id="url"
          className="block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="URL to be shorten"
          onChange={handleOnInputChange}
          value={url}
        />
        <button
          className="px-4 ml-2 text-white transition bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none"
          type="submit"
        >
          Shorten
        </button>
      </div>
    </form>
  );
};
