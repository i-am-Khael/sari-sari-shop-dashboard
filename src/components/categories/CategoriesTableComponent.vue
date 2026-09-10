
<script setup>
  import { onMounted, ref } from 'vue';
  import { eStoreData } from '@/stores/eStoreData';

  const store = new eStoreData();
  const categories = ref([]);

  const deleteCategory = async (id) => {
    await store.deleteCategory(id);
    await store.getAllCategories();
    categories.value = [...store.categories];
  }

  onMounted(async () => {
    await store.getAllCategories();
    categories.value = [...store.categories];
  });
</script>

<template>
	<div class="p-4 border rounded text-blue-950 border-blue-950 overflow-y-scroll">
	  <table class="w-full overflow-x-scroll">
			<thead>
			  <tr class="text-left">
			    <th>Category</th>
			    <th>Description</th>
			    <th>Action</th>
				</tr>
			</thead>
			<tbody>
  			<tr v-for="category in categories" :key="category.id" >
  			  <td>{{ category.category }}</td>
  			  <td>{{ category.category_desc }}</td>
  			  <td>
            <button class="cursor-pointer">Edit</button>
            <button class="cursor-pointer" @click="deleteCategory(category.id)" >Delete</button>
          </td>
  			</tr>
			</tbody>
		</table>

	</div>
</template>
