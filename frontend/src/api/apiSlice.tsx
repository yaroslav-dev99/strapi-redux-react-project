import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api',
    prepareHeaders: (headers, { getState }) => {
        // const token = localStorage.getItem('token');
        // // const ss = getState();
        // // if((getState() as any).auth){
        // //     const token = (getState() as any).auth.token;
        // //     if (token) {
        // //       headers.set('Authorization', `Bearer ${token}`);
        // //     }
        // // }
        // //alert(token);
        // if (token) 
        //     headers.set('Authorization', `Bearer ${token}`);
        return headers;
      },
  
   }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({ url: '/auth/local/register', method: 'POST', body: data }),
    }),
    login: builder.mutation({
      query: (data) => ({ url: '/auth/local', method: 'POST', body: data }),
    }),
    getProducts: builder.query({
      query: () => '/products?populate=*',
    }),
    getCart: builder.query({
      query: (userId) => ({url: `/carts?populate[0]=Items&populate[1]=Items.product&populate[2]=Items.product.Image&filters[user]=${userId}`, method: 'GET'})
    }),
    createCart: builder.mutation({
      query: (payload) => ({ url: '/carts', method: 'POST', body: { data: payload },})
    }),
    addToCart: builder.mutation({
      query: ({ cartId, productId, quantity }) => ({
        url: `/carts/${cartId}`, // Assuming cartId exists
        method: 'PUT',
        body: {
          data: {
            items: {
              connect: [{ id: productId, quantity }]  // Assuming "items" is a relation
            }
          }
        },
      }),
    }),
    removeFromCart: builder.mutation({
      query: ({ cartId, productId }) => ({
        url: `/carts/${cartId}`, // Assuming cartId exists
        method: 'PUT',
        body: {
          data: {
            items: {
              disconnect: [{ id: productId }]  // Disconnect the product from the cart
            }
          }
        },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetProductsQuery, useGetCartQuery, useCreateCartMutation, useRemoveFromCartMutation, useAddToCartMutation } = apiSlice;
