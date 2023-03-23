import axios from 'axios';
import { MICROSERVICE_URL } from '../../config';
export class StakingService {
  constructor() {}

  async fetchUsers(): Promise<string[]> {
    try {
      const { data } = await axios.get(MICROSERVICE_URL + '/stake/users');
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async fetchSftsAllowed(): Promise<number[]> {
    try {
      const { data } = await axios.get(MICROSERVICE_URL + '/stake/sftsAllowed');
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
