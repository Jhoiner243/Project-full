import useSWR from 'swr';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

const fetcher = (...args: [RequestInfo, RequestInit?]): Promise<User> =>
  fetch(...args).then((res) => res.json());

export const useUserSwr = () => {
  const { data, error, isLoading } = useSWR('http://localhost:3000/api/users', fetcher, {
    refreshInterval: 1000,
  });


  return {
    users: data,
    error,
    isLoading
  };
};
