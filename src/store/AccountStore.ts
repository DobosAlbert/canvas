import { makeAutoObservable, runInAction, action } from 'mobx';
import AccountService from './services/AccountService';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { SFTStaked } from '../utils/types';

class AccountStore {
  sfts: NftType[] = [];
  sftsStaked: SFTStaked[] = [];
  rewards: number = 0;
  estarBalance: number = 0;
  eccuBalance: number = 0;
  constructor(public readonly accountService: AccountService) {
    makeAutoObservable(this);
    this.accountService = accountService;
  }

  async loadEstarBalance(address: string): Promise<void> {
    const estar: number = await this.accountService.getEstarBalance(address);

    if (estar === 0) return;
    runInAction(() => {
      this.estarBalance = estar;
    });
  }

  async loadAccount(address: string): Promise<void> {
    const estar: number = await this.accountService.getEstarBalance(address);
    const eccu: number = await this.accountService.getEccuBalance(address);
    const sftsFound: NftType[] = await this.accountService.fetchSfts(address);
    const sftsStaked = await this.accountService.fetchSftsStaked(address);
    const rewards = await this.accountService.fetchRewards(address);

    if (estar > 0) {
      runInAction(() => {
        this.estarBalance = estar;
      });
    }
    if (eccu > 0) {
      runInAction(() => {
        this.eccuBalance = eccu;
      });
    }
    if (sftsFound.length > 0) {
      runInAction(() => {
        this.sfts = sftsFound;
      });
    }
    if (sftsStaked.length > 0) {
      runInAction(() => {
        this.sftsStaked = sftsStaked;
      });
    }
    if (rewards > 0) {
      runInAction(() => {
        this.rewards = rewards;
      });
    }
  }

  reset(): void {
    this.sfts = [];
    this.sftsStaked = [];
  }
}

const account = new AccountStore(new AccountService());

export default account;
