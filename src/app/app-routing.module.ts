import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "auth/login", loadComponent: () => import('./auth/login/login.component')},
  {path: "auth/register", loadComponent: () => import('./auth/register/register.component')},
  {path: "auth/recover", loadComponent: () => import('./auth/recover/recover.component')},
  {path: "home", loadComponent: () => import('./pages/land/land.component')},
  {path: "students", loadComponent: () => import('./pages/students/students.component')},
  {path: "rate-students", loadComponent: () => import('./pages/rate-students/rate-students.component')},
  {path: "control", loadComponent: () => import('./pages/control-panel/control-panel.component')},
  {path: "reports", loadComponent: () => import('./pages/reports/reports.component')},
  {path: "modify-report", loadComponent: () => import('./pages/modify-report/modify-report.component')},
  {path: "", redirectTo: "auth/login", pathMatch: "full"},
  {path: "setting", loadComponent: () => import('./pages/setting/setting.component')},
  {path: "**", loadComponent: () => import('./pages/not-found/not-found.component')},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
