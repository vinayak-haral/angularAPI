import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { EmpRegistrationComponent } from './pages/emp-registration/emp-registration.component';
import { BeginDashboardComponent } from './pages/begin-dashboard/begin-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: BeginDashboardComponent, data: { breadcrumb: 'Dashboard' } },
  { path: 'login', component: LoginComponent, data: { breadcrumb: 'Login' } },
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Employee List' } },
  { path: 'employee-regis', component: EmpRegistrationComponent, data: { breadcrumb: 'Employee Registration' } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
