import { Link, useClipboard, useToasts } from '@geist-ui/react';
// import { Transition } from '@headlessui/react';
import { useCallback } from 'react';

// import { useClipboard } from 'use-clipboard-copy';
import { ICode } from './ICode';

interface CopyProps {
  text: string;
}

const formatUrl = (shortUrl: string) =>
  `${process.env.NEXT_PUBLIC_HOST}/r/${shortUrl}`;

const Copy = ({ text }: CopyProps): JSX.Element => {
  const [, setToast] = useToasts();
  const { copy } = useClipboard();
  // const clipboard = useClipboard({
  //   copiedTimeout: 2000,
  // });

  const handleClick = useCallback(() => {
    const url = formatUrl(text);
    // clipboard.copy(url);
    copy(url);
    setToast({
      text: (
        <>
          <span className="inline-block mr-1">Copied!</span>
          <ICode className="text-yellow-500" text={url} />
        </>
      ),
    });
  }, [copy, text]);
  // }, [clipboard, text]);

  return (
    <div className="relative flex items-end">
      <Link
        href={formatUrl(text)}
        target="_blank"
        rel="noreferrer"
        className="font-mono text-sm text-gray-900 underline"
        underline
      >
        {text}
      </Link>
      <button
        className="h-6 ml-2 text-sm text-gray-500 focus:outline-none"
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      </button>
      {/* <Transition
        show={clipboard.copied}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="absolute ml-2 text-yellow-600 transform -translate-y-1/2 top-1/2">
          Copied!
        </div>
      </Transition> */}
    </div>
  );
};

export default Copy;
