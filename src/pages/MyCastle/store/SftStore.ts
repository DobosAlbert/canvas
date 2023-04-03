import { makeAutoObservable } from 'mobx';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { SFTStaked } from '../../../utils/types';
export class SFTStore {
  sftSelected: NftType | SFTStaked | undefined = undefined;
  amount: number = 1;
  category?: Category = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setSft(sft: NftType | SFTStaked, category?: Category): void {
    if (this.sftSelected?.identifier === sft.identifier) {
      this.sftSelected = undefined;
    } else {
      this.sftSelected = sft;
    }
    if (category && this.category !== category) this.category = category;
    this.amount = 1;
  }

  increase(): void {
    if (!this.sftSelected) return;
    if (this.amount < this.sftSelected.balance) {
      this.amount += 1;
    }
  }

  decrease(): void {
    if (!this.sftSelected) return;
    if (this.amount > 1) {
      this.amount -= 1;
    }
  }

  resetSft(): void {
    this.sftSelected = undefined;
    this.amount = 1;
  }
}

export enum Category {
  stake = 'STAKE',
  unStake = 'UNSTAKE'
}

export const sftStore = new SFTStore();
