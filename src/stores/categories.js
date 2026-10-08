import { defineStore } from 'pinia'

export const useCategoriesStore = defineStore('useCategoriesStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKEY: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    categories: [],
    columns: [
      {
        'key': 'category',
        'label': 'Category',
        'sortable': true
      },
      {
        'key': 'description',
        'label': 'Description'
      }
    ]
  }),

  actions: {

    async getAllCategories() {

      const response = await fetch(`${this.apiURI}/categories/all`, {
        method: 'GET',
        headers: this.headers
      });

      const results = await response.json();

      if (results.status === 200) this.categories = results.data;

    },

    async addCategory(data) {

      const response = await fetch(`${this.apiURI}/categories/add`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      const results = await response.json();

      if (results.status === 201) this.getAllCategories();

      return results;

    },

    async updateCategory(data) {

      const response = await fetch(`${this.apiURI}/categories/update`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      const results = await response.json();

      if (results.status === 200) this.getAllCategories();

      return results;

    },


  },

});
