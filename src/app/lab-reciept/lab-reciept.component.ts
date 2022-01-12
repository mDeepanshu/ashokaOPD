import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-lab-reciept',
  templateUrl: './lab-reciept.component.html',
  styleUrls: ['./lab-reciept.component.css'],
})
export class LabRecieptComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  patientList: any[] = [];
  basicObj = {
    first_name: '',
    last_name: '',
    registration_no: '',
    consultingDoc: '',
    total: 0,
  };
  receiptNo: any = '';
  ngOnInit() {
    this.mainService.labPrintData.subscribe((data: any) => {
      this.patientList = data.arr;
      this.receiptNo = data.receiptNo;
      this.basicObj = data.obj;
      let total = 0;
      data.arr.forEach((element: any) => {
        total += element.price;
      });
      this.basicObj.total = total;
    });
  }
}
