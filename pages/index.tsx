import useSWR from 'swr';

import { Form } from '@/components/Form';
import { Table } from '@/components/Table';

const Home = (): JSX.Element => {
  const { data } = useSWR('/api/shortUrl');
  return (
    <div className="container mx-auto">
      <Form />
      <Table items={data} />
    </div>
  );
};

export default Home;
