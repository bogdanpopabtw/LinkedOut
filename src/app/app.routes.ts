import { Routes } from '@angular/router';
import { NetworkTableComponent } from './features/network-table/network-table.component';
import { SettingsComponent } from './features/settings/settings.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { CompaniesTableComponent } from './features/companies-table/companies-table.component';
import { JobsTableComponent } from './features/jobs-table/jobs-table.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { unauthenticatedGuard } from './core/guards/unauthenticated.guard';

export const routes: Routes = [
  { path: 'login', canActivate:[unauthenticatedGuard], component: LoginComponent },
  { path: 'register', canActivate:[unauthenticatedGuard], component: RegisterComponent },
  { path: 'network', canActivate:[authenticatedGuard], component: NetworkTableComponent },
  { path: 'settings', canActivate:[authenticatedGuard], component: SettingsComponent },  
  { path: 'user/:id', canActivate:[authenticatedGuard], component: UserProfileComponent },
  { path: 'companies', canActivate:[authenticatedGuard], component: CompaniesTableComponent},
  { path: 'jobs', canActivate:[authenticatedGuard], component: JobsTableComponent},
  { path: '**', redirectTo: 'login' },
];
 