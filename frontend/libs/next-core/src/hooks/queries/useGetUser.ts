import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import { fetchClient } from '../../providers/fetchClient';
import { User } from '../../types';

const fetchUser = () => {
  return fetchClient.get('/me').then((res) => res.data);
};

export const useGetUser = () => {
  return useQuery<User, AxiosError<{ message: string }>>(['user'], fetchUser);
};
