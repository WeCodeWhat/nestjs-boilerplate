import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
@Entity({
  name: 'UserSchema',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true, type: 'text' })
  email: string;

  @Column({ nullable: false, type: 'text' })
  password: string;

  @BeforeInsert()
  async addId() {
    this.id = await uuidV4();
  }
}
