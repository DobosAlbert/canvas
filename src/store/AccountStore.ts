import { makeAutoObservable, runInAction, action } from 'mobx';
import AccountService from './services/AccountService';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { SFTStaked } from '../utils/types';

class AccountStore {
  sfts: NftType[] = [];
  sftsStaked: SFTStaked[] = [];
  rewards: number = 0;
  constructor(public readonly accountService: AccountService) {
    makeAutoObservable(this);
    this.accountService = accountService;
  }

  async loadSfts(address: string): Promise<void> {
    const sftsFound: NftType[] = await this.accountService.fetchSfts(address);

    if (sftsFound.length === 0) return;
    runInAction(() => {
      this.sfts = sftsFound;
    });
  }

  async loadSftsStaked(address: string): Promise<void> {
    const sftsStaked = await this.accountService.fetchSftsStaked(address);
    if (sftsStaked.length === 0) return;
    runInAction(() => {
      this.sftsStaked = sftsStaked;
    });
  }

  async loadRewards(address: string): Promise<void> {
    const rewards = await this.accountService.fetchRewards(address);
    if (!rewards) return;
    runInAction(() => {
      this.rewards = rewards;
    });
  }

  reset(): void {
    this.sfts = [];
    this.sftsStaked = [];
  }
}

const account = new AccountStore(new AccountService());

export default account;
