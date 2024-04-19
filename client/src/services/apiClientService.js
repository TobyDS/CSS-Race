import axios from 'axios';

const BASE_URL = import.meta.VITE_API_BASE_URL || 'http://localhost:3000';

class ApiClientService {
  constructor () {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  }

  async getImageById (id) {
    try {
      const response = await this.client.get(`/image/${id}`);
      const image = response.data;
      return image;
    } catch (error) {
      console.error('Failed to fetch image', error);
      return null;
    }
  }

  async getRandomImage () {
    try {
      const response = await this.client.get('/image/random');
      const image = response.data;
      return image;
    } catch (error) {
      console.error('Failed to fetch image', error);
      return null;
    }
  }

  async postScore (id, code) {
    try {
      const response = await this.client.post(`/score/${id}`, { code });
      const image = response.data;
      return image;
    } catch (error) {
      console.error('Failed to fetch image', error);
      return null;
    }
  }
}

export default new ApiClientService();
