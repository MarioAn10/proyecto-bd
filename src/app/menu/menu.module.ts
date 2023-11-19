import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { MenuRoutingModule } from './menu-routing.module';



@NgModule({
  declarations: [
    LayoutComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MenuRoutingModule,
    SharedModule
  ],
})
export class MenuModule { }
