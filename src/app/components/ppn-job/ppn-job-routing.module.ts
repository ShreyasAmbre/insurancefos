import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PpnCreateJobComponent } from './ppn-create-job/ppn-create-job.component';
import { EditJobComponent } from './motor/edit-job/edit-job.component';

const routes: Routes = [
  { path: '', component: PpnCreateJobComponent },
  { path: 'motor-edit/:id', component: EditJobComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PpnJobRoutingModule { }
