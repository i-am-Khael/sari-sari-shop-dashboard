<script setup>
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
  }
});
</script>

<template>
	<div class="w-full rounded overflow-scroll">

	  <slot v-if="$slots.header" name="header" />

		<table class="w-full overflow-x-scroll bg-slate-50">
		  <thead class="bg-linear-to-r from-blue-950 to-blue-800">
				<tr class="text-left text-sm uppercase tracking-wider text-slate-50">
				  <th
						v-for="column in props.columns"
						:key="column.key"
						:class="column.headerClass"
						class="p-4 font-semibold"
					>
					  <slot
							:name="`header-${column.key}`"
							:column="column"
						>
						  {{ column.label }}
						</slot>
					</th>
				  <th
						v-if="$slots.actions"
						class="p-4 text-center font-semibold"
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
						class="p-4"
					>
					  <slot
							:name="column.key"
							:row="row"
							:value="row[column.key]"
							:column="column"
						>
						  {{ row[column.key] }}
						</slot>
					</td>
					<td
					  v-if="$slots.actions"
						class="p-4"
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

		<slot name="pagination" />

	</div>
</template>
