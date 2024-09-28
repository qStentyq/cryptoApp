import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'X-RapidAPI-Key': 'c89ac127cbmsh6de8d55eb0d449ep1928edjsn55561c3e7d47',
  'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
};

const createRequest = (url:string) => ({ url, headers: cryptoApiHeaders });
const baseUrl = 'https://coinranking1.p.rapidapi.com';

let cryptoApiInstance:any = null;

const getCryptoApiInstance = () => {
  if (!cryptoApiInstance) {
    cryptoApiInstance = createApi({
      reducerPath: 'cryptoApi',
      baseQuery: fetchBaseQuery({ baseUrl }),
      endpoints: (builder) => ({
        getCryptos: builder.query({
          query: (count) => createRequest(`/coins?limit=${count}`),
        }),
      }),
    });
    return cryptoApiInstance;
  }
};

export const cryptoApi = getCryptoApiInstance();
export const {
  useGetCryptosQuery,
} = cryptoApi;


