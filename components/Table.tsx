import { DateTime } from 'luxon';
import { mutate } from 'swr';

import Copy from './Copy';

export interface TableItemProps {
  _id: string;
  longUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  updatedAt: string;
}

interface TableProps {
  items?: TableItemProps[];
}

export const DateEl = ({ date }: { date: string }): JSX.Element => {
  const parsed = DateTime.fromISO(date);
  const tooltip = parsed.toFormat('FF');
  const formatted = parsed.toFormat('yyyy-MM-dd');
  return (
    <>
      <div className="relative tooltip-wrapper">
        <div className="absolute top-0 -my-2 transition-opacity transform -translate-x-1/2 -translate-y-full opacity-0 left-1/2 whitespace-nowrap">
          <div className="px-4 py-1 text-xs text-white bg-black rounded bg-opacity-70 bottom-full">
            {tooltip}
            <svg
              className="absolute left-0 w-full h-2 text-black opacity-70 top-full"
              x="0px"
              y="0px"
              viewBox="0 0 255 255"
              xmlSpace="preserve"
            >
              <polygon
                className="fill-current"
                points="0,0 127.5,127.5 255,0"
              />
            </svg>
          </div>
        </div>
        <span className="inline-flex px-3 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
          {formatted}
        </span>
      </div>
      <style jsx>
        {`
          .tooltip-wrapper:hover > div {
            opacity: 1;
          }
        `}
      </style>
    </>
  );
};

export const Table = (props: TableProps): JSX.Element => {
  const { items } = props;

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
          <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 table-fixed">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Full Url
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Short Url
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Clicks
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                  >
                    Updated At
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items && items.length ? (
                  items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 max-w-30">
                        <div className="text-blue-500 truncate hover:text-blue-700">
                          <a
                            href={item.longUrl}
                            target="_blank"
                            rel="noreferrer"
                            className=""
                          >
                            {item.longUrl}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Copy text={item.shortUrl} />
                      </td>
                      <td className="px-6 py-4 text-center">{item.clicks}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">
                        <DateEl date={item.createdAt} />
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">
                        <DateEl date={item.updatedAt} />
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right">
                        <button
                          onClick={() => deleteUrl(item.shortUrl)}
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
                      No Data
                    </td>
                  </tr>
                )}
                {/* <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 w-10 h-10">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Jane Cooper
                        </div>
                        <div className="text-sm text-gray-500">
                          jane.cooper@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Regional Paradigm Technician
                    </div>
                    <div className="text-sm text-gray-500">Optimization</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    Admin
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </a>
                  </td>
                </tr> */}

                {/* <!-- More items... --> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
