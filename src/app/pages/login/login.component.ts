import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  errorMessage: string = '';
  public loginValid = true;

  constructor(
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Get form controls for validation
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    // Stop if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    // Call the AuthService to handle login
    this._authService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe({
        next: (value:any) => {
          console.log("value",value);
          localStorage.setItem('token',value);
          this.router.navigate(['/employee-list']);
        },
        error: (error) => {
          this.errorMessage = 'Invalid username or password';
        }
      });
  }
}
