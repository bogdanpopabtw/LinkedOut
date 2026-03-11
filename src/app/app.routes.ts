import { Routes } from '@angular/router';
import { NetworkTableComponent } from './features/network-table/network-table.component';
import { SettingsComponent } from './features/settings/settings.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';

export const routes: Routes = [
  { path: 'network', component: NetworkTableComponent },
  { path: 'settings', component: SettingsComponent },  
  { path: 'user/:id', component: UserProfileComponent },
  { path: '**', redirectTo: 'network' },
];
 