import React from 'react';
import ErrorPage from '@/components/ErrorPage';

const Page = () => {
  return <ErrorPage statusCode={404} content="Page Not Found" />;
};

export default Page;
