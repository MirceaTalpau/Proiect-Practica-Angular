import { Router } from '@angular/router';
import { AuthService } from './../../_core/services/auth-service/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})
export class LoginUserComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  routeParam: any;

  submitForm(): void {
    if (this.validateForm.valid) {
      if (this.remember?.value) {
        localStorage.setItem('username', this.user?.value);
        localStorage.setItem('password', this.password?.value);
      
      const account = {
        email: this.user?.value,
        password: this.password?.value,
      };
      this.auth.login(account).subscribe({
        next: (res) => {
          localStorage.setItem('token',res.token);
          console.log(res.token);
          this.router.navigate(['dashboard'])
        },
        error: () => {
          alert('Email or password are invalid');
        },
      })}else{
        sessionStorage.setItem('username', this.user?.value);
        sessionStorage.setItem('password', this.password?.value);
        const account = {
        email: this.user?.value,
        password: this.password?.value,
        };
        this.auth.login(account).subscribe({
          next: (res) =>{
            sessionStorage.setItem('token',res.token);
            console.log(res.token);
            this.router.navigate(['dashboard']);
          },
          error: () =>{
            alert('Email or password are invalid');
          },
        })
        
        
      };
      
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  get user() {
    return this.validateForm.get('userName');
  }
  get password() {
    return this.validateForm.get('password');
  }
  get remember() {
    return this.validateForm.get('remember');
  }
  get isLoggedIn() {
    return this.validateForm.get('isLoggedIn');
  }

  constructor(private fb: UntypedFormBuilder, private auth: AuthService,private router:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false],
      
    });
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    if (storedUsername && storedPassword) {
      this.user?.patchValue(storedUsername);
      this.password?.patchValue(storedPassword);
      this.isLoggedIn?.patchValue(true);
      this.remember?.patchValue(true);
    }
    
    if(localStorage.getItem('username') && localStorage.getItem('token')){
      this.router.navigate(['dashboard'])
    }
  }
}
