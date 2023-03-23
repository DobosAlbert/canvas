import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import axios from 'axios';
import { API_URL, COLLECTION_IDENTIFIER, MICROSERVICE_URL } from '../../config';
import { SFTStaked } from '../../utils/types/SftsStaked';
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

    async fetchSftsStaked(address: string): Promise<SFTStaked[]> {
        try {
            const { data } = await axios.get(MICROSERVICE_URL + '/stake/users/' + 'erd1a6p39rlsn2lm20adqe5tmzy543luwqx4dywzflr2dmtwdf75xszqdw9454');
            return data;
        } catch (err) {
            console.log(err)
            return [];
        }
    }
}

export default AccountService;