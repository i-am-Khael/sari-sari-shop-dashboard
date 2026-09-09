
<script setup>

  import { onMounted } from 'vue';
  import { eStoreData } from '@/stores/eStoreData';

  const store = new eStoreData();

  onMounted(() => {
    store.getAllCategories();
  })

</script>

<template>
	<div class="p-4 border rounded border-blue-950 overflow-y-scroll">
	  <table class="w-full overflow-x-scroll">
			<thead>
			  <tr class="">
					<th>Category</th>
					<th>Description</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
			  <tr v-for="category in store.categories" :key="category.id">
					<td>{{ category.category }}</td>
					<td>{{ category.description }}</td>
					<td>
					  <button>Edit</button>
					  <button>Delete</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
