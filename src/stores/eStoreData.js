import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const eStoreData = defineStore('e-store-data', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_LOCAL_URI,
    apiKEY: import.meta.env.VITE_API_LOCAL_KEY,
    categoriesHeader: ['Category', 'Description', 'Action'],
    categories: [],
    errors: []
  }),

  actions: {

    async getAllCategories() {

      const response = await fetch(`${this.apiURI}/categories/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': this.apiKEY
        },
      });

      const result = await response.json();
      result.status !== 200 ? this.errors = result.errors : this.categories = result.data
    }

  }

});
