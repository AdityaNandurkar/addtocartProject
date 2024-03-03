import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  numberRegEx = /^[0-9]*$/;
  signupForm: FormGroup;
  // Fullname: string = "";
  // Email: string = "";
  // Phone: string = "";
  // Premium_Cust: string = "";

  // offer: boolean = false;
  Offer: any[] = [];
  // Address: string = "";
  // Password: string = "";

  constructor(private _api: ApiService, private _router: Router, private _toastr: ToastrService) {
    this.signupForm = new FormGroup({
      fullname: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.numberRegEx), Validators.maxLength(10), Validators.minLength(10)]),
      premium: new FormControl('', [Validators.required]),
      offer: new FormControl(false, [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      status: new FormControl(false)
    })
  }

  ngOnInit(): void {
    this.getOffer();
  }

  get error() {
    return this.signupForm.controls;
  }
  getOffer() {
    this.Offer = [
      { id: 1, name: 'Home Delivery', isSelected: false },
      { id: 2, name: 'Cash on Delivery', isSelected: false },
      { id: 3, name: 'Order Pickup', isSelected: false }
    ]
  }
  addOffer(service: any) {
    this.Offer.push({ ...service })
  }

  onChange() {
    console.log(this.Offer)
  }

  addDetails() {
    // this.Fullname = this.signupForm.value.fullname;
    // this.Email = this.signupForm.value.email;
    // this.Phone = this.signupForm.value.phone;
    // this.Premium_Cust = this.signupForm.value.premium;

    // this.Offer = this.signupForm.value.offer;
    // // this.Offer[] = this.addOffer(this.signupForm.value.offer)
    // console.log("The value " + this.signupForm.value.offer)
    // this.Address = this.signupForm.value.address;
    // this.Password = this.signupForm.value.password;
    this._api.postData(this.signupForm.value).subscribe({
      next: () => {
        // alert("Employee added Successfully");
        this._toastr.success('Collect Data Succesfully');
        this.signupForm.reset();
        this._router.navigate(['login']);
        console.log("The value " + this.signupForm.value.offer);
      }
    })
  }

  clickButton(path: string) {
    this._router.navigate([path]);
  }
}
