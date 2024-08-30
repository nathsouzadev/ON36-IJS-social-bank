import { randomUUID } from 'crypto';
import { CreatePersonDto } from '../dto/create-person.dto';

export class People {
  id: string;
  name: string;
  email: string;
  city: string;
  phoneNumber: string;
  cpf: string;
  birthdate: string;

  constructor(data: CreatePersonDto) {
    this.id = randomUUID();
    this.name = data.name;
    this.email = data.email;
    this.city = data.city;
    this.phoneNumber = data.phoneNumber;
    this.cpf = data.cpf;
    this.birthdate = data.birthdate;
  }
}
