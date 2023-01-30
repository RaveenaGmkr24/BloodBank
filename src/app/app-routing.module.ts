import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlodGroupListComponent } from './blod-group-list/blod-group-list.component';

const routes: Routes = [
  // {path: '/', redirectTo: '/bloodGroupList'},
  { path: 'bloodGroupList', component: BlodGroupListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routeComponents = [BlodGroupListComponent];
