import { Account } from "./account";
import { Customer } from "./customer";

export class SavingsAccount extends Account {
  interestRate: number;

  constructor(customer: Customer, id: string, balance: number) {
    super(customer, id, balance);
    this.interestRate = 0.02;
  }

  addInterest() {
    this.balance += this.balance * this.interestRate;
  }
}
