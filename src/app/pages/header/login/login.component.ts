import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  // loginForm!: FormGroup;
  // Email: string = "";
  // Password: string = "";
  // admin: any;

  // constructor(private _api: ApiService, private _router: Router, private _http: HttpClient, private _toastr: ToastrService) {
  //   this.loginForm = new FormGroup({
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  //   })
  // }

  // get error() {
  //   return this.loginForm.controls;
  // }

  // login() {
  //   this._http.get<any>('http://localhost:3000/users').subscribe(res => {
  //     const token = res.find((a: any) => {
  //       return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password;
  //     })
  //     if (token) {
  //       // console.log(token)
  //       // localStorage.setItem('email', this.loginForm.value.email);
  //       // localStorage.setItem('password', this.loginForm.value.password);

  //       if (this.loginForm.value.email == 'admin@gmail.com' && this.loginForm.value.password == 'admin123') {
  //         localStorage.setItem('email', this.loginForm.value.email);
  //         localStorage.setItem('password', this.loginForm.value.password);


  //         this._toastr.success('Admin Login Success!!');
  //       }
  //       else {
  //         localStorage.setItem('email', this.loginForm.value.email);
  //         localStorage.setItem('password', this.loginForm.value.password);

  //         this._toastr.success(token.email + ' Login Success!!');
  //       }


  //       this.loginForm.reset();
  //       this._router.navigate([""]);
  //     } else {
  //       // alert("User not found !!!");
  //       this._toastr.error('User not found !!!');
  //     }
  //   }, err => {
  //     // alert("Something went Wrong");
  //     this._toastr.error('Something went Wrong');
  //     console.log(err)
  //   });
  // }







  loginForm!: FormGroup;

  constructor(
    private _api: ApiService,
    private _router: Router,
    private _http: HttpClient,
    private _toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  get error() {
    return this.loginForm.controls;
  }

  async login() {
    try {
      const response = await this._http.get<any>('http://localhost:3000/users').toPromise();
      const token = response.find((user: any) => {
        return user.email === this.loginForm.value.email && user.password === this.loginForm.value.password;
      });

      if (token) {
        this.handleLoginSuccess(token);
      } else {
        this._toastr.error('User not found !!!');
      }
    } catch (error) {
      this._toastr.error('Something went wrong');
      console.log(error);
    }
  }

  handleLoginSuccess(user: any) {
    localStorage.setItem('email', this.loginForm.value.email);
    localStorage.setItem('password', this.loginForm.value.password);

    if (this.loginForm.value.email === 'admin@gmail.com' && this.loginForm.value.password === 'admin123') {
      this._toastr.success('Admin Login Success!!');
    } else {
      this._toastr.success(`${user.email} Login Success!!`);
    }

    this.loginForm.reset();
    this._router.navigate(['']);
  }
}
