import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//
import { ErrMsgModuleComponent } from './err-msg-module/err-msg-module.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
//
import { OpdComponent } from './opd/opd.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ToLabComponent } from './to-lab/to-lab.component';
import { OpdPrintComponent } from './opd-print/opd-print.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { LabRecieptComponent } from './lab-reciept/lab-reciept.component';
import { OpdReportComponent } from './opd-report/opd-report.component';
import { AdmitPrintComponent } from './admit-print/admit-print.component';

const routes: Routes = [
  { path: 'opd', component: OpdComponent },
  { path: 'toLab', component: ToLabComponent },
  { path: 'addDoc', component: AddDoctorComponent },
  { path: 'opdReport', component: OpdReportComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    OpdComponent,
    LoginComponent,
    ErrMsgModuleComponent,
    NavBarComponent,
    ToLabComponent,
    OpdPrintComponent,
    AddDoctorComponent,
    LabRecieptComponent,
    OpdReportComponent,
    AdmitPrintComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatSnackBarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
