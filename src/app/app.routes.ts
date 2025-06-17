import { Routes } from '@angular/router';
import { CreateAccount } from './create-account/create-account';
import { UpdateAccount } from './update-account/update-account';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/create',
    pathMatch: 'full'
  },
  {
    path: 'create',
    component: CreateAccount
  },
  {
    path: 'update',
    component: UpdateAccount
  }
];
