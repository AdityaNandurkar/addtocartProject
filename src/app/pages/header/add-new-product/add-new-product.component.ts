import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss']
})
export class AddNewProductComponent {
  modalService: any;
  closeResult: string = '';
  productForm: FormGroup | any;
  errorMessage: string | undefined;
  constructor(private _api: ApiService){
    
  }
  open(content: any) {
    this.modalService.open(content,
      {
        ariaLabelledBy: 'modal-basic-title'
      }).result.then(
        (result: any) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason: any) => {
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

  onSubmit() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      this._api.addNewProduct(productData).subscribe(
        (response) => {
          // Handle success, e.g., show a success message or redirect to another page.
          console.log('Product saved successfully:', response);
        },
        (error) => {
          // Handle error, e.g., display an error message.
          this.errorMessage = 'Error saving product. Please try again later.';
          console.error('Error saving product:', error);
        }
      );
    } else {
      // Form is not valid; handle validation errors if needed.
      this.errorMessage = 'Please fill in all required fields and correct validation errors.';
    }
  }
}
