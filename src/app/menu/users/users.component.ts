import { Component } from '@angular/core';
import { ListElement } from 'src/app/models/list-elements';
import { LoginDTO } from 'src/app/models/userDTO';
import { UserService } from 'src/app/services/user/user.service';

import { Message } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  messages: Message[] = [];

  pattern: RegExp = new RegExp('/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;');
  isEmail: boolean = true;

  createUserDialog: boolean;

  submitted: boolean;

  types: ListElement[];
  statuses: ListElement[];

  user: LoginDTO;
  users: any[];
  cols: any[];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    // Validar implementacion - modelo
    this.types = [
      { name: 'Piloto', code: 'P' },
      { name: 'Auxiliar de vuelo', code: 'AV' },
      { name: 'Administrativo', code: 'A' }
    ];

    this.statuses = [
      { name: 'Activo', code: '1' },
      { name: 'Inactivo', code: '0' }
    ];

    this.userService.getUsers()
      .then(data => this.users = data)
      .catch(err => console.error('Error al cargar los usuarios', err));

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
    this.resetUser();
    this.submitted = false;
    this.createUserDialog = true;
  }

  saveUser() {
    this.submitted = true;
    console.log('Usuario a crear: ', this.user);

    this.userService.addUser(this.users, this.user)
      .then(
        res => {
          this.pushMessage('success', 'Usuario creado exitosamente');
          console.log(this.users);
        }
      )
      .catch(
        err => this.pushMessage('error', `'No fue posible crear el usuario: ${err}`)
      );

    // pendiente hacer reload de datos - en teoria, se consultan nuevamente de la BD
    this.users = [...this.users];
    this.createUserDialog = false;
    this.resetUser();
  }

  resetUser() {
    this.user = {
      userName: '',
      password: '',
      name: '',
      address: '',
      email: '',
      type: '',
      status: ''
    };
  }

  hideDialog() {
    this.createUserDialog = false;
    this.submitted = false;
  }

  pushMessage(tipo: string, msj: string) {
    this.messages = [];
    this.messages.push({ severity: tipo, summary: msj });
    setTimeout(() => {
      this.messages = [];
    }, 10000);
  }
}
