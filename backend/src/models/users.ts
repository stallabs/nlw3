import { 
  Entity, 
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert, 
  BeforeUpdate
} from "typeorm";
import bcrypt from "bcryptjs";

@Entity("users")
export default class Users {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8) // arbitrary salt
  }
}
