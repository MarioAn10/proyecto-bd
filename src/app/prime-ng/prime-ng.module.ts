import { NgModule } from '@angular/core';

import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';


@NgModule({
  exports: [
    MessagesModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    MenubarModule,
    TableModule,
    ToolbarModule,
    ToastModule,
  ]
})
export class PrimeNgModule { }
