import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users-list/add-user/add-user.component';
import { EditUserComponent } from './users-list/edit-user/edit-user.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  { path: '', component: UsersListComponent },
  { path:'add-user',component:AddUserComponent},
  { path:'edit-user/:id',component:EditUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
