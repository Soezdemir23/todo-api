import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity, TodoStatus } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity) private todoRepo: Repository<TodoEntity>,
  ) {}

  async getAllTodos() {
    return await this.todoRepo.find();
  }

  async createNewTodo(createToDTO: CreateTodoDto) {
    const todo = new TodoEntity();
    const { title, description } = createToDTO;
    todo.title = title;
    todo.description = description;
    todo.status = TodoStatus.OPEN;
    todo.date = new Date();
    this.todoRepo.create(todo);
    try {
      return await this.todoRepo.save(todo);
    } catch (error) {
      console.log(error);
      throw new Error('Something went wrong creating the new todo entry');
    }
  }

  async updateTodo(id: number, status: TodoStatus, notes: string) {
    try {
      this.todoRepo.update({ id }, { status, notes });
      return this.todoRepo.findOneBy({ id });
    } catch (error) {
      throw new InternalServerErrorException('Changing status failed');
    }
  }

  async deleteTodoById(id: number) {
    try {
      return await this.todoRepo.delete({ id });
    } catch (error) {
      throw new InternalServerErrorException(
        'Deleting todo with id: ' + id + 'failed',
      );
    }
  }
}
