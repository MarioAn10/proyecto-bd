import { Component } from '@angular/core';
import { ListElement } from 'src/app/models/list-elements';
import { LoginDTO } from 'src/app/models/userDTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  userDialog: boolean;

  submitted: boolean;

  types: ListElement[];
  statuses: ListElement[];

  user: LoginDTO;
  users: any[];
  cols: any[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Validar implementacion - modelo
    this.types = [
      {
        name: 'Piloto',
        code: 'P'
      },
      {
        name: 'Auxiliar de vuelo',
        code: 'AV'
      },
      {
        name: 'Administrativo',
        code: 'A'
      }
    ];

    this.statuses = [
      {
        name: 'Activo',
        code: '1'
      },
      {
        name: 'Inactivo',
        code: '0'
      }
    ];

    this.userService.getUsers()
      .then(
        data => {
          this.users = data;
        })
      .catch(
        err => console.error('Error al cargar los usuarios', err)
      );

    this.cols = [
      { field: 'login', header: 'Usuario' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'correo', header: 'Correo' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' },
    ];
  }

  openNew() {
    this.user = {
      userName: '',
      password: '',
      name: '',
      address: '',
      email: '',
      type: '',
      status: ''
    };
    this.submitted = false;
    this.userDialog = true;
  }

  saveUser() {
    this.submitted = true;

    console.log('Usuario a crear: ', this.user);
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }
}
