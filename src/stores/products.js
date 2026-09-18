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
        'key': 'filename',
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
        method: 'GET',
        headers: this.headers
      });

      const results = await response.json();
      if (results) this.products = results.data;

    },


    async addProduct(data) {

      const response = await fetch(`${this.apiURI}/products/add`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': this.apiKEY
        },
        body: data
      });

      const results = await response.json();
      if (results) this.getAllProducts();

    },

    async deleteProduct(id) {

      const response = await fetch(`${this.apiURI}/products/delete`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify({ 'id': id })
      });

      const result = await response.json();

      if (result) this.getAllProducts();

    }

  }

});
