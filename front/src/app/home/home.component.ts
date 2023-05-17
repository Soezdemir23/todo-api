import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ApiService } from '../services/api.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  todos: any[] = [];
  filteredTodos: any[] = [];

  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.apiService.getAllTodos().subscribe((data: any[]) => {
      this.todos = data;
      this.filteredTodos = data;
    });
  }

  filterChanged(ev: MatSelectChange) {
    const value = ev.value;
    this.filteredTodos = this.todos;
    if (value) {
      this.filteredTodos = this.todos.filter((todo) => todo.status === value);
      console.log(this.filteredTodos);
    } else {
      this.filteredTodos = this.todos;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(TodoComponent, {
      width: '500px',
      hasBackdrop: true,
      role: 'dialog',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.apiService
        .createTodo(data.title, data.description)
        .subscribe((data: any) => {
          console.log(data);
          this.todos.push(data);
          this.filteredTodos = this.todos;
        });
    });
  }

  statusChanged(ev: MatSelectChange, todoId: number, index: number) {
    const value: string = ev.value;
    this.apiService.updateTodoStatus(value, todoId).subscribe((data: any) => {
      this.todos[index] = data;
      this.filteredTodos = this.todos;
    });
  }

  delete(id: number) {
    if (confirm('Do you want to remove this todo?')) {
      this.apiService.deleteTask(id).subscribe((res) => {
        //@ts-ignore
        if (res.success) {
          this.todos = this.todos.filter((t: any) => t.id !== id);
          this.filteredTodos = this.todos;
        }
      });
    }
  }
}
