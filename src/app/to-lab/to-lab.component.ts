import { Component, OnInit } from '@angular/core';
import { MainServiceService } from '../main-service.service';
import { LabList } from '../models/getLabs';
@Component({
  selector: 'app-to-lab',
  templateUrl: './to-lab.component.html',
  styleUrls: ['./to-lab.component.css'],
})
export class ToLabComponent implements OnInit {
  constructor(private mainService: MainServiceService) {}
  panelOpenState = false;
  labList: any[] = [];
  patientList: any[] = [];
  selectedLab: any[] = [];
  printArr: any[] = [];
  defaultSelected: number = -1;
  selection: number = -1;
  amount: number = 0;
  patientId: string = '';
  printPatientData = <any>{};
  ngOnInit() {
    this.mainService.getLabs().then((data: any) => {
      console.log(data);
      this.labList = data;
    });
  }
  selectedOptions = [];
  selectedOption: any;
  onNgModelChange(event: any) {
    this.amount = 0;
    console.log('event', event);
    this.selectedLab = [];
    this.printArr = event;
    this.selectedOptions.forEach((element: any) => {
      this.amount += element.price;
      this.selectedLab.push({
        test_id: element._id,
        amount: element.price,
      });
    });
    console.log('this.selectedOptions', this.selectedLab);

    this.selectedOption = event;
  }
  matchPatient(val: string, type: string) {
    this.patientList = [];
    this.mainService.matchPatient(val, type).then((data: any) => {
      console.log(data);

      this.patientList = data;
    });
  }
  patientSelect(i: number) {
    console.log(i);
    this.defaultSelected = i;
    console.log('this.patientList[i]this.patientList[i]', this.patientList[i]);
    this.patientId = this.patientList[i]._id;
    console.log(this.patientId);
    this.printPatientData = {
      registration_no: this.patientList[i].registration_no,
      first_name: this.patientList[i].first_name,
      last_name: this.patientList[i].last_name,
    };
  }
  prescribeLab() {
    console.log('this.patientId', this.patientId, this.selectedLab);
    this.mainService.receiptCount().then((data: any) => {
      this.mainService
        .prescribeLab(this.patientId, this.selectedLab, data)
        .then((dataPrescribeLab) => {
          this.mainService.opdPrint.next('toLab');
          setTimeout(() => {
            this.mainService.labPrintData.next({
              arr: this.printArr,
              obj: this.printPatientData,
              receiptNo: data,
            });
            setTimeout(() => {
              window.print();
            }, 10);
          }, 0);
        });
    });
  }
}
