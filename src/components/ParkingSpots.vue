<script>
import ParkingSpotsTable from './ParkingSpotsTable.vue'
import ParkingSpotService from '../services/parkingspot-service.js';
import parkingspotService from '../services/parkingspot-service.js';

export default {
  components: {
    ParkingSpotsTable
  },
  data() {
    return {
        parkingSpotModal: { },
        showModal:  false,
        isEditing: false,
        listaParkingspots: [
        {id: 'asasasaas', parkingSpotNumber:'123b'}
      ],
      headersParkingspot: [
        {key: 'responsibleName', label: 'Nome'}, 
        {key: 'parkingSpotNumber', label: 'Número'},
        {key: 'licensePlateCar', label: 'Placa'},
        {key: 'brandCar', label: 'Marca'},
        {key: 'apartment', label: 'Apartamento'},

    ],
    defaultParkingSpot : {       
        parkingSpotNumber: '',
        licensePlateCar: '',
        brandCar: '',
        modelCar: '',
        colorCar: '',
        responsibleName: '',
        apartment: '',
        block: '',
    },
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
  computed: {
    getTituloModal() {
      return this.isEditing? 'Editar' : 'Cadastrar';
    },
  },
  methods: {
    editar(parkingSpot) {      
      this.parkingSpotModal = parkingSpot? parkingSpot : this.defaultParkingSpot;      
      
      if(this.parkingSpotModal.id)
        this.isEditing = true;   

      this.showModal = true;
    },
    deletar(parkingSpot) {
      console.log('deletando');
      parkingspotService.delete(parkingSpot);
    },
    salvar(){
      parkingspotService.save(this.parkingSpotModal);  
      this.closeModal();
    },
    closeModal() {
      this.parkingSpotModal = {};
      console.log('passei no close');
      this.showModal = false;
      this.isEditing = false;
    },
    setParkingSpotNumber() {
      this.parkingSpotModal.parkingSpotNumber = `${this.parkingSpotModal.apartment}${this.parkingSpotModal.block}`;
      this.parkingSpotModal = Object.assign({}, this.parkingSpotModal)
    }
  }
}
</script>

<template>
  <div class="columns">
      <div class="column">
        <h1  class="green">Vagas</h1>
    </div>   
  </div>
  <div class="columns">
      <div class="column">
        <button class="button is-info" @click="editar">Cadastrar</button>
    </div>   
  </div>

    <ParkingSpotsTable :headers="headersParkingspot" :data="listaParkingspots" @edit-item="editar" @delete-item="deletar" ></ParkingSpotsTable>

    <div class="modal" v-bind:class="{ 'is-active': showModal }" id="crudModal">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">{{ getTituloModal }}</p>
      <button class="delete" aria-label="close" @click="closeModal()"></button>
    </header>
    <section class="modal-card-body">
    <!-- Linha 1 -->
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Nome</label>
          <div class="control">
            <input v-model="parkingSpotModal.responsibleName" class="input" type="text" placeholder="Nome do proprietário">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Número</label>
          <div class="control">
            <input v-model="parkingSpotModal.parkingSpotNumber" class="input" type="text" placeholder="Número da Vaga" disabled>
          </div>
        </div>
      </div>
      
    </div>
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Placa</label>
          <div class="control">
            <input v-model="parkingSpotModal.licensePlateCar" class="input" type="text" placeholder="Placa do veículo">
          </div>
        </div>        
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Apartamento</label>
          <div class="control">
            <input v-model="parkingSpotModal.apartment"  @change="definirParkingSpotNumber" class="input" type="text" placeholder="Número do apartamento" :disabled="isEditing">
          </div>
        </div>
      </div>
    </div>

    <!-- Linha 2 -->
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Bloco</label>
          <div class="control">
            <input v-model="parkingSpotModal.block" @change="definirParkingSpotNumber" class="input" type="text" placeholder="Bloco do apartamento" :disabled="isEditing">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Marca</label>
          <div class="control">
            <input v-model="parkingSpotModal.brandCar" class="input" type="text" placeholder="Marca do veículo">
          </div>
        </div>
      </div>
    </div>

    <!-- Linha 3 -->
    <div class="columns">
      <div class="column">
        <div class="field">
          <label class="label">Modelo</label>
          <div class="control">
            <input v-model="parkingSpotModal.modelCar" class="input" type="text" placeholder="Modelo do veículo">
          </div>
        </div>
      </div>
      <div class="column">
        <div class="field">
          <label class="label">Cor</label>
          <div class="control">
            <input v-model="parkingSpotModal.colorCar" class="input" type="text" placeholder="Cor do veículo">
          </div>
        </div>
      </div>
    </div>    
  </section>
    <footer class="modal-card-foot">
      <button class="button is-success" @click="salvar()">Salvar</button>
      <button class="button" @click="closeModal()">Cancelar</button>
    </footer>
  </div>
</div>

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
