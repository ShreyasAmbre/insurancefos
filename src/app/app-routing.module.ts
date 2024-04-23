import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "dashboard",
    loadChildren: () => import('./components/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
    data: { role: ["AD001", "RL001", "RL002", "RL003", "RL004"] },
    canActivate: [AuthGuard]
  },
  {
    path: "assestsmanagement",
    loadChildren: () => import('./components/assets-management/assets-management.module')
      .then(m => m.AssetsManagementModule),
    data: { role: ["AD001", "RL003"] },
    canActivate: [AuthGuard]
  },
  {
    path: "usermanagement",
    loadChildren: () => import('./components/user-management/user-management.module')
      .then(m => m.UserManagementModule),
    data: { role: ["AD001"] },
    canActivate: [AuthGuard]
  },
  {
    path: "ppnsearch",
    loadChildren: () => import('./components/ppn-search/ppn-search.module')
      .then(m => m.PpnSearchModule),
    data: { role: ["AD001", "RL001", "RL002", "RL003"] },
    canActivate: [AuthGuard]
  },
  {
    path: 'ppnMaster',
    loadChildren: () => import('./components/ppn-master/ppn-master.module')
      .then(m => m.PpnMasterModule),
    data: { role: ["AD001", "RL001", "RL002", "RL003"] },
    canActivate: [AuthGuard]
  },
  {
    path: 'job',
    loadChildren: () => import('./components/ppn-job/ppn-job.module')
      .then(m => m.PpnJobModule)
  },
  {
    path: 'storetradezone',
    loadChildren: () => import('./components/store-trade-zone/store-trade-zone.module')
      .then(m => m.StoreTradeZoneModule),
    data: { role: ["AD001", "RL003"] },
    canActivate: [AuthGuard]
  },
  {
    path: 'capacity',
    loadChildren: () => import('./components/capacity-management/capacity-management.module')
      .then(m => m.CapacityManagementModule),
    data: { role: ["AD001", "RL001", "RL002", "RL003", "RL004"] },
    canActivate: [AuthGuard]
  },

  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: "**", redirectTo: '', pathMatch: 'full' },
];



@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
