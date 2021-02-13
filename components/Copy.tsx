import { Transition } from '@headlessui/react';
import { useCallback } from 'react';
import { mutate } from 'swr';
import { useClipboard } from 'use-clipboard-copy';

interface CopyProps {
  text: string;
}

const formatUrl = (shortUrl: string) =>
  `${window.location.origin}/r/${shortUrl}`;

const Copy = ({ text }: CopyProps): JSX.Element => {
  const clipboard = useClipboard({
    copiedTimeout: 2000,
  });

  const handleClick = useCallback(() => {
    const url = formatUrl(text);
    clipboard.copy(url);
  }, [clipboard, text]);

  return (
    <div className="relative flex items-start">
      <a
        href={formatUrl(text)}
        target="_blank"
        rel="noreferrer"
        className="text-sm text-gray-900 underline"
        onClick={() => mutate('/api/shortUrl')}
      >
        {text}
      </a>
      {/* <div className="text-sm text-gray-900">{text}</div> */}
      <button
        className="ml-2 text-sm leading-4 text-gray-500 focus:outline-none"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      </button>
      <Transition
        show={clipboard.copied}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute ml-2 text-yellow-600">Copied!</div>
      </Transition>
    </div>
  );
};

export default Copy;
