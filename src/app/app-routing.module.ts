import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list/employee-list.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // { path:'',component:AppComponent },
  { path: '', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route to login
  { path:'employee-list',component:EmployeeListComponent,canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
