import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersDetailComponent } from './members-detail/members-detail.component';

export const routes: Routes = [
  { path: 'member-detail/:id', component: MembersDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModules {}
export const routesComponents = [MembersDetailComponent];
