import { randomUUID } from 'crypto';
import { CreatePersonDto } from '../../../resources/people/dto/create-person.dto';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class People {
  @PrimaryGeneratedColumn('uuid')
  id: string = randomUUID();

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  cpf: string;

  @Column({ nullable: false })
  birthdate: string;

  constructor(data: CreatePersonDto) {
    this.name = data.name;
    this.email = data.email;
    this.city = data.city;
    this.phoneNumber = data.phoneNumber;
    this.cpf = data.cpf;
    this.birthdate = data.birthdate;
  }
}
