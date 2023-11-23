import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AuditComponent } from './audit/audit.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'users', component: UsersComponent },
            { path: 'audit', component: AuditComponent },
            { path: '**', redirectTo: 'home' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }
