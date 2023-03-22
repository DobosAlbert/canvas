import { makeAutoObservable, runInAction, action } from "mobx";
import AccountService from './services/AccountService';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { SFTStaked } from '../utils/types/SftsStaked';

class AccountStore {
    sfts: NftType[] = [];
    sftsStaked: SFTStaked[] = [];
    constructor(public readonly accountService: AccountService){
        makeAutoObservable(this);
        this.accountService = accountService;
    }
    
    async loadSfts(address: string): Promise<void> {
        const sftsFound: NftType[] = await this.accountService.fetchSfts(address);

        if(sftsFound.length === 0) return;
        runInAction(() => {
            this.sfts = sftsFound;
        })
    }

    async loadSftsStaked(address: string): Promise<void> {
        const sftsStaked = await this.accountService.fetchSftsStaked(address);
        if(sftsStaked.length === 0) return;
        runInAction(() => {
            this.sftsStaked = sftsStaked;
        })
    }

    reset(): void {
        this.sfts = [];
        this.sftsStaked = [];
    }
}

const account = new AccountStore(new AccountService());

export default account;