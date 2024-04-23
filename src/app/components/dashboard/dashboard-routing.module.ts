import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobSummeryComponent } from './job-summery/job-summery.component';

const routes: Routes = [
 { path: '', component: DashboardHomeComponent,
    children: [
      { path:'job-summary', component: JobSummeryComponent },
      { path: 'job-list', component: JobListComponent },
      { path: '', redirectTo: 'job-list', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
