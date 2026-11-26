import { defineStore } from "pinia";

export const useCategoriesStore = defineStore('useCategoriesStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKEY: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
      'X-CSRF-Token': ''
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
        'label': 'Alcohol Beverages',
        'icon': 'alcohol-beverages.svg'
      },
      {
        'label': 'Bags and Accessories',
        'icon': 'bag-and-accessories.svg'
      },
      {
        'label': 'Books',
        'icon': 'books.svg'
      },
      {
        'label': 'Clothings',
        'icon': 'clothes.svg'
      },
      {
        'label': 'Drinks',
        'icon': 'drinks.svg'
      },
      {
        'label': 'Electronics',
        'icon': 'electronics.svg'
      },
      {
        'label': 'Fruits',
        'icon': 'fruits.svg'
      },
      {
        'label': 'Furnitures',
        'icon': 'furnitures.svg'
      },
      {
        'label': 'Garden Tools',
        'icon': 'garden-tools.svg'
      },
      {
        'label': 'Health and Wellness',
        'icon': 'health-and-wellness.svg'
      },
      {
        'label': 'Meats',
        'icon': 'meats.svg'
      },
      {
        'label': 'Pastries',
        'icon': 'pastries.svg'
      },
      {
        'label': 'Personal Care',
        'icon': 'personal-care.svg'
      },
      {
        'label': 'Pet Supplies',
        'icon': 'pets.svg'
      },
      {
        'label': 'Seafoods',
        'icon': 'seafoods.svg'
      },
      {
        'label': 'Shoes and Footwears',
        'icon': 'shoes.svg'
      },
      {
        'label': 'Sports and Fitness',
        'icon': 'sport-and-fitness.svg'
      },
      {
        'label': 'Tools',
        'icon': 'tools.svg'
      },
      {
        'label': 'Toys',
        'icon': 'toys.svg'
      },
      {
        'label': 'Vegetables',
        'icon': 'vegetables.svg'
      },
      {
        'label': 'Vehicles',
        'icon': 'vehicles.svg'
      },
    ]
  }),

  actions: {

    async getAllCategories() {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      // this.headers['X-CSRF-Token'] = sessionStorage.getItem('dash');

      const response = await fetch(`${this.apiURI}/categories/all`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include'
      });

      const results = await response.json();

      if (results.status === 200) this.categories = results.data;

    },

    async addCategory(data) {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      this.headers['X-CSRF-Token'] = sessionStorage.getItem('dash');

      const response = await fetch(`${this.apiURI}/categories/add`, {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const results = await response.json();

      if (results.status === 201) this.getAllCategories();

      return results;

    },

    async updateCategory(data) {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      this.headers['X-CSRF-Token'] = sessionStorage.getItem('dash');

      const response = await fetch(`${this.apiURI}/categories/update`, {
        method: 'PATCH',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const results = await response.json();

      if (results.status === 200) this.getAllCategories();

      return results;

    },


  },

});
