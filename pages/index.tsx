import { IUrlResponse } from 'models/Url';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { Form } from '@/components/Form';
import { Table } from '@/components/Table';
import fetcher from '@/utils/fetcher';

const Home = ({
  urls,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element => {
  return (
    <div className="container mx-auto">
      <div className="px-4">
        <h1 className="mb-2 text-2xl font-semibold tracking-wide text-gray-700 lg:mb-4 lg:text-4xl">
          Let&apos;s shorten the link{' '}
          <span role="img" aria-label="lightning bolt">
            ⚡
          </span>
        </h1>
        <Form />
        <Table urls={urls} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const urls = await fetcher<IUrlResponse[]>(
    `${process.env.NEXTAUTH_URL}/api/shortUrl`,
    {
      headers: req ? { cookie: req.headers.cookie } : undefined,
    }
  );

  return {
    props: { urls },
  };
};

export default Home;
