import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginDTO } from 'src/app/models/loginDTO';

const AUTH_ENDPOINT = 'endpoint_login';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post(
      AUTH_ENDPOINT + 'signin',
      loginDTO,
      httpOptions
    );
  }
}
