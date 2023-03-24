import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import axios from 'axios';
import { API_URL, COLLECTION_IDENTIFIER, MICROSERVICE_URL } from '../../config';
import { SFTStaked } from '../../utils/types/SftsStaked';
class AccountService {
  constructor() {}

  async fetchSfts(address: string): Promise<NftType[]> {
    try {
      const { data } = await axios.get(
        API_URL +
          '/accounts/' +
          address +
          '/nfts?collection=' +
          COLLECTION_IDENTIFIER
      );
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async fetchSftsStaked(address: string): Promise<SFTStaked[]> {
    try {
      const { data } = await axios.get(
        MICROSERVICE_URL + '/stake/users/' + address
      );
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async fetchRewards(address: string): Promise<number> {
    try {
      const { data } = await axios.get(
        MICROSERVICE_URL + '/stake/users/' + address + '/rewards'
      );
      return data;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }
}

export default AccountService;
