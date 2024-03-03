import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product, User } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  readonly baseurl = 'http://localhost:3000'
  searchsuject = new Subject();

  postData(data: User): Observable<User[]> {
    return this._http.post<User[]>(`${this.baseurl}/users`, data);
  }

  getUserInfo(): Observable<User[]> {
    return this._http.get<User[]>(`${this.baseurl}/users`);
  }

  getUser(email: any, password: any): Observable<User> {
    console.log("The Email ", email, " The  Password ", password)
    return this._http.get<User>(`${this.baseurl}/users?email=${email}&password=${password}`);
  }

  updateUser(updatePersonData: any): Observable<User> {
    return this._http.put<User>(`${this.baseurl}/updatePerson`, updatePersonData);
  }

  deleteUser(userId: number): Observable<User> {
    console.log("Deleted")
    return this._http.delete<User>(`${this.baseurl}/users/${userId}`);
  }

  addNewProduct(productData: Product): Observable<Product> {
    return this._http.post<Product>(`${this.baseurl}/products`, productData);
  }

  IsLoggedIn() {
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');
    console.log(email, password)
    if (email && password) {
      return email && password;
    }
    return null;
  }

  isAdminLoggedIn() {
    return localStorage.getItem('');
  }
}
