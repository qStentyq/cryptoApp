import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': 'c89ac127cbmsh6de8d55eb0d449ep1928edjsn55561c3e7d47',
    'X-RapidAPI-Host': 'news-api14.p.rapidapi.com'
  };

  
  let cryptoNewsApiInstance:any = null;
  const baseUrl = 'https://news-api14.p.rapidapi.com';

  const createRequest = (url:string) => ({ url, headers: cryptoNewsHeaders });

  const getCryptoNewsApiInstance = () => {
    if (!cryptoNewsApiInstance) {
        cryptoNewsApiInstance = createApi({
        reducerPath: 'cryptoNewsApi',
        baseQuery: fetchBaseQuery({ baseUrl }), 
        endpoints: (builder) => ({
          getNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/search?q=${newsCategory}&pageSize=${count}`),
          }),
        }),
      });
      return cryptoNewsApiInstance;
    }
  };

  export const cryptoNewsApi = getCryptoNewsApiInstance()
  export const { useGetNewsQuery } = cryptoNewsApi;