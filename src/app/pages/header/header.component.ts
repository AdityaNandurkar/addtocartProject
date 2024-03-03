import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/Api/api.service';
import { ProductService } from 'src/app/services/Product/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public searchTerm: string = "";
  collapsed = true;
  private destroy$ = new Subject<void>();
  public totalItem: number = 0;
  constructor(private _product: ProductService, private _router: Router, private _toastr: ToastrService, private _api: ApiService, private modalService: NgbModal, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this._product.getProducts().subscribe((product) => {
      this.totalItem = product.length;
    });

    this.productFormData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this._product.search.next(this.searchTerm);
  };

  loggedIn = () => localStorage.getItem('email') && localStorage.getItem('password');

  onLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this._toastr.success("Logout Successfully !!");
    this._router.navigate([""]);
  };

  //This Add product Code

  closeResult: string = '';
  productForm: FormGroup | any;
  errorMessage: string | undefined;
  openAddNewProudct(content: any) {
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed:${this.getDismissionReason(reason)}`;
        });
  }

  private getDismissionReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    }
    else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    }
    else {
      return `with: ${reason}`;
    }
  }

  productFormData() {
    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      price: ['', Validators.required],
      delPrice: [''],
      discount: [''],
      rating: [''],
      category: ['', Validators.required],
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this._api.addNewProduct(productData).subscribe(
        (response) => {
          console.log('Product saved successfully:', response);
        },
        (error) => {
          this.errorMessage = 'Error saving product. Please try again later.';
          console.error('Error saving product:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields and correct validation errors.';
    }
  }

  isAdmin() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    return email === 'admin@gmail.com' && password === 'admin123';
  }

  getAdmin() {
    if (this.isAdmin()) {
      return 'admin@gmail.com' && 'admin123';
    }
    else {
      return null;
    }
  }
}