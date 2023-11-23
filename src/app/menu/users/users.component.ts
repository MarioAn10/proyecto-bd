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

  isEmail: boolean = true;

  isLoading: boolean;

  userDialog: boolean;
  dialogHeader: string;
  edit: boolean;

  submitted: boolean;

  types: ListElement[];
  statuses: ListElement[];

  user: LoginDTO;
  users: LoginDTO[];
  cols: any[];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.loadTypesStatuses();
    this.getUsers();
    // Funcionalidad dummy
    //this.getUsersDummy();
  }

  private getUsers() {
    this.userService.getUsers()
      .subscribe(
        {
          next: (res) => {
            this.isLoading = false;
            this.users = res;
          },
          error: (err) => console.error('Error: ', err)
        }
      );
  }

  saveUser() {
    this.submitted = true;
    this.isLoading = true;
    this.user.actionUser = this.getActionUser();
    if (this.user.userName?.trim()) {
      if (this.findUserIndexById(this.user.userName) !== -1) {
        this.userService.updateUser(this.user)
          .subscribe(
            {
              next: (res) => {
                if (res.status === 200) {
                  this.pushMessage('success', 'Usuario editado exitosamente');
                } else {
                  this.pushMessage('error', `'No fue posible editar el usuario`);
                }
              },
              error: (err) => {
                this.pushMessage('error', `'No fue posible editar el usuario: ${err.error}`);
              }
            }
          );

        //Funcionalidad dummy
        //this.users[this.findUserIndexById(this.user.userName)] = this.user;
        //this.pushMessage('success', 'Usuario editado exitosamente');
      } else {
        this.userService.addUser(this.user)
          .subscribe(
            {
              next: (res) => {
                if (res.status === 200) {
                  this.pushMessage('success', 'Usuario creado exitosamente');
                  this.getUsers();
                } else {
                  this.pushMessage('error', `'No fue posible crear el usuario`);
                }
              },
              error: (err) => {
                this.pushMessage('error', `'No fue posible crear el usuario: ${err}`);
              }
            }
          );
      }
    }
    //Funcionalidad dummy
    //this.saveDummy();
    this.userDialog = false;
    this.isLoading = false;
    this.resetUser();
    this.getUsers();
  }

  public deleteUser() {
    this.user.actionUser = this.getActionUser();
    this.confirmationService.confirm({
      message: `¿Desea eliminar el usuario <b>${this.user.userName}</b>?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Aceptar',
      rejectLabel: 'Cancelar',
      closeOnEscape: true,
      accept: () => {
        this.userService.deleteUser(this.user)
          .subscribe(
            {
              next: (res) => {
                if (res.status === 200) {
                  this.pushMessage('success', 'Usuario eliminado exitosamente');
                  this.getUsers();
                }
              },
              error: (err) => {
                console.error('Error al eliminar: ', err);
                this.pushMessage('error', 'Error al eliminar el usuario');
              }
            }
          );
        // Funcionalidad Dummy
        //this.users = this.users.filter((val) => val.userName !== this.user.userName);
        this.resetUser();
        //this.pushMessage('success', 'Usuario eliminado exitosamente')
      }
    });
  }

  private getUsersDummy() {
    this.userService.getUsersDummy()
      .then(data => this.users = data)
      .catch(err => console.error('Error al cargar los usuarios', err));
  }

  private saveDummy() {
    if (this.user.userName?.trim()) {
      if (this.findUserIndexById(this.user.userName) !== -1) {
        this.users[this.findUserIndexById(this.user.userName)] = this.user;
        this.pushMessage('success', 'Usuario editado exitosamente')
      } else {
        this.userService.addUserDummy(this.users, this.user)
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

  private loadTypesStatuses() {
    this.types = [
      { name: 'Piloto', code: 'P' },
      { name: 'Auxiliar de vuelo', code: 'AV' },
      { name: 'Administrativo', code: 'A' },
    ];

    this.statuses = [
      { name: 'Activo', code: 'True', value: '1' },
      { name: 'Inactivo', code: 'False', value: '0' }
    ];
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

  private getActionUser(): string | null {
    return JSON.parse(localStorage.getItem('usuario') || "");
  }
}
