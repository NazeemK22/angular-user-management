import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        loadChildren: () => import('../app/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard]
    },
    { path: '**', component: PageNotFoundComponent }
];