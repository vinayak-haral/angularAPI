import { Component, Inject, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../services/core.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {

  empForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  employee: Employee[] = [];
  
  constructor(
    private _dialogRef: MatDialogRef<EmployeeFormComponent>,
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _coreService:CoreService,
   @Inject(MAT_DIALOG_DATA) public data: any) {

    // Creating Reactive forms
      this.empForm = this._fb.group({
        name: '',
        email: '',
        phone:'',
        price:'',
        salary:'',
        quantity:'',
        department:'',
        education: '',
        // dob: '',
        // lastName: '',
        // gender: '',
        // company: '',
        // experience: '',
        // package: '',
      });
     }

   ngOnInit(): void {
      this.empForm.patchValue(this.data);
    }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .updateProduct(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
             this._coreService.openSnackBar('Employee detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addProduct(this.empForm.value).subscribe({
          next: (val: any) => {
           this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

}
