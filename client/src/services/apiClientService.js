import axios from 'axios';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../.env') });

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000';

class ApiClientService {
  constructor () {
    this.client = axios.create({
      baseURL: BASE_URL,
    });
  }

  getImageById (id) {
    return this.client.get(`/image/${id}`);
  }

  getRandomImage () {
    return this.client.get('/image/random');
  }

  postScore (id, code) {
    return this.client.post(`/score/${id}`, { code });
  }
}

export default new ApiClientService();
