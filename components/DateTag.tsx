import { Tag } from '@geist-ui/react';
import { TagProps } from '@geist-ui/react/dist/tag/tag';
import { DateTime } from 'luxon';

interface DateTagProps {
  date: string;
  type: TagProps['type'];
}

const dateParser = (date: string) => {
  const d = DateTime.fromISO(date);
  return {
    shortDate: d.toFormat('yyyy-MM-dd'),
    longDate: d.toFormat('yyyy-MM-dd, hh:mm a'),
    tooltip: d.toFormat('FF'),
  };
};

export const DateTag = ({ date, type }: DateTagProps): JSX.Element => {
  const { shortDate, longDate, tooltip } = dateParser(date);
  return (
    <>
      <div className="relative inline-block text-center tooltip-wrapper">
        <div className="absolute top-0 z-10 -my-2 transition-opacity transform -translate-x-1/2 -translate-y-full opacity-0 left-1/2 whitespace-nowrap">
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
        <span className="xl:hidden">
          <Tag type={type}>{shortDate}</Tag>
        </span>
        <span className="hidden xl:block">
          <Tag type={type}>{longDate}</Tag>
        </span>
      </div>
      <style jsx>
        {`
          .tooltip-wrapper > div {
            pointer-events: none;
          }
          .tooltip-wrapper:hover > div {
            opacity: 1;
            pointer-events: auto;
          }
        `}
      </style>
    </>
  );
};
