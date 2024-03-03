// 

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public grandTotal: number = 0;
  public itemTotal: number[] = [];
  private cartSubscription: Subscription | undefined;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.cartSubscription = this.productService.getProducts().subscribe((res) => {
      this.products = res;
      this.updateTotal();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  removeItem(item: Product) {
    this.productService.removeCartItem(item);
    this.updateTotal();
  }

  emptyCart() {
    this.productService.removeAllCart();
    this.products = []; // Clear the products array
    this.grandTotal = 0;
  }

  increaseQuantity(product: Product) {
    product.quantity += 1;
    this.updateTotal();

  }

  decreaseQuantity(product: Product) {
    if (product.quantity > 1) {
      product.quantity -= 1;
      this.updateTotal();
    } else {
      this.removeItem(product);
    }
  }

  updateTotal() {
    this.grandTotal = this.products.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  updateProductPrice(){
  }
}
