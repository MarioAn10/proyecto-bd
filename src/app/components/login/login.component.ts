import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/login/auth.service';

@Component({
  selector: 'home-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) { }

  public loginForm: FormGroup;
  public submitted: boolean;

  ngOnInit() {
    this.loginForm = new FormGroup({
      'user': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
    this.submitted = false;
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(res => { 
      //logica si loguea o no
      console.log(res);
    })

    this.submitted = true;
    alert(JSON.stringify(this.loginForm.value));
  }
}

