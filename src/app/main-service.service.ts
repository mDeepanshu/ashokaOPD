import { Injectable } from '@angular/core';
import { ResponseType } from './models/responseType';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class MainServiceService {
  private url: string = 'http://localhost:3000';
  localWorking: string = 'http://localhost:3000';
  localNotWorking: string = 'https://hospital-hoshangabad.herokuapp.com';
  login = new Subject<boolean>();
  navBarFor = 2;
  printPharmacy = new Subject<any>();
  printOpd = new Subject<any>();
  opdPrint = new Subject<string>();
  labPrintData = new Subject<any>();

  constructor(private http: HttpClient, public dialog: MatDialog) {}
  makeLogin(pin: String) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/authorize?pin=${pin}`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  checkForErr(statusCode: Number, message: String) {
    if (statusCode != 200) {
      this.dialog.open(ErrMsgModuleComponent, { data: message });
      return true;
    } else {
      return false;
    }
  }
  addPatient(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/patient/new`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchDoctor(name: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/doctor/match?type=first_name&value=${name}&limit=4`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  matchPatient(name: string, type: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/patient/match?type=${type}&value=${name}&limit=20`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getLabs() {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/lab/tests/all`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  prescribeLab(_id: string, arr: any, receiptNumber: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(
          `${this.url}/lab/prescribe-tests?patientId=${_id}&receipt_no=${receiptNumber}
        `,
          arr
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  addDoctor(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/doctor`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  countPatient() {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/patient/count`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  newVisit(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(
          `${this.url}/visit/new
        `,
          obj
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  dailyCount() {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/patient/today/count`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getOpdReport(from: any, till: any) {
    console.log('from, till MAIN SER', from, till);
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/opd/report?from_date=${from}&to_date=${till}`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  getPatient(_id: string, valsString: string) {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(
          `${this.url}/patient?patient_id=${_id}&select=${valsString}`
        )
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  receiptCount() {
    return new Promise((response, reject) => {
      this.http
        .get<ResponseType>(`${this.url}/opd/receipt_count`)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
  admitPatient(obj: any) {
    return new Promise((response, reject) => {
      this.http
        .post<ResponseType>(`${this.url}/opd/admit`, obj)
        .subscribe((responseData: ResponseType) => {
          let isError = this.checkForErr(
            responseData.status,
            responseData.message
          );
          if (isError) {
            reject('http request failed' + responseData.message);
          } else {
            response(responseData.message);
          }
        });
    });
  }
}
