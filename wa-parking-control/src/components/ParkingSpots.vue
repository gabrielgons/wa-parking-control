<script>
import ParkingSpotsTable from './ParkingSpotsTable.vue'
import ParkingSpotService from '../services/parkingspot-service.js';

export default {
  components: {
    ParkingSpotsTable
  },
  data() {
    return {
        listaParkingspots: [
        {id: 'asasasaas', parkingSpotNumber:'123b'}
      ],
      headersParkingspot: [
        {key: 'responsibleName', label: 'Nome'}, 
        {key: 'parkingSpotNumber', label: 'Número'}
    ]
    }
  },
  async created() {
    try {
      const responseData = await ParkingSpotService.list();
      this.listaParkingspots = responseData.content;
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  },
  methods: {
    editUser(user) {
      // lógica para editar
    },
    deleteUser(user) {
      // lógica para deletar
    }
  }
}
</script>

<template>
    <h1  class="green">Cadastros</h1>
    <ParkingSpotsTable :headers="headersParkingspot" :data="listaParkingspots"></ParkingSpotsTable>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
