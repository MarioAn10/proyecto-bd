import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/models/userDTO';
import { environments } from 'src/app/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environments.baseUrl;
  private dummyUser: LoginDTO = {
    userName: 'mmartinezg',
    password: 'Storm2020*'
  }

  constructor(private http: HttpClient) { }

  // Aca va la implementacion del servicio
  // TO-DO: Validar responsabilidad de los metodos
  doAutenticate(user: LoginDTO): boolean {
    return ((user.userName === this.dummyUser.userName) && (user.password === this.dummyUser.password)) ? true : false;
  }

  login(user: LoginDTO) {
    return Promise.resolve(this.doAutenticate(user));
  }

  /*
  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(
      this.baseUrl + 'signin',
      loginDTO,
    );
  }
  */
}
