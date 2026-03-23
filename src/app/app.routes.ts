import { Routes } from '@angular/router';
import { NetworkTableComponent } from './features/network-table/network-table.component';
import { SettingsComponent } from './features/settings/settings.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { CompaniesTableComponent } from './features/companies-table/companies-table.component';
import { JobsTableComponent } from './features/jobs-table/jobs-table.component';

export const routes: Routes = [
  { path: 'network', component: NetworkTableComponent },
  { path: 'settings', component: SettingsComponent },  
  { path: 'user/:id', component: UserProfileComponent },
  { path: 'companies', component: CompaniesTableComponent},
  { path: 'jobs', component: JobsTableComponent},
  { path: '**', redirectTo: 'network' },
];
 