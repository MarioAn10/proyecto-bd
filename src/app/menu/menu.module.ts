import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout/layout.component';
import { UsersComponent } from './users/users.component';
import { MenuRoutingModule } from './menu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuditComponent } from './audit/audit.component';



@NgModule({
  declarations: [
    LayoutComponent,
    UsersComponent,
    AuditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimeNgModule,
    MenuRoutingModule,
    SharedModule
  ],
})
export class MenuModule { }
