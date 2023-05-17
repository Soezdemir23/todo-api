import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  BehaviorSubject,
  Observable,
  lastValueFrom,
  tap,
  buffer,
  catchError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api';
  private token = '';
  private jwtToken = new BehaviorSubject<string>(this.token);
  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {
    const fetchedToken = localStorage.getItem('accessToken');

    if (fetchedToken) {
      // node's atob is deprecated, not the browser's.
      this.token = window.atob(fetchedToken);
      this.jwtToken.next(this.token);
    } else {
      console.log('No token found');
    }
  }

  // use it for authenication
  get jwtUserToken(): Observable<string> {
    return this.jwtToken.asObservable();
  }

  // Get All Todos
  getAllTodos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/todos`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  // function to log into the app using the username and password as a body
  // and then assign the token of the response to the token variable
  // if this.token exists then give this.toast.success the following options
  //  message: 'Login Successful', title: 'Success', positionClass: 'toast-top-center'
  // and when the toast is closed or hidden assign the token to this jwtTokenand then
  // store it inside the localstorage as key 'act' and then do an alternative to btoaing this.token because it is deprecated.
  // then navigate to the home page

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/auth/login`, { username, password })
      .pipe(
        tap(
          (response: any) => {
            this.token = response.accessToken;
            this.jwtToken.next(this.token);
            if (this.token) {
              this.toast.success('Login Successful', 'Success', {
                positionClass: 'toast-top-center',
              });
              // node's btoa is deprecated, not the browser's.
              localStorage.setItem('accessToken', window.btoa(this.token));
            }
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.toast.error('Login Failed', 'Error', {
              positionClass: 'toast-top-center',
            });
          }
        )
      );
  }

  logout(): void {
    this.token = '';
    this.jwtToken.next(this.token);
    this.toast
      .success('Logout Successful', 'Success', {
        timeOut: 1000,
      })
      .onHidden.subscribe(() => {
        localStorage.removeItem('accessToken');
        this.router.navigateByUrl('/login').then();
      });
  }
  // rest comes
  createTodo(title: string, description: string): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/todos`,
      { title, description },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  updateTodoStatus(statusValue: string, todoId: number) {
    return this.http
      .patch(
        `${this.apiUrl}/todos/${todoId}`,
        { status: statusValue },
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('Status Updated succesfully', 'Success', {
              positionClass: 'toast-top-center',
              timeOut: 1000,
            });
          } else {
            this.toast.error('Status Update Failed', 'Error', {
              positionClass: 'toast-top-center',
              timeOut: 1000,
            });
          }
        })
      );
  }
  deleteTask(todoId: number) {
    return this.http
      .delete(`${this.apiUrl}/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('Task Deleted succesfully', 'Success', {
              positionClass: 'toast-top-center',
              timeOut: 1000,
            });
          } else {
            this.toast.error('Task Delete Failed', 'Error', {
              positionClass: 'toast-top-center',
              timeOut: 1000,
            });
          }
        })
      );
  }

  register(username: any, password: any) {
    return this.http
      .post(`${this.apiUrl}/auth/register`, {
        username,
        password,
      })
      .pipe(
        // @ts-ignore
        catchError((err: any) => {
          this.toast.error(err.error.message, 'Error', {
            timeOut: 1000,
          });
        })
      );
  }
}
