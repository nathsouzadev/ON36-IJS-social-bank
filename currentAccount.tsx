import { Account } from "./account";
import { Customer } from "./customer";

export class CurrentAccount extends Account {
  overdraftLimit: number;

  constructor(customer: Customer, id: string, balance: number) {
    super(customer, id, balance);
    this.overdraftLimit = 1000;
  }

  validateOverdraftLimit(amount: number) {
    if (this.balance - amount < -this.overdraftLimit) {
      throw new Error("Overdraft limit exceeded");
    }
  }

  withdraw(amount: number) {
    this.validateOverdraftLimit(amount);
    this.balance -= amount;
  }

  transfer(amount: number, target: Account) {
    this.validateOverdraftLimit(amount);
    this.balance -= amount;
    target.balance += amount;
  }
}
