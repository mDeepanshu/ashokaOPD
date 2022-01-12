import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(public mainService: MainServiceService) {}
  navbarLabels = [
    ['SELL', 'ADD ITEM', 'ADD PARTY', 'PURCHASE'],
    ['GENRATE REPORT', 'ADD REPORT'],
    ['ADD PATIENT', 'TO LAB', 'MANAGE DOCTOR', 'OPD REPORT'],
    [''],
  ];
  navbarLinks = [
    ['pharmaSell', 'pharmaAddItem', 'addPharmaParty', 'pharmaPurchase'],
    ['lab', 'labnewreport'],
    ['opd', 'toLab', 'addDoc', 'opdReport'],
    [''],
  ];
  title = '';
  selected = '';
  ngOnInit() {
    switch (this.mainService.navBarFor) {
      case 0:
        this.title = 'PHARMACY';
        this.selected = 'pharmaSell';
        break;
      case 1:
        this.title = 'LAB';
        this.selected = 'lab';
        break;
      case 2:
        this.title = 'OPD';
        this.selected = 'opd';
        break;
      case 3:
        break;
    }
  }
  change(val: string) {
    this.selected = val;
  }
  logOff() {
    this.mainService.login.next(true);
  }
}
