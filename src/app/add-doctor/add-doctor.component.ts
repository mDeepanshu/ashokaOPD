import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from '../main-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css'],
})
export class AddDoctorComponent implements OnInit {
  constructor(
    private mainService: MainServiceService,
    private _snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {}
  NewDoctor = new FormGroup({
    name: new FormControl(null, Validators.required),
    visiting_charge: new FormControl(null, Validators.required),
    contact: new FormControl(null, Validators.required),
  });
  onSubmit() {
    this.mainService.addDoctor(this.NewDoctor.value).then(() => {
      this._snackBar.open('Doctor Saved');
    });
  }
}
