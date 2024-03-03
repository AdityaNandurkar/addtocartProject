import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/model/product';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  closeResult: string = '';
  productForm: FormGroup | any;
  errorMessage: string | undefined;
  userInfo: User | any;

  constructor(private modalService: NgbModal, private _formBuilder: FormBuilder, private _api: ApiService) { }

  open(content: any) {
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

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      image: [''],
      price: ['', Validators.required],
      delPrice: [''],
      discount: [''],
      rating: [''],
      category: ['', Validators.required],
    });


    this.getUserInfo();
  }

  updateUser: User = {
    fullname: '',
    email: '',
    phone: 0,
    premium: '',
    offer: [],
    address: '',
    password: '',
    status: false,
    id: 0
  }

  getUserInfo(): void {
    this._api.getUserInfo().subscribe(data => {
      this.userInfo = data;
    });
  }
  edit(user: User) {
    this.userInfo = { ...user };
  }

  updateUserInfo(): void {
    this._api.updateUser(this.updateUser).subscribe(
      () => {
        console.log('Updated Successfully');
        // You can trigger a notification or other actions upon successful update
      },
      (error) => {
        console.error('Error occurred while updating person', error);
        // Handle errors as needed, e.g., display an error message to the user
      }
    );
  }

  deleteUser(personId: number) {
    this._api.deleteUser(personId).subscribe(
      () => {
        this.userInfo = null; // Clear the user information on successful deletion
      },
      (error) => {
        console.error('Error occurred while deleting user', error);
        // Handle errors as needed, e.g., display an error message to the user
      }
    );
  }

 
}