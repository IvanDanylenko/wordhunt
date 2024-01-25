import { useQuery } from 'react-query';
import axios, { AxiosError } from 'axios';
import { chineseSuggestionsKeys } from './queryKeys';

export interface UseGetChineseSuggestionsParams {
  text: string;
  count?: number;
}

const fetchChineseSuggestions = (params: UseGetChineseSuggestionsParams) => {
  const { text, count = 5 } = params;

  return axios
    .get('https://inputtools.google.com/request', {
      params: {
        text,
        itc: 'zh-t-i0-pinyin',
        num: count,
      },
    })
    .then((res) => {
      return res.data[1][0][1];
    });
};

export const useGetChineseSuggestions = (params: UseGetChineseSuggestionsParams) => {
  return useQuery<string[], AxiosError>(
    chineseSuggestionsKeys.list({ filter: params }),
    () => fetchChineseSuggestions(params),
    {
      enabled: !!params.text,
      staleTime: Infinity,
    },
  );
};
