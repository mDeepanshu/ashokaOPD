import { Component, OnInit } from '@angular/core';
import { MainServiceService } from './main-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hospital';
  login = false;

  constructor(private mainService: MainServiceService) {}
  opdPrint = 'opd';
  ngOnInit() {
    this.mainService.login.subscribe((val) => {
      this.login = val;
    });
    this.mainService.opdPrint.subscribe((val: string) => {
      console.log(val);
      this.opdPrint = val;
    });
  }
}
