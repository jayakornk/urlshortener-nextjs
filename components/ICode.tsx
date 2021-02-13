import { Code } from '@geist-ui/react';

import { WithClassName } from '@/utils/withClassName';

type ICodeProps = WithClassName<{
  text: string;
}>;

export const ICode = ({ text, className }: ICodeProps): JSX.Element => {
  return (
    <span
      className={`inline-block px-2 py-1 border border-gray-200 rounded-md bg-gray-50 ${className}`}
    >
      <Code>{text}</Code>
    </span>
  );
};
