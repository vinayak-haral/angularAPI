import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';

import { Employee } from 'src/app/models/employee.model';
import { CoreService } from 'src/app/services/core.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeForm : FormGroup ;

  employee: Employee[] = [];
  filteredEmployee: Employee[] = [];

  displayedColumns: string[] = [
    // 'id',
    'name',
    'email',
    'phone',
    'price',
    'salary',
    'quantity',
    'department',
    'education',
    // 'company',
    // 'lastName',
    // 'gender',
    // 'experience',
    // 'package',
    'action',
  ];
  dataSource: Employee[] = [];

  constructor(private _empService: EmployeeService,private _coreService:CoreService,private _dialog: MatDialog, private _formBuilder: FormBuilder) {  }

   ngOnInit(): void {
    this._empService.getAppEmployee().subscribe(data => {
      this.employee = data
      this.dataSource = data;
      this.filteredEmployee = data;
      console.log("Data:",this.employee);
    });
    // this.employeeForm = this._formBuilder.group({
    //   name: ['', Validators.required],
    //   description: ['', Validators.required],
    //   price: ['', Validators.required]
    // });

    this.getEmployeeList();

  }
 
  ngSubmiit(){

  }

  deleteProduct(id: string): void {

    // if(!id){
    //   this._employeeService.deleteProduct(id).subscribe(() => {
    //     this.employee = this.employee.filter(p => p.id !== id);
    //   });
    // }
  }


  //All app componet data for bind
  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmployeeFormComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

  
  getEmployeeList() {
    this._empService.getAppEmployee().subscribe({
      next: (res) => {
        this.employee = res;
        this.dataSource = res;
        this.filteredEmployee = res;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    if (filterValue.trim() === '') {
      this.filteredEmployee = this.dataSource;
    } else {
      this.filteredEmployee = this.dataSource.filter(employee =>
        employee.name?.toLowerCase().includes(filterValue) ||
        employee.email?.toLowerCase().includes(filterValue) ||
        String(employee.phone)?.toLowerCase().includes(filterValue) ||
        employee.department?.toLowerCase().includes(filterValue)
      );
    }
  }

  deleteEmployee(id: string) {
    this._empService.deleteProduct(id).subscribe({
      next: (res) => {
       this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmployeeFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      },
    });
  }

}
