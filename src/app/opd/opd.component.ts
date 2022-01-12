import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatentData } from '../models/patentData';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-opd',
  templateUrl: './opd.component.html',
  styleUrls: ['./opd.component.css'],
})
export class OpdComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  docList: any[] = [];
  patientList: any[] = [];
  defaultSelected: number = -1;
  patientId: string = '';
  patientObjId: string = '';
  lastVisitDate: string = '';
  lastVisitDays: string = '';
  patientForm = new FormGroup({
    registration_no: new FormControl(null),
    patient_id: new FormControl(null),
    // visit_id: new FormControl(null),
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null),
    todayCount: new FormControl(null),
    relative_name: new FormControl(null),
    relation: new FormControl(''),
    mobile: new FormControl(null),
    sex: new FormControl(null),
    consultingDoc: new FormControl(null),
    ref_doc: new FormControl(null),
    address: new FormControl(null),
    age: new FormControl(null, Validators.required),
    visiting_charge: new FormControl(null, Validators.required),
    village: new FormControl(null),
    aadhar_card: new FormControl(null),
    receipt_no: new FormControl(null),
  });

  ngOnInit() {
    this.matchDoc('');
  }
  onSubmit() {
    Promise.all([
      this.mainService.dailyCount(),
      this.mainService.countPatient(),
      this.mainService.receiptCount(),
    ]).then((data: any) => {
      console.log(data);
      this.patientForm.patchValue({
        todayCount: data[0],
        registration_no: data[1],
        patient_id: this.patientId,
        receipt_no: data[2],
      });
      console.log(this.patientForm.value);
      this.mainService.addPatient(this.patientForm.value).then((data: any) => {
        this.patientId = data.visits._id;
        this._snackBar.open('Patient Saved', 'Close')._dismissAfter(10);

        this.print();
      });
    });
    // this.mainService.dailyCount().then((val) => {
    //   this.patientForm.patchValue({
    //     todayCount: val,
    //   });
    // });
    // this.mainService.countPatient().then((data) => {
    //   this.patientForm.patchValue({
    //     registration_no: data,
    //     patient_id: this.patientId,
    //   });
    //   this.mainService.receiptCount().then((data: any) => {
    //     this.patientForm.patchValue({
    //       receipt_no: data,
    //     });
    //     this.mainService.addPatient(this.patientForm.value).then(() => {
    //       this._snackBar.open('Patient Saved', 'Close');
    //       this.print();
    //     });
    //   });
    // });
  }
  patientSelect(i: number) {
    this.defaultSelected = i;
    this.patientId = this.patientList[i]._id;
    this.patientForm.patchValue(this.patientList[i]);
    this.mainService
      .getPatient(
        this.patientList[i]._id,
        'last_visit%20gender%20address%20village%20mobile%20relation%20relative_name%20age'
      )
      .then((data: any) => {
        console.log(data);
        this.patientForm.patchValue(data[0]);
        let lstDate = new Date(data[0].visits[0].date);
        this.lastVisitDate = `${lstDate.getDate()}/${
          lstDate.getMonth() + 1
        }/${lstDate.getFullYear()}`;
        let days = `${Math.round(
          (new Date().getTime() - lstDate.getTime()) / 86400000
        )}`;
        this.lastVisitDays = days;
      });
  }
  matchDoc(val: string) {
    this.mainService.matchDoctor(val).then((data: any) => {
      this.docList = data;
    });
  }
  onSelectDoc(name: string) {
    this.docList.forEach((element) => {
      if (element.name == name) {
        console.log(element);
        this.patientForm.patchValue({
          visiting_charge: element.visiting_charge,
        });
      }
    });
  }
  print() {
    this.mainService.printOpd.next(this.patientForm.value);
    setTimeout(() => {
      this.mainService.opdPrint.next('opd');
      setTimeout(() => {
        window.print();
      }, 10);
    }, 0);
  }
  matchPatient(val: string, type: string) {
    this.mainService.matchPatient(val, type).then((data: any) => {
      console.log(data);

      this.patientList = data;
    });
  }
  newVisit(obj: any) {
    this.mainService.newVisit(obj).then(() => {});
  }
  admitPatient() {
    console.log(this.patientId);
    if (this.patientId == '') {
      console.log('inIf');

      this.newPromisePatient().then((id: any) => {
        this.mainService.getPatient(id, 'last_visit').then((forVisit: any) => {
          console.log(forVisit);
          let obj = {
            visit_id: forVisit[0].visits[0]._id,
            receipt_no: this.patientForm.value.receipt_no,
            amount: this.patientForm.value.visiting_charge,
          };
          this.mainService.admitPatient(obj).then((data) => {
            this._snackBar.open('Patient Admit Saved', 'Close');
            this.mainService.opdPrint.next('admit');
            setTimeout(() => {
              window.print();
            }, 10);
          });
        });
      });
    } else {
      console.log(this.patientId);
      Promise.all([
        this.mainService.getPatient(this.patientId, 'last_visit'),
        this.mainService.receiptCount(),
      ]).then((arr: any) => {
        console.log(arr[0][0]);

        let obj = {
          visit_id: arr[0][0].visits[0]._id,
          receipt_no: arr[1],
          amount: this.patientForm.value.visiting_charge,
        };
        this.mainService.admitPatient(obj).then((data) => {
          this._snackBar.open('Patient Admit Saved', 'Close');
          this.mainService.opdPrint.next('admit');
          setTimeout(() => {
            window.print();
          }, 0);
        });
      });
    }
  }

  newPromisePatient() {
    return new Promise((res, rej) => {
      Promise.all([
        this.mainService.dailyCount(),
        this.mainService.countPatient(),
        this.mainService.receiptCount(),
      ]).then((data: any) => {
        console.log(data);
        this.patientForm.patchValue({
          todayCount: data[0],
          registration_no: data[1],
          patient_id: this.patientId,
          receipt_no: data[2],
        });
        console.log(this.patientForm.value);
        this.mainService
          .addPatient(this.patientForm.value)
          .then((data: any) => {
            res(data._id);
          });
      });
    });
  }
}
