import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  public menuItems: MenuItem[] = [];

  constructor( private router: Router) { }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Listar Usuarios',
            icon: 'pi pi-list',
            routerLink: 'users'
          }
        ]
      },
      {
        label: 'Auditoría',
        icon: 'pi pi-exclamation-circle',
        items: [
          {
            label: 'Consultar Auditoría',
            icon: 'pi pi-history',
            routerLink: 'audit'
          }
        ]
      },
    ];
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
