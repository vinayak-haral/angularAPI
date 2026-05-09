import { Component,OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ModalService } from './services/modal.service';
import { EmpRegistrationComponent } from './pages/emp-registration/emp-registration.component';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title:any = 'angularAPI';
  IsToken:boolean = false;
  isAuthenticated:any;
  public breadcrumbs: Array<{ label: string; url: string }> = [];
  @ViewChild('empRegistration') empRegistration!: EmpRegistrationComponent;
  
  constructor(
    private _authService:AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _modalService: ModalService
  ) { }

    ngOnInit(): void {
      this.checkAuthentication();
      
      // Listen to modal service to open signup modal
      this._modalService.openSignupModal$.subscribe(() => {
        this.openSignupModal();
      });
      
      // Listen to authentication state changes from AuthService
      this._authService.getIsAuthenticated().subscribe((authState) => {
        this.isAuthenticated = authState;
      });
      
      // Listen to route changes to update authentication and breadcrumbs
      this._router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.checkAuthentication();
          this.breadcrumbs = this.buildBreadCrumb(this._activatedRoute.root);
        }
      });
    }

    checkAuthentication() {
      const token = localStorage.getItem('token');
      const currentUser = localStorage.getItem('currentUser');
      this.isAuthenticated = !!(token || currentUser);
      this._authService.setIsAuthenticated(this.isAuthenticated);
    }

    logout(){
      this._authService.logout();
      this.isAuthenticated = false;
      this._router.navigate(['/login']);
    }

    openSignupModal() {
      if (this.empRegistration) {
        this.empRegistration.openRegistrationModal();
      }
    }

    private buildBreadCrumb(route: ActivatedRoute, url: string = '', breadcrumbs: Array<{ label: string; url: string }> = []): Array<{ label: string; url: string }> {
      const children: ActivatedRoute[] = route.children;

      if (children.length === 0) {
        return breadcrumbs;
      }

      for (const child of children) {
        if (child.outlet !== 'primary') {
          continue;
        }

        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        if (routeURL !== '') {
          url += `/${routeURL}`;
        }

        const label = child.snapshot.data['breadcrumb'];
        if (label) {
          breadcrumbs.push({ label, url });
        }

        return this.buildBreadCrumb(child, url, breadcrumbs);
      }

      return breadcrumbs;
    }
/////////////////////

reverse(params: string): string {
  let reversed = "";
  for(let i = params.length - 1; i >= 0; i--) {
    reversed += params[i];
  }
  return reversed;
}
/////////////////////////

hasRepeatedChars(str: string) {
  var dublicate = "";
// Check each character against all subsequent characters
for (let i = 0; i < str.length; i++) {
  for (let j = i + 1; j < str.length; j++) {
    if (str[i] === str[j]) {
      dublicate +=str[i];
    }
  }
}
 return dublicate;
}

hasRepeatedArray(str: any) {
  var dublicate:any = [];
// Check each character against all subsequent characters
for (let i = 0; i < str.length; i++) {
  for (let j = i + 1; j < str.length; j++) {
    if (str[i] === str[j]) {
      dublicate +=str[i];
    }
  }
}
 return dublicate;
}


ngAfterViewInit() {
  const data = this.reverse("VINAYAK");
  console.log(data);
  const strData  = this.hasRepeatedChars("KVVinayakk");
  console.log(strData);
  const arrayStr  = this.hasRepeatedArray(["K","V","V","i","n","a","y","a","k","k","k"]);
  console.log(arrayStr);
}

////////////////////////

}
