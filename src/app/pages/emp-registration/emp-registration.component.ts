import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-registration/user-service.service';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emp-registration',
  templateUrl: './emp-registration.component.html',
  styleUrls: ['./emp-registration.component.css']
})
export class EmpRegistrationComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,private _user:UserServiceService,
    private _coreService:CoreService, private _router: Router) {

    this.registrationForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      gender: ['', [Validators.required]],
      location: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.mustMatch('password', 'confirmPassword')
    });
  }

  
  ngOnInit(): void {
  //  this.registrationForm.patchValue(this.data);
  }

  // Custom validator for matching passwords
  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passControl = formGroup.controls[password];
      const confirmPassControl = formGroup.controls[confirmPassword];
      if (confirmPassControl.errors && !confirmPassControl.errors['mustMatch']) {
        return;
      }
      if (passControl.value !== confirmPassControl.value) {
        confirmPassControl.setErrors({ mustMatch: true });
      } else {
        confirmPassControl.setErrors(null);
      }
    };
  }

  // Handle form submission
  onSubmit() {
    if (this.registrationForm.valid) {
        this._user.addNewUser(this.registrationForm.value).subscribe({
          next:(val:any) =>{
            this._coreService.openSnackBar('Added New Employee successfully')
          //  this._dialogRef.close(true);
          this._router.navigate(['/employee-list']);
          },
          error:(error:any)=>{
            console.error(error);
          }
        })
        console.log(this.registrationForm.value);
      } else {
        console.log('Form is invalid');
      }
  }

}
