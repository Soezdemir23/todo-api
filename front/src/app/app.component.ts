import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Todo App Fullstack';
  showMenu = true;
  username: string = '';

  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.apiService.jwtUserToken.subscribe((token) => {
      if (token) {
        const decoded: any = jwtDecode(token);
        this.username = decoded.username;
      }

      if (this.username) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    });
  }

  logout() {
    this.username = '';
    this.apiService.logout();
  }
}
