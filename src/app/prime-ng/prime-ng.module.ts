import { NgModule } from '@angular/core';

import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


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
    DialogModule,
    DropdownModule,
    ConfirmDialogModule,
    ProgressSpinnerModule
  ]
})
export class PrimeNgModule { }
