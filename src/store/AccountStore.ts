import { makeAutoObservable, runInAction, action } from "mobx";
import AccountService from './services/AccountService';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';

class AccountStore {
    sfts: NftType[];
    constructor(public readonly accountService: AccountService){
        makeAutoObservable(this);
        this.accountService = accountService;
        this.sfts = [];
    }
    
    async loadSfts(address: string): Promise<void> {
        const sftsFound: NftType[] = await this.accountService.fetchSfts(address);

        if(sftsFound.length === 0) return;
        runInAction(() => {
            this.sfts = sftsFound;
        })
    }

}

const account = new AccountStore(new AccountService());

export default account;