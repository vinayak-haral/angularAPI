import { Component,OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:any = 'angularAPI';
  IsToken:boolean = false;
  isAuthenticated:any;
  constructor(private _authService:AuthService){ }

    ngOnInit(): void {
      this.isAuthenticated = this._authService.isAuthenticated;
    }

    logout(){
      this._authService.logout();
    }

}
