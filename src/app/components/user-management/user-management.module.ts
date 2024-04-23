import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/common/shared.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { UserManagementHomeComponent } from './user-management-home/user-management-home.component';
import { PaginatorModule } from 'primeng/paginator';
import { ToastModule } from 'primeng/toast';
import { CreateuserFormComponent } from './createuser-form/createuser-form.component';


@NgModule({
  declarations: [
    UserManagementHomeComponent,
    CreateuserFormComponent,
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PipesModule,
    PaginatorModule,
    ToastModule
  ]
})
export class UserManagementModule { }
