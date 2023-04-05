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
import { UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.decorator';
import { UserEntity } from 'src/User/Entity/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus } from './entity/todo.entity';
import { TodoStatusValidationPipe } from './pipes/TodoStatusValidation.pipe';
import { TodoService } from './todo.service';

// http://localhost:3000/api/todos
@Controller('todos')
// Need to learn about Using Guards and Authguard
@UseGuards(AuthGuard())
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getAllTodos(@User() user: UserEntity) {
    return this.todoService.getAllTodos(user);
  }

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
