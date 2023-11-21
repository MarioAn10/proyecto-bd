import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/app/endpoints';
import { LoginDTO } from '../../models/userDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environments.baseUrl;

  constructor(private http: HttpClient) { }

  // Funcionalidad Dummy
  getUsersData(): LoginDTO[] {
    return [
      {
        userName: 'mmartinezg',
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
  getUsers() {
    return Promise.resolve(this.getUsersData());
  }

  // Funcionalidad dummy
  addUser(users: LoginDTO[], newUser: LoginDTO) {
    return Promise.resolve(this.addUserData(users, newUser));
  }

  addUserData(users: LoginDTO[], newUser: LoginDTO) {
    users.push(newUser);
  }
}
