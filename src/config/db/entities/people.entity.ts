import { randomUUID } from 'crypto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('people')
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

  constructor(
    name: string,
    email: string,
    city: string,
    phoneNumber: string,
    cpf: string,
    birthdate: string,
  ) {
    this.name = name;
    this.email = email;
    this.city = city;
    this.phoneNumber = phoneNumber;
    this.cpf = cpf;
    this.birthdate = birthdate;
  }
}
