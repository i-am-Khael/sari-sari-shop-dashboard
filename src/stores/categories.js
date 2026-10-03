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
    ],
    icons: [
      {
        label: 'Groceries',
        icon: 'fa-solid fa-basket-shopping'
      },
      {
        label: 'Drinks',
        icon: 'fa-solid fa-bottle-water'
      },
      {
        label: 'Clothing',
        icon: 'fa-solid fa-shirt'
      },
      {
        label: 'Household',
        icon: 'fa-solid fa-house'
      },
      {
        label: 'Personal Care',
        icon: 'fa-solid fa-heart'
      },
      {
        label: 'Automotive',
        icon: 'fa-solid fa-car'
      },
      {
        label: 'Fruits',
        icon: 'fa-solid fa-apple-whole'
      },
      {
        label: 'Plants',
        icon: 'fa-solid fa-seedling'
      },
      {
        label: 'Vegetables',
        icon: 'fa-solid fa-leaf'
      },
      {
        label: 'Utensils',
        icon: 'fa-solid fa-utensils'
      },
      {
        label: 'Birthday',
        icon: 'fa-solid fa-cake-candles'
      },
      {
        label: 'Alcoholic Beverages',
        icon: 'fa-solid fa-wine-bottle'
      },
      {
        label: 'Meat 1',
        icon: 'fa-solid fa-fish-fins'
      },
      {
        label: 'Meat 2',
        icon: 'fa-solid fa-drumstick-bite'
      },
      {
        label: 'Pets',
        icon: 'fa-solid fa-paw'
      },
      {
        label: 'Sports',
        icon: 'fa-solid fa-basketball'
      },
      {
        label: 'Technologies',
        icon: 'fa-solid fa-microchip'
      },
      {
        label: 'Smartphones',
        icon: 'fa-solid fa-mobile-screen-button'
      },
      {
        label: 'Hardwares',
        icon: 'fa-solid fa-screwdriver-wrench'
      },
      {
        label: 'Jewelries',
        icon: 'fa-solid fa-gem'
      },
    ],
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
