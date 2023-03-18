import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import axios from 'axios';
import { API_URL, COLLECTION_IDENTIFIER } from '../../config';
class AccountService {
    constructor(){}

    async fetchSfts(address: string): Promise<NftType[]> {
        try {
            const { data } = await axios.get(API_URL + '/accounts/' + address + '/nfts?collection=' + COLLECTION_IDENTIFIER);
            return data;
        } catch (err) {
            console.log(err)
            return [];
        }
    }
}

export default AccountService;