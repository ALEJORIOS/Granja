import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: "auth/login", loadComponent: () => import('./auth/login/login.component')},
  {path: "auth/register", loadComponent: () => import('./auth/register/register.component')},
  {path: "auth/recover", loadComponent: () => import('./auth/recover/recover.component')},
  {path: "home", loadComponent: () => import('./pages/land/land.component')},
  {path: "students", loadComponent: () => import('./pages/students/students.component')},
  {path: "", redirectTo: "auth/login", pathMatch: "full"},
  {path: "**", loadComponent: () => import('./pages/not-found/not-found.component')},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
