import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-opd-print',
  templateUrl: './opd-print.component.html',
  styleUrls: ['./opd-print.component.css'],
})
export class OpdPrintComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  d = new Date();
  date = `${this.d.getDate()}/${this.d.getMonth() + 1}/${this.d.getFullYear()}`;
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
  receiptNumber: any = '';
  ngOnInit() {
    this.mainService.printOpd.subscribe((data: any) => {
      console.log(String(data.registration_no));
      let idlength = 6 - String(data.registration_no).length;
      for (let i = 0; i < idlength; i++) {
        data.registration_no = '0' + `${data.registration_no}`;
      }
      this.basicObj = data;
    });
  }
}
