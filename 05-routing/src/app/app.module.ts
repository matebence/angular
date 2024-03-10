import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app.routing.module';
import { AuthService } from './auth.service';
import { ErrorPageComponent } from './error-page/error-page.component';

// This is a good place where to register the routes, because its the main entry point to our single module

// const appRoutes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'users', component: UsersComponent},
//   {path: 'user/:id/:name', component: UserComponent},
//   {path: 'servers', component: ServersComponent},
//   {path: 'server/:id', component: ServerComponent},
//   {path: 'servers/:id/edit', component: EditServerComponent},
// ]

// Using children and nested Routes
// This part should be placed in its own class

// const appRoutes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'users', component: UsersComponent, children: [
//     {path: ':id/:name', component: UserComponent}
//   ]},
//   {path: 'servers', component: ServersComponent, children: [
//     {path: ':id', component: ServerComponent},
//     {path: ':id/edit', component: EditServerComponent}
//   ]},
//   { path: 'not-found', component: PageNotFoundComponent},
//   { path: 'something', redirectTo: '/not-found'},

//   // Important this has to be the last definition
//   { path: '**', redirectTo: '/not-found'}
// ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    ServersComponent,
    UserComponent,
    EditServerComponent,
    ServerComponent,
    PageNotFoundComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,

    // We register here our routes
    // RouterModule.forRoot(appRoutes)

    // Now we loading it from a external class
    AppRoutingModule 
  ],
  providers: [ServersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
