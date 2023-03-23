import { makeAutoObservable } from 'mobx';
import { NftType } from '@multiversx/sdk-dapp/types/tokens.types';
import { SFTStaked } from '../../../utils/types/SftsStaked';
export class SFTStore {
    sftSelected: NftType | SFTStaked | undefined = undefined;
    amount: number = 1;

    constructor() {
        makeAutoObservable(this);
    }

    setSft(sft: NftType | SFTStaked): void {
        if(this.sftSelected?.identifier === sft.identifier) {
            this.sftSelected = undefined;
        } else {
            this.sftSelected = sft;
        }
        this.amount = 1; 
    }

    increase(): void {
        if(!this.sftSelected) return;
        if(this.amount < this.sftSelected.balance) {
            this.amount += 1; 
        }
    }

    decrease(): void {
        if(!this.sftSelected) return;
        if(this.amount > 1) {
            this.amount -= 1; 
        }
    }
}

export const sftStore = new SFTStore();