import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
// import { RootState } from '../store/store';
import { ICustomer } from '../types/index';

export const openApi = createApi({
  reducerPath: 'openApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_ENDPOINT}`,
    prepareHeaders: (headers, { getState }) => {
      const customerEmail = (getState() as RootState).login.email;
      // If we have a token set in state, let's assume that we should be passing it.
      if (customerEmail) {
        headers.set('authorization', customerEmail);
      }
      return headers;
    },
  }),

  endpoints: (build) => ({
    getPreDefinedConfigurations: build.query<any, void>({
      query: () => ({ url: `/api/cpuConfig/PreDefinedConfigurations`, method: 'GET' }),
    }),
    sendUserData: build.query<any, ICustomer>({
      query: (bodyData) => ({
        headers: {
          'Content-type': 'application/json',
        },
        url: `/api/customer/profile`,
        method: 'POST',
        body: bodyData,
      }),
    }),
    getCustomerData: build.query<any, void>({
      query: () => ({ url: `/api/customer/profile`, method: 'GET' }),
    }),
  }),
});

export const { useGetPreDefinedConfigurationsQuery, useSendUserDataQuery } = openApi;
