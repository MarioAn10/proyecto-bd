import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environments } from 'src/app/endpoints';

import { LoginDTO } from '../../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = `${environments.baseUrl}User/`;

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<any> {
    return this.http.post(`${this.userUrl}all`, null);
  }

  public addUser(user: LoginDTO): Observable<any> {
    return this.http.post(`${this.userUrl}create`, user, { responseType: 'text', observe: 'response' });
  }

  public updateUser(user: LoginDTO): Observable<any> {
    return this.http.put(`${this.userUrl}update`, user, { responseType: 'text', observe: 'response' });
  }

  public deleteUser(user: LoginDTO): Observable<any> {
    return this.http.delete(`${this.userUrl}delete`, { responseType: 'text', observe: 'response', body: user });
  }


  // Funcionalidad Dummy
  getUsersData(): LoginDTO[] {
    return [

      {
        userName: 'mmartinezg',
        password: '12345678',
        name: 'Mario',
        address: 'Martinez García',
        email: 'mmartinezg@unbosque.edu.co',
        type: 'P',
        status: '1'
      },
      {
        userName: 'dvmurcia',
        name: 'Daniela',
        address: 'Murcia Muñoz',
        email: 'dvmurcia@unbosque.edu.co',
        type: 'P',
        status: '1'
      },
      {
        userName: 'jdserrano',
        name: 'Dayana',
        address: 'Serrano Castañeda',
        email: 'jdserrano@unbosque.edu.co',
        type: 'A',
        status: '0'
      },
    ];
  }

  // Aqui iria el servicio
  // Agregar tipo de retorno
  getUsersDummy() {
    return Promise.resolve(this.getUsersData());
  }

  // Funcionalidad dummy
  addUserDummy(users: LoginDTO[], newUser: LoginDTO) {
    return Promise.resolve(this.addUserData(users, newUser));
  }

  private addUserData(users: LoginDTO[], newUser: LoginDTO) {
    users.push(newUser);
  }
}
