import { useEffect } from 'react';
import { request } from 'graphql-request';

export function useRequest(dependencies, query, setCallback) {
  useEffect(() => {
    const fetch = async () => {
      const response = await request(
        'https://api-ap-south-1.graphcms.com/v2/ckww2dmcp75s701xm9owo36vm/master',
        `
        {
          ${query}
        }
        `
      );
      setCallback(response);
    };
    fetch()
      .catch(err => console.error(err));
  }, dependencies); // [] - runs on mount and unmount 
}