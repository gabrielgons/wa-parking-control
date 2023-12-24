<template>
  <table class="table is-fullwidth is-striped is-hoverable">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key">
          {{ header.label }}
        </th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="header in headers" :key="header.key">
          {{ item[header.key] }}
        </td>
        <td>
          <button class="button is-small is-info" @click="editItem(item)">Edit</button>
          <button class="button is-small is-danger" @click="deleteItem(item)">Delete</button>

        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    headers: Array,
    data: Array
  },
  methods: {
    editItem(item) {
      this.$emit('edit-item', item);
    },
    deleteItem(item) {
      this.$emit('delete-item', item);
    }
  }
}
</script>