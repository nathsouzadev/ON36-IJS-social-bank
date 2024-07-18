import { Customer } from "./customer";

export class Account {
  customer: Customer;
  id: string;
  balance: number;

  constructor(customer: Customer, id: string, balance: number) {
    this.customer = customer;
    this.id = id;
    this.balance = balance;
  }

  transfer(amount: number, target: Account) {
    this.balance -= amount;
    target.balance += amount;
  }

  withdraw(amount: number) {
    this.balance -= amount;
  }
}
