import { AccountType } from '../../resources/accounts/dto/create-account.dto';
import { Customer } from '../../resources/customer/entities/customer.entity';
import { Manager } from '../../resources/manager/entities/manager.entity';

export const database: Array<Customer | Manager> = [
  {
    id: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
    customers: [
      {
        id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        accounts: [],
        people: {
          id: '26e5f43c-bb42-4cf2-968b-56d32e049c56',
          name: 'Grace Hooper',
          email: 'grace@idiomaparatodos.com.br',
          city: 'Londres',
          phoneNumber: '+5511123456789',
          cpf: '12345678900',
          birthdate: '1815-12-10',
        },
        managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
      },
    ],
    people: {
      id: 'be51374d-f8d4-448e-9066-9ef5e1c7f303',
      name: 'Ada Lovelace',
      email: 'ada@idiomaparatodos.com.br',
      city: 'Londres',
      phoneNumber: '+5511123456789',
      cpf: '12345678900',
      birthdate: '1815-12-10',
    },
  },
  {
    id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
    accounts: [
      {
        id: 'ac8eede5-80d6-463a-8256-09c41dab5124',
        customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
        balance: 1000,
        type: AccountType.CURRENT,
        interestRate: 0.02,
        overdraftLimit: 1000,
        card: {
          id: '6641d6aa-dfe0-46ff-a803-721a3f1aae9e',
          customerId: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
          accountId: 'ac8eede5-80d6-463a-8256-09c41dab5124',
          number: '4242505042425050',
          cvv: '123',
          expirationDate: '12/30',
          limit: 500,
          purchases: [],
        },
      },
    ],
    people: {
      id: '0c2122f8-9d02-40d6-b84e-dbed3fb1f8a4',
      name: 'Grace Hooper',
      email: 'grace@idiomaparatodos.com.br',
      city: 'Londres',
      phoneNumber: '+5511123456789',
      cpf: '12345678900',
      birthdate: '1815-12-10',
    },
    managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
  },
  {
    id: '28de278f-b119-4d69-b1b4-7abd9de9ace0',
    accounts: [
      {
        id: 'c96a416c-93ef-4584-af4d-af2e25ab4df4',
        customerId: '28de278f-b119-4d69-b1b4-7abd9de9ace0',
        balance: 1000,
        type: AccountType.CURRENT,
        interestRate: 0.02,
        overdraftLimit: 1000,
        card: null,
      },
    ],
    people: {
      id: '28de278f-b119-4d69-b1b4-7abd9de9ace0',
      name: 'Dorothy Vaughan',
      email: 'dorothy@idiomaparatodos.com.br',
      city: 'Londres',
      phoneNumber: '+5511123456789',
      cpf: '12345678900',
      birthdate: '1815-12-10',
    },
    managerId: '76a2237f-1ddc-4aa3-9db7-66f7518b8f28',
  },
];
