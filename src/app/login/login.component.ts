import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private router: Router
  ) {}

  invalidPassword = false;
  ngOnInit(): void {}
  login(pass: String, username: string) {
    this.mainService.login.next(false);
    switch (username) {
      case 'pharmacy':
        this.mainService.navBarFor = 0;
        this.router.navigate(['pharmaSell']);
        break;
      case 'doctor':
        this.mainService.navBarFor = 1;
        this.router.navigate(['doctorChamber']);
        break;
      case 'opd':
        this.mainService.navBarFor = 2;
        this.router.navigate(['opd']);
        break;
      case 'lab':
        this.mainService.navBarFor = 3;
        this.router.navigate(['lab']);
        break;
    }
    // this.mainService.makeLogin(pass).then((res) => {
    //   if (res == 'Authorised') {
    //     this.mainService.login.next(false);
    //   } else {
    //     this.invalidPassword = true;
    //   }
    // });
  }
}
