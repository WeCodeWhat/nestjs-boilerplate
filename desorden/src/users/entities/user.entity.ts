import { IsEmail } from 'class-validator';
import { DTOErrorMessage } from 'src/constants/dto-error-message';
import {
  Entity,
  Column,
  BeforeInsert,
  BaseEntity,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
@Entity({
  name: 'UserSchema',
})
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @IsEmail(
    {
      ignore_max_length: true,
    },
    {
      message: DTOErrorMessage.emailFormat,
    },
  )
  @Column({ nullable: false, unique: true, type: 'text' })
  email: string;

  @Column({ nullable: false, type: 'text' })
  password: string;

  @BeforeInsert()
  async addId() {
    this.id = await uuidV4();
  }
}
