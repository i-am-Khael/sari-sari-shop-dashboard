<script setup>
import { ref } from 'vue';

const products = ref([]);
const errors = ref([]);

  const getAll = async () => {

    const response = await fetch('http://localhost:8000/api/products/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': ''
      }
    });

    const result = await response.json();

    result.status === 200 ? products.value = result.data : errors.value = result.errors;

  }

  getAll();
</script>

<template>
	<div>

	  <h1 class="mb-6">Product Lists</h1>

		<ul>
  		<li class="flex flex-col justify-center mb-4" v-for="product in products" >
        <span>ID: {{ product.id }}</span>
        <span>Product: {{ product.product }}</span>
        <span>Stock: {{ product.stock }}</span>
        <span>Price: ${{ product.price }}</span>
        <span>File: {{ product.filename }}</span>
      </li>
		</ul>

	</div>
</template>
