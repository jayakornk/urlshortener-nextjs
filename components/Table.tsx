import { Loading } from '@geist-ui/react';
import { mutate } from 'swr';

import Copy from './Copy';
import { DateTag } from './DateTag';
import { useShortUrl, UseShortUrlReturn } from './useShortUrl';

export const Table = ({
  urls: serverUrls,
}: {
  urls: UseShortUrlReturn['urls'];
}): JSX.Element => {
  const { urls, isLoading } = useShortUrl(serverUrls);

  const deleteUrl = async (shortUrl: string) => {
    await fetch(`/api/shortUrl/${shortUrl}`, {
      method: 'DELETE',
    });
    mutate('/api/shortUrl');
  };
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden overflow-y-auto border-b border-gray-200 shadow sm:rounded-lg urls-table">
            <table className="relative min-w-full border-collapse divide-y divide-gray-200 table-fixed">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase shadow-th bg-gray-50"
                  >
                    Full Url
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase shadow-th bg-gray-50"
                  >
                    Short Url
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase shadow-th bg-gray-50"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase shadow-th bg-gray-50"
                  >
                    Updated At
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase shadow-th bg-gray-50 lg:table-cell"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-6 py-3 shadow-th bg-gray-50"
                  >
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {urls && urls.length > 0 ? (
                  urls.map((url) => (
                    <tr key={url._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 max-w-30">
                        <div className="truncate transition-colors duration-200 text-link hover:text-link-hover">
                          <a
                            href={url.longUrl}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {url.longUrl}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Copy text={url.shortUrl} />
                      </td>
                      <td className="px-6 py-4 text-center">{url.clicks}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500 whitespace-nowrap">
                        <DateTag date={url.updatedAt} type="warning" />
                      </td>
                      <td className="hidden px-6 py-4 text-sm text-center text-gray-500 lg:table-cell">
                        <DateTag date={url.createdAt} type="success" />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right">
                        <button
                          onClick={() => deleteUrl(url.shortUrl)}
                          className="text-red-600 hover:text-red-900 focus:outline-none"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-4 text-center text-gray-300 whitespace-nowrap"
                    >
                      {isLoading ? <Loading>Loading</Loading> : 'No Data'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .urls-table {
            max-height: calc(100vh - 266px);
          }
        `}
      </style>
    </div>
  );
};
