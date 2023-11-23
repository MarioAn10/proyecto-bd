import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/models/userDTO';
import { environments } from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = `${environments.baseUrl}Login/login`;
  private dummyUser: LoginDTO = {
    userName: 'mmartinezg',
    password: 'Storm2020*'
  }

  constructor(private http: HttpClient) { }


  // Funcionalidad dummy
  private doAutenticateDummy(user: LoginDTO): boolean {
    return ((user.userName === this.dummyUser.userName) && (user.password === this.dummyUser.password)) ? true : false;
  }

  // Funcionalidad Dummy
  public login(user: LoginDTO) {
    return Promise.resolve(this.doAutenticateDummy(user));
  }


  
  public doAuthenticate(user: LoginDTO): Observable<any> {
    return this.http.post(
      this.authUrl, user
    );
  }
}
