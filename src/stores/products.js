import { defineStore } from "pinia";

export const useProductsStore = defineStore('useProductsStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_LOCAL_URI,
    apiKEY: import.meta.env.VITE_API_LOCAL_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_LOCAL_KEY
    },
    errors: [],
    products: [],
    columns: [
      {
        'key': 'image',
        'label': 'Image'
      },
      {
        'key': 'product',
        'label': 'Product',
        'sortable': true,
      },
      {
        'key': 'category',
        'label': 'Category',
        'sortable': true,
      },
      {
        'key': 'price',
        'label': 'Price',
        'sortable': true,
      },
      {
        'key': 'stock',
        'label': 'Stock',
        'sortable': true,
      },
      {
        'key': 'description',
        'label': 'Description',
      }
    ]
  }),

  actions: {

    async getAllProducts() {

      const response = await fetch(`${this.apiURI}/products/all`, {
        method: 'POST',
        headers: this.headers
      });

      const results = await response.json();

      if (results) this.products = results.data;

    },

  }

});
