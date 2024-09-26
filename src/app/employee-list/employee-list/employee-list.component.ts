import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeForm : FormGroup ;

  employee: Employee[] = [];


  constructor(private _employeeService: EmployeeService, private _formBuilder: FormBuilder) {  }

   ngOnInit(): void {
    this._employeeService.getAppEmployee().subscribe(data => {
      this.employee = data
      console.log("Data:",this.employee);
    });
    this.employeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }
 
  ngSubmiit(){

  }

  deleteProduct(id: string): void {

    if(!id){
      this._employeeService.deleteProduct(id).subscribe(() => {
        this.employee = this.employee.filter(p => p.id !== id);
      });
    }
  }

}
