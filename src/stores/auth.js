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
    },

    async login(data) {
      const response = await fetch(`${this.uri}/api/auth/login`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      return result;
    }

  },

});
