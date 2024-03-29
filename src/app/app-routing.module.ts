import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { VerifyEmailComponent } from './component/verify-email/verify-email.component';
import { BoardsComponent } from './component/boards/boards.component';
import { AuthGuard } from './shared/guard.guard';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard/:id', component : DashboardComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component : BoardsComponent,canActivate: [AuthGuard]},
  {path: 'register', component : RegisterComponent},
  {path: 'verify-email', component : VerifyEmailComponent},
  {path: 'forgot-password', component : ForgotPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
