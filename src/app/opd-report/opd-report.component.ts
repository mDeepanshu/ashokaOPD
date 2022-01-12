import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-opd-report',
  templateUrl: './opd-report.component.html',
  styleUrls: ['./opd-report.component.css'],
})
export class OpdReportComponent implements OnInit {
  constructor(public mainService: MainServiceService) {}
  total: number = 0;
  opdList: any[] = [];
  d = new Date();
  date = `${this.d.getDate()}/${this.d.getMonth() + 1}/${this.d.getFullYear()}`;

  campaignOne = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  ngOnInit() {
    let from = new Date(this.date);
    let r = new Date(from).getTime() + 86400000 - 1;
    let tillDate = new Date(r);
    this.mainService.getOpdReport(from, tillDate).then((data: any) => {
      console.log(data);
      this.opdList = data;
      data.forEach((element: any) => {
        this.total += element.amount;
      });
    });
  }
  getTransactions(from: any, till: any) {
    // console.log('from, till', from, till);
    // let q = new Date(from);
    // let w = new Date(till);
    // console.log('q, w', q, w);
    let r = new Date(this.campaignOne.value.end).getTime() + 86400000 - 1;
    let tillDate = new Date(r);
    this.mainService
      .getOpdReport(this.campaignOne.value.start, tillDate)
      .then((data: any) => {
        console.log(data);
        this.opdList = data;
        data.forEach((element: any) => {
          this.total += element.amount;
        });
      });
  }
}
