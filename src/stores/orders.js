import { defineStore } from 'pinia'

export const useOrderStore = defineStore('useOrderStore', {

  state: () => ({
    apiURI: import.meta.env.VITE_API_URI,
    apiKEY: import.meta.env.VITE_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': '',
      'X-CSRF-Token': ''
    },
    orders: [],
    columns: [
      {
        'key': 'order_id',
        'label': 'Order ID'
      },
      {
        'key': 'amount',
        'label': 'Amount',
        'money': true,
        'sortable': true,
        'columnClass': 'text-right'
      },
      {
        'key': 'shipping_fee',
        'label': 'Shipping Fee',
        'money': true,
        'columnClass': 'text-right'
      },
      {
        'key': 'total_amount',
        'label': 'Total Amount',
        'money': true,
        'sortable': true,
        'columnClass': 'text-right'
      },
      {
        'key': 'status',
        'label': 'Status',
        'sortable': true
      },
      {
        'key': 'order_date',
        'label': 'Order Date',
        'sortable': true
      },
    ],
    orderItemColumns: [
      {
        'key': 'filename',
        'label': 'Image'
      },
      {
        'key': 'product',
        'label': 'Product'
      },
      {
        'key': 'category',
        'label': 'Category'
      },
      {
        'key': 'price',
        'label': 'Price',
        'money': true,
      },
      {
        'key': 'quantity',
        'label': 'Quantity',
      },
    ]
  }),

  actions: {

    async getAllOrders() {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      // this.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/orders/all`, {
        method: 'GET',
        headers: this.headers,
        credentials: 'include'
      });

      const results = await response.json();

      if (results.status !== 200) return results.errors;

      this.orders = results.data;
      return;

    },


    async shipOrder(data) {

      this.headers['Authorization'] = `Bearer ${sessionStorage.getItem('bearer')}`;
      this.headers['X-CSRF-Token'] = sessionStorage.getItem('csrf');

      const response = await fetch(`${this.apiURI}/orders/ship`, {
        method: 'PATCH',
        headers: this.headers,
        credentials: 'include',
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (result.status === 200) {
        this.getAllOrders();
        return result;
      }

      return result.errors;

    }

  }

});
