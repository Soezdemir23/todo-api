import { UserEntity } from 'src/User/Entity/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity('todos')
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TodoStatus;

  @Column({ nullable: true, type: 'text' })
  notes: string;

  @Column()
  date: Date;

  // one user can have many todos, but one todo can only have one user
  @ManyToOne(() => UserEntity, (user) => user.todos)
  user: UserEntity;

  @Column()
  userId: number;
}

export enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'WIP',
  DONE = 'DONE',
}
