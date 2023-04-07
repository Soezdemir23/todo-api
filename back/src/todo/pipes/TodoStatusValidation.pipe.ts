import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TodoStatus } from '../entity/todo.entity';

export class TodoStatusValidationPipe implements PipeTransform {
  readonly allowedStatus: TodoStatus[] = [
    TodoStatus.OPEN,
    TodoStatus.IN_PROGRESS,
    TodoStatus.DONE,
  ];

  transform(value: string, metadata: ArgumentMetadata): any {
    console.log('the value: ', value, ' , the type of value: ', typeof value);
    // the value here seems to be an array of strings. HOW come?
    // because i passed TWO arguments in the body of the request with the same key.
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}
