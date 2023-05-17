import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  registerUser(registForm: NgForm) {
    if (registForm.invalid) return;

    const { username, password } = registForm.value;
    return this.apiService.register(username, password);
  }
}
