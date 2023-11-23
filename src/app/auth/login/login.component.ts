import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

import { MessageService } from 'primeng/api';

import { LoginDTO } from 'src/app/models/userDTO';

import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public submitted: boolean;
  private user: LoginDTO;
  private key: string = '123';

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'userName': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.submitted = false;
  }

  onSubmit() {

    console.log(this.loginForm.value);
    this.user = this.loginForm.value;
    this.submitted = true;

    this.authService
      .login(this.user)
      .then(
        res => {
          if (res) {
            // TO-DO: Agregar logica para localStorage codificada
            this.saveData('usuario', this.encrypt(JSON.stringify(this.user)));
            this.router.navigate(['menu/home']);
          } else {
            this.messageService.add(
              { severity: 'error', summary: 'Error', detail: 'Credenciales Incorrectas' }
            );
            console.error('Credenciales incorrectas');
          }
        })
      .catch(err => console.error('Error', err)
      );
  }

  private saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

}

