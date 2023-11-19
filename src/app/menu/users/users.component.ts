import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users: any[];
  cols: any[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().then(data => {
      this.users = data;
    });

    this.cols = [
      { field: 'login', header: 'Usuario' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'apellido', header: 'Apellido' },
      { field: 'correo', header: 'Correo' },
      { field: 'tipo', header: 'Tipo' },
      { field: 'estado', header: 'Estado' },
    ];
  }
}
