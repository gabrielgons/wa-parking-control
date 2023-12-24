import axios from 'axios';

class ParkingSpotService {
  baseUrl =  import.meta.env.VITE_PARKINGSPOT_API_URL;
  constructor() {
    this.apiClient = axios.create({
      baseURL: import.meta.env.VITE_PARKINGSPOT_API_URL
    });
  }

  async list() {
    try {
      const response = await this.apiClient.get('parking-spot');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error;
    }
  }

  async save(data) {    
    var options = this.getOptions(data && data.id? 'PUT' :  'POST');  
    options.data = data;

    this.executeRequest(options);  
  }

  async delete(data){
    var options = this.getOptions('DELETE');
    options.url = `${options.url}/${data.id}`

    this.executeRequest(options);
    this.list();
  }

  executeRequest(options) {
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  getOptions(method){
    return {
      method,
      url: `${this.baseUrl}parking-spot`,
      headers: {'Content-Type': 'application/json'},
    };
  }
}

export default new ParkingSpotService();

