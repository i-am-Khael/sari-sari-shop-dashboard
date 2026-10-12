<script setup>
import { utilities } from '@/composables/utilities';
import Button from './Button.vue';

const { formatMoney } = utilities();

const props = defineProps({
  columns: {
    type: Array,
    required: true
  },
  rows: {
    type: Array,
    required: true
  },
  rowKey: {
    type: String,
    default: 'id'
  },
  sortKey: {
    type: String,
    default: ''
  },
  sortDirection: {
    type: String,
    default: 'asc',
    validator: (value) => ['asc', 'desc'].includes(value)
  }
});

const emit = defineEmits(['sort']);

const handleSort = (column) => {
  if (!column.sortable) return;
  const direction = props.sortKey === column.key && props.sortDirection === 'asc' ? 'desc' : 'asc'
  emit('sort', { key: column.key, direction });
}

const setSortIcon = (column) => {
  if (props.sortKey !== column.key) return 'fa-solid fa-sort';
  return props.sortDirection === 'asc' ? 'fa-solid fa-sort-up' : 'fa-solid fa-sort-down';
}
</script>

<template>
	<div class="w-full rounded overflow-hidden">

	  <slot v-if="$slots.header" name="header"/>

		<div class="w-full overflow-x-auto">
  		<table class="w-full bg-slate-50">
  		  <thead class="bg-linear-to-r from-blue-950 to-blue-800">
  				<tr class="text-left text-sm uppercase tracking-wider text-slate-50">
  				  <th
  						v-for="column in props.columns"
  						:key="column.key"
  						:class="column.headerClass"
  						class="p-3 font-semibold"
  					>
  					  <slot
  							:name="`header-${column.key}`"
  							:column="column"
  						>
  						  <Button
  								v-if="column.sortable"
  								customClass="w-full uppercase text-left flex items-center cursor-pointer gap-1.5"
  								:label="column.label"
  								:sortIcon="true"
  								:iconName="setSortIcon(column)"
  								@click="handleSort(column)"
  							/>
  							<span v-else>{{ column.label }}</span>
  						</slot>
  					</th>
  				  <th
  						v-if="$slots.actions"
  						class="p-3 text-center font-semibold"
  					>
  					  <slot
  							name="actions-header"
  						>
  						  Actions
  						</slot>
  					</th>
  				</tr>
  			</thead>
  			<tbody
  			  v-if="rows.length"
  				class="divide-y divide-slate-300"
  			>
  			  <tr
  					v-for="row in props.rows"
  					:key="row[rowKey]"
  					class="hover:bg-slate-300"
  				>
  				  <td
  						v-for="column in props.columns"
  						:key="column.key"
  						:class="column.columnClass"
  						class="p-3"
  					>
  					  <slot
  							:name="column.key"
  							:row="row"
  							:value="row[column.key]"
  							:column="column"
  						>
  						  {{ column?.money ? `$${formatMoney(row[column.key])}` : row[column.key] }}
  						</slot>
  					</td>
  					<td
  					  v-if="$slots.actions"
  						class="w-full p-3 inline-flex items-center justify-center"
  					>
  					  <slot name="actions" :row="row"/>
  					</td>
  				</tr>
  			</tbody>
  			<tbody v-else class="bg-slate-50">
  			  <tr>
  					<td
  					  :colspan="columns.length + ($slots.actions ? 1 : 0)"
  						class="px-6 py-10 text-center text-slate-500"
  					>
  					  <slot name="empty">
  							No records found.
  						</slot>
  					</td>
  				</tr>
  			</tbody>
  		</table>
		</div>

		<slot v-if="$slots.pagination" name="pagination"/>

	</div>
</template>
