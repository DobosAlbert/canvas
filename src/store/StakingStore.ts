import { makeAutoObservable, runInAction } from 'mobx';
import { StakingService } from './services/StakingService';

class StakingStore {
  users: string[] = [];
  sftsAllowed: number[] = [];
  constructor(private readonly stakingService: StakingService) {
    makeAutoObservable(this);
  }

  async loadUsers(address: string): Promise<void> {
    const usersFound: string[] = await this.stakingService.fetchUsers();

    if (usersFound.length === 0) return;
    runInAction(() => {
      this.users = usersFound;
    });
  }

  async loadSftsAllowed(): Promise<void> {
    const sftsAllowed = await this.stakingService.fetchSftsAllowed();
    if (sftsAllowed.length === 0) return;
    runInAction(() => {
      this.sftsAllowed = sftsAllowed;
    });
  }

  reset(): void {
    this.users = [];
    this.sftsAllowed = [];
  }
}

const stakingStore = new StakingStore(new StakingService());

export default stakingStore;
