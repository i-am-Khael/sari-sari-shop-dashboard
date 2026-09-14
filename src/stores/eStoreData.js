import { defineStore } from 'pinia'

export const eStoreData = defineStore('e-store-data', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_LOCAL_URI,
    apiKEY: import.meta.env.VITE_API_LOCAL_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_LOCAL_KEY
    },
    products: [],
    categoriesColumn: [
      {
        'key': 'category',
        'label': 'Category',
        'sortable': true
      },
      {
        'key': 'category_desc',
        'label': 'Description'
      }
    ],
    categories: [],
    errors: {}
  }),

  actions: {

    async getAllCategories() {

      const response = await fetch(`${this.apiURI}/categories/all`, {
        method: 'GET',
        headers: this.headers
      });

      const result = await response.json();
      result.status !== 200 ? this.errors = result.errors : this.categories = result.data
    },

    async addCategory(data) {

      const response = await fetch(`${this.apiURI}/categories/add`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result) this.getAllCategories();

    },

    async editCategory(data) {

      const response = await fetch(`${this.apiURI}/categories/update`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result) this.getAllCategories();

    },

    async deleteCategory(id) {

      const response = await fetch(`${this.apiURI}/categories/delete`, {
        method: 'DELETE',
        headers: this.headers,
        body: JSON.stringify({ id: id })
      });

      const result = await response.json();

      if (result.status === 200) {
        await this.getAllCategories();
      } else {
        this.errors = result.errors;
      }

    }


  },

});
