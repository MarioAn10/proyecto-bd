import { Component } from '@angular/core';
import { ListElement } from 'src/app/models/list-elements';
import { LoginDTO } from 'src/app/models/userDTO';
import { UserService } from 'src/app/services/user/user.service';

import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [ConfirmationService]
})
export class UsersComponent {
  messages: Message[] = [];

  pattern: RegExp = new RegExp('/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;');
  isEmail: boolean = true;

  userDialog: boolean;
  dialogHeader: string;
  edit: boolean;

  submitted: boolean;

  types: ListElement[];
  statuses: ListElement[];

  user: LoginDTO;
  users: any[];
  cols: any[];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    // TODO: Validar implementacion - modelo
    this.types = [
      { name: 'Piloto', code: 'P' },
      { name: 'Auxiliar de vuelo', code: 'AV' },
      { name: 'Administrativo', code: 'A' },
    ];

    this.statuses = [
      { name: 'Activo', code: '1' },
      { name: 'Inactivo', code: '0' }
    ];

    this.userService.getUsers()
      .then(data => this.users = data)
      .catch(err => console.error('Error al cargar los usuarios', err));
  }

  saveUser() {
    this.submitted = true;

    if (this.user.userName?.trim()) {
      if (this.findUserIndexById(this.user.userName) !== -1) {
        // TODO: Modificar logica para consumir servicio
        this.users[this.findUserIndexById(this.user.userName)] = this.user;
        this.pushMessage('success', 'Usuario editado exitosamente')
      } else {
        this.userService.addUser(this.users, this.user)
          .then(
            res => {
              this.pushMessage('success', 'Usuario creado exitosamente');
            }
          )
          .catch(
            err => this.pushMessage('error', `'No fue posible crear el usuario: ${err}`)
          );
      }
    }
    // TODO: hacer reload de datos con el servicio
    this.users = [...this.users];
    this.userDialog = false;
    this.resetUser();
  }

  deleteUser() {
    this.confirmationService.confirm({
      message: `¿Desea eliminar el usuario <b>${this.user.userName}</b>?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      closeOnEscape: true,
      accept: () => {
        // TODO: Agregar servicio de eliminacion
        this.users = this.users.filter((val) => val.userName !== this.user.userName);
        this.user = {};
        this.pushMessage('success', 'Usuario eliminado exitosamente')
      }
    });
  }

  findUserIndexById(userName: string): number {
    let index = -1;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].userName === userName) {
        index = i;
        break;
      }
    }
    return index;
  }

  resetUser() {
    this.user = {};
  }

  openNew() {
    this.resetUser();
    this.dialogHeader = 'Nuevo Usuario';
    this.submitted = false;
    this.userDialog = true;
    this.edit = false;
  }

  openEdit(user: LoginDTO) {
    if (this.validateSelectedUser()) {
      this.dialogHeader = 'Editar Usuario';
      this.user = { ...user };
      this.submitted = false;
      this.edit = true;
      this.userDialog = true;
    }
  }

  validateSelectedUser(): boolean {
    if (this.user === undefined) {
      this.pushMessage('info', 'Debe seleccionar un usuario para poder editar');
      return false;
    } else {
      return true;
    }
  }

  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  pushMessage(tipo: string, msj: string) {
    this.messages = [];
    this.messages.push({ severity: tipo, summary: msj });
    setTimeout(() => {
      this.messages = [];
    }, 10000);
  }

  onRowSelect(event: any) {
    this.user = { ...event.data };
  }

  onRowUnselect(event: any) {
    this.resetUser();
  }

  getTypeValueByCode(code: string): string {
    const type = this.types.find(t => t.code === code);
    return type ? type.name : '';
  }

  getStatusValueByCode(code: string): string {
    const status = this.statuses.find(s => s.code === code);
    return status ? status.name : '';
  }
}
