import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard, AuthGuardChild } from './auth.guard.service';
import { CanDeactivateGuard } from './servers/edit-server/deactivate.guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ServerResolver } from './servers/server/server.resolver.service';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'users', component: UsersComponent, children: [
    {path: ':id/:name',
     component: UserComponent}
  ]},
  {path: 'servers', 
     // Protecting parent
     // canActivate: [AuthGuard],

     // Protecting childs
     canActivateChild: [AuthGuardChild],
     component: ServersComponent,
    children: [
      {path: ':id', component: ServerComponent,
       resolve: {server: ServerResolver}},
      {path: ':id/edit', component: EditServerComponent,
       canDeactivate: [CanDeactivateGuard]}
  ]},
  { path: 'error', component: ErrorPageComponent, 
    data: {message: 'This is the error message'}},
    { path: 'not-found', component: PageNotFoundComponent},
    { path: 'something', redirectTo: '/not-found'},

  // Important this has to be the last definition
  { path: '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
