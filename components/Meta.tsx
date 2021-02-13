import Head from 'next/head';

interface MetaProps {
  title: string;
  keywords: string;
  description: string;
}

export const Meta = ({
  title,
  keywords,
  description,
}: MetaProps): JSX.Element => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
      <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
      <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      <title>{title}</title>
    </Head>
  );
};

Meta.defaultProps = {
  title: 'JKA - Url Shortener',
  keywords: 'Url Shortener, JayakornK, Next.js, React',
  description: "Let's shorten the url",
};
