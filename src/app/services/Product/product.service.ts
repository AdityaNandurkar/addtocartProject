import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private cartItemList: Product[] = [];
  public productList = new BehaviorSubject<Product[]>([]);
  public search = new BehaviorSubject<string>("");
  // public grandTotal: number = 0;

  readonly productUrl = 'http://localhost:3000/products';

  constructor(private _http: HttpClient) { }

  // HOME COMPONENT
  getAllProducts(): Observable<Product[]> {
    return this._http.get<Product[]>(this.productUrl)
      .pipe(
        catchError(this.handleError)
      );
  }


  // PRODUCTS COMPONENT
  getProductByCategory(category: string): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.productUrl}?category=${category}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // PRODUCT-DETAILS COMPONENT
  getProductById(id: number): Observable<Product> {
    return this._http.get<Product>(`${this.productUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getProducts() {
    return this.productList.asObservable()
  }

  // setProduct(product: Product[]) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(this.cartItemList);
  // }

  addtoCart(product: Product) {
    const existingProduct = this.cartItemList.find(p => p.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      product.price *= product.quantity
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    console.log("Product List after update", this.cartItemList);
  }


  // CART COMPONENT STARTS //
  getTotalPrice(): number {
    return this.cartItemList.reduce((total, product) => total + product.total, 0);
    // return 1;
  }

  removeCartItem(product: Product) {
    const index = this.cartItemList.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.cartItemList.splice(index, 1);
      this.productList.next(this.cartItemList);
    }
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  // CART COMPONENT ENDS //

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  // updateTotal() {
  //   debugger;
  //   this.grandTotal = this.cartItemList.reduce((total, product) => {
  //     return total + product.price * product.quantity;
  //   }, 0);
  // }
}
