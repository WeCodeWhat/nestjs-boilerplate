import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import * as bcrypt from 'bcrypt';
@Entity({
  name: 'UserSchema',
})
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false, type: 'text' })
  firstName: string;

  @Column({ nullable: true, type: 'text' })
  lastName: string;

  @Column({ nullable: false, unique: true, type: 'text' })
  email: string;

  @Column({ nullable: false, type: 'text' })
  password: string;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @BeforeInsert()
  async addId() {
    this.id = await uuidV4();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
}
