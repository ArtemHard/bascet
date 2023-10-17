import axios from 'axios'

export const databaseApi = {
  // async getProductsFetch(token: string) {
  //   return fetch(
  //     'https://basket-e1373-default-rtdb.europe-west1.firebasedatabase.app/products.json?' +
  //       new URLSearchParams({
  //         auth: token,
  //       }),
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     }
  //   )
  // },
  async getProducts(token: string) {
    return axios.get(
      'https://basket-e1373-default-rtdb.europe-west1.firebasedatabase.app/products.json',
      {
        params: {
          auth: token,
        },
      }
    )
  },
}
