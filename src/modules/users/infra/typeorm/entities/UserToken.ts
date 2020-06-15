import {
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

@Entity('user_tokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_id: string;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
