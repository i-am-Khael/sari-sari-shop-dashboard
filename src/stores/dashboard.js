import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('useDashboardStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKEY: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
      'X-CSRF-Token': ''
    },
    totals: {},
    sales: [],
    popularCategories: [],
    orders: []
  }),

  actions: {

    async getTotals() {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      // this.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/totals`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.totals = result.data;
      return;

    },


    async getSales(data) {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      this.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/sales`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.sales = result.data;
      return;

    },


    async getPopularCategories() {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      // this.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/categories/popular`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.popularCategories = result.data;
      return;

    },


    async getOrders() {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      // this.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/orders`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json();

      if (result.status !== 200) return result.errors;

      this.orders = result.data;
      return;

    }

  },

});
