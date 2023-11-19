import axios from 'axios';

class ParkingSpotService {
  constructor() {
    this.apiClient = axios.create({
      baseURL: import.meta.env.VITE_PARKINGSPOT_API_URL,
      // Você pode adicionar mais configurações aqui, como headers, etc.
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
}

export default new ParkingSpotService();

