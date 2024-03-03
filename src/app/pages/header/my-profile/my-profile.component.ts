import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/Api/api.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  myData: any;
  profileImage='./../../../assets/images/profileImage.png'

  constructor(private _api: ApiService) { }

  ngOnInit(): void {
    this.profileData();

  }

  profileData() {
    let email = localStorage.getItem('email');
    let password = localStorage.getItem('password');

    this._api.getUser(email, password).subscribe((res: any) => {
      this.myData = res[0]
    })
  }


}
