import { Component,OnInit, ViewChild } from '@angular/core';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CoreService } from './services/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularAPI';

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
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;



  constructor(  private _dialog: MatDialog,
    private _empService: EmployeeService, private _coreService:CoreService){ }

    ngOnInit(): void {
      this.getEmployeeList();
    }

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
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
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
