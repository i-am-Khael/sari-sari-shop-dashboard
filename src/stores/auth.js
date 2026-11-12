import { defineStore } from "pinia";

export const useAuthStore = defineStore('useAuthStore', {

  state: () => ({
    uri: import.meta.env.VITE_API_URI,
    isAuth: false
  }),

  actions: {

    async checkAuth() {

      const response = await fetch(`${this.uri}/auth/check`, {
        method: 'POST',
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok || result.status !== 200) return false;

      return result.data.authenticated;

    },


    async loadCSRF() {

      const response = await fetch(`${this.uri}/auth/csrf`, {
        method: 'GET',
        credentials: 'include'
      });

      const result = await response.json();

      if (!response.ok) throw new error('could not load CSRF token');

      sessionStorage.setItem('csrf', result.data.csrf);

      return result.data.csrf ?? '';

    },


    async login(data) {

      const response = await fetch(`${this.uri}/auth/login`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": sessionStorage.getItem('csrf')
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) return result.errors;

      sessionStorage.setItem('id', result.data.id);
      sessionStorage.setItem('bearer', result.data.bearer);
      sessionStorage.setItem('csrf', result.data.csrf);

      return result;

    },


    async logout() {

      const response = await fetch(`${this.uri}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionStorage.getItem('bearer')}`,
          'X-CSRF-Token': sessionStorage.getItem('csrf')
        },
        credentials: 'include'
      });

      const result = await response.json()
      this.isAuth = result.data.authenticated;

      await this.loadCSRF();

      return result.data.authenticated ?? false;

    }

  },

});
