import { defineStore } from "pinia";

export const useProductsStore = defineStore('useProductsStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKEY: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
      'X-CSRF-Token': ''
    },
    errors: [],
    products: [],
    columns: [
      {
        'key': 'file',
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
        'money': true,
        'sortable': true,
        'columnClass': 'p-3 text-right'
      },
      {
        'key': 'stock',
        'label': 'Stock',
        'sortable': true,
        'columnClass': 'p-3 text-right'
      },
      {
        'key': 'description',
        'label': 'Description',
      },
      {
        'key': 'featured',
        'label': 'Featured'
      }
    ]
  }),

  actions: {

    async getAllProducts() {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      // this.headers['X-CSRF-Token'] = sessionStorage.getItem('dash');

      const response = await fetch(`${this.apiURI}/products`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include'
      });

      const results = await response.json();

      if (results.status === 200) this.products = results.data;

    },

    async addProduct(data) {

      const response = await fetch(`${this.apiURI}/products/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('bearer')}`,
          'X-CSRF-Token': sessionStorage.getItem('dash')
        },
        credentials: 'include',
        body: data
      });

      const results = await response.json();

      if (results.status === 201) await this.getAllProducts();

      return results;

    },

    async updateProduct(data) {

      const response = await fetch(`${this.apiURI}/products/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('bearer')}`,
          'X-CSRF-Token': sessionStorage.getItem('dash')
        },
        credentials: 'include',
        body: data
      });

      const results = await response.json();

      if (results.status === 200) await this.getAllProducts();

      return results;

    },

    async deleteProduct(id) {

      // const response = await fetch(`${this.apiURI}/products/delete`, {
      //   method: 'DELETE',
      //   headers: this.headers,
      //   credentials: 'include',
      //   body: JSON.stringify({ 'id': id })
      // });

      // const results = await response.json();

      // return results;

    }

  }

});
