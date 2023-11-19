import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  public loginForm: FormGroup;
  public submitted: boolean;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.submitted = false;
  }

  onSubmit() {

    console.log(this.loginForm.value);
    this.submitted = true;

    this.authService
      .login(this.loginForm.value)
      .then(
        res => {
          if (res) {
            // TO-DO: Agregar logica para localStorage de la sesion
            alert(JSON.stringify(this.loginForm.value));
            this.router.navigate(['menu']);
          } else {
            // Agregar mensaje de credenciales incorrectas
            console.error('Credenciales incorrectas');
          }
        })
      .catch(err => console.error('Error', err)
      );
  }
}

