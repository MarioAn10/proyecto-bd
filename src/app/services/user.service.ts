import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Funcionalidad Dummy
  getUsersData() {
    return [
      {
        login: 'mmartinezg',
        nombre: 'Mario',
        apellidos: 'Martinez García',
        correo: 'mmartinezg@unbosque.edu.co',
        tipo: 'Piloto',
        estado: 'activo'
      },
      {
        login: 'dvmurcia',
        nombre: 'Daniela',
        apellidos: 'Murcia Muñoz',
        correo: 'dvmurcia@unbosque.edu.co',
        tipo: 'Piloto',
        estado: 'activo'
      },
      {
        login: 'jdserrano',
        nombre: 'Dayana',
        apellidos: 'Serrano Castañeda',
        correo: 'jdserrano@unbosque.edu.co',
        tipo: 'Administrativo',
        estado: 'inactivo'
      }
    ];
  }

  // Aqui iria el servicio
  // Agregar tipo de retorno
  getUsers() {
    return Promise.resolve(this.getUsersData());
  }
}
