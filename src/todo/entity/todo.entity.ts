import { IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}

export enum TodoStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'WIP',
  DONE = 'DONE',
}
