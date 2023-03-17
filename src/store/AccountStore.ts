import { makeAutoObservable } from "mobx";
import AccountService from './services/AccountService';

class AccountStore {
    constructor(private readonly accountService: AccountService){
        makeAutoObservable(this);
    }
}

const account = new AccountStore(new AccountService());

export default account;