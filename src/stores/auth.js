import { defineStore } from "pinia";

export const useAuthStore = defineStore('useAuthStore', {

  state: () => ({
    uri: import.meta.env.VITE_API_URI,
    key: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': import.meta.env.VITE_API_KEY
    },
    isAuth: false
  }),

  actions: {

    async checkAuth() {

      const response = await fetch(`${this.uri}/auth/check`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok || result.status !== 200) {
        this.isAuth = false;
        return false;
      }

      this.auth = result.data.authenticated;

      return result.data.authenticated;

    },

    async login(data) {

      const response = await fetch(`${this.uri}/auth/login`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      return result;

    },


    async logout() {

      const response = await fetch(`${this.uri}/auth/logout`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include'
      });

      const result = await response.json()

      this.isAuth = result.data.authenticated;

      return result.data;

    }

  },

});
