import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-admit-print',
  templateUrl: './admit-print.component.html',
  styleUrls: ['./admit-print.component.css'],
})
export class AdmitPrintComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}

  ngOnInit() {
    this.mainService.printOpd.subscribe((data: any) => {
      // console.log(String(data.registration_no));
      let idlength = 6 - String(data.registration_no).length;
      for (let i = 0; i < idlength; i++) {
        data.registration_no = '0' + `${data.registration_no}`;
      }
      this.basicObj = data;
    });
  }
  basicObj = {
    first_name: '',
    last_name: '',
    category: '',
    consultingDoc: '',
    paymentMode: '',
    visiting_charge: '',
    registration_no: '',
    relation: '',
    todayCount: '',
    relative_name: '',
    receipt_no: '',
    age: '',
    sex: '',
    receipt_count: '',
    address: '',
  };
}
