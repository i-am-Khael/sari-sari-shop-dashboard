import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('useDashboardStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKEY: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    totals: {},
    sales: [],
    popularCategories: []
  }),

  actions: {

    async getTotals() {

      const response = await fetch(`${this.apiURI}/dashboard/totals`, {
        method: 'GET',
        headers: this.headers
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.totals = result.data;
      return;

    },


    async getSales(data) {

      const response = await fetch(`${this.apiURI}/dashboard/sales`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.sales = result.data;
      return;

    },


    async getPopularCategories() {

      const response = await fetch(`${this.apiURI}/dashboard/popular-categories`, {
        method: 'GET',
        headers: this.headers
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.popularCategories = result.data;
      return;

    }

  },

});
