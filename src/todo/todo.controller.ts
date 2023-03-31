import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './entity/todo.entity';
import { TodoStatusValidationPipe } from './pipes/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';

// http://localhost:3000/api/todos
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  // get the data from the

  @Post()
  createNewTodo(@Body(ValidationPipe) data: CreateTodoDto) {
    return this.todoService.createNewTodo(data);
  }

  @Patch(':id')
  updateTodo(
    @Body('status', TodoStatusValidationPipe) status: TodoStatus,
    @Body('notes') notes: string,
    @Param('id') id: number,
  ) {
    return this.todoService.updateTodo(id, status, notes);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: number) {
    return this.todoService.deleteTodoById(id);
  }
}
