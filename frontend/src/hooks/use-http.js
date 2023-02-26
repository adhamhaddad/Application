import { useState, useCallback } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const sendRequest = useCallback(async (url, method, body, cb) => {
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer {token}`
        },
        body: method === 'GET' ? null : JSON.stringify(body)
      });
      const data = response.json();
      if (!data.status) {
        throw new Error(data.message);
      }
      return cb !== null && cb(data);
    } catch (err) {
      setIsLoading(false);
      setIsError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    isError,
    sendRequest
  };
};
export default useHttp;
