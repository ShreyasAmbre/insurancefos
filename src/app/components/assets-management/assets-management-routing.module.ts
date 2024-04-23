import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsManagementHomeComponent } from './assets-management-home/assets-management-home.component';

const routes: Routes = [
  { path: '', component: AssetsManagementHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsManagementRoutingModule { }
