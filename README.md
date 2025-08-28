Install nvm - Node version manager
- https://github.com/coreybutler/nvm-windows

Commands

    nvm --version
    nvm list available
    nvm install latest
    nvm ls
    nvm install 20.2.0
    nvm use 20.2.0
    nvm uninstall 20.2.0

Check versions

    npm version
    node --version

Install Angular

    npm install -g @angular/cli@latest
    npm remove -g @angular/cli@latest
    npm ls
    npm ls -g
    
If checked out project then first

    npm install

Create a new app

    ng new my-app

Start the dev server

    ng serve

Create componenet (or we do it manually)

    ng generate component component-name
    ng generate directive directive-name
    ng generate service service-name

From Angular v17 onwards, Standalone is now the new default for the CLI. So when you create a new project, you won't have any modules in it if you don't specify anything. However, it is still possible to create a module-based app by using the --no-standalone flag : **ng new --no-standalone**

Adding bootstrap to Angular project

    npm install --save bootstrap
    angular.json -> "node_modules/bootstrap/dist/css/bootstrap.min.css"
    Order of the *.css definitions are important because of the css rule `Last always win`

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "00-standalone": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/00-standalone",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.min.css",
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "00-standalone:build:production"
            },
            "development": {
              "buildTarget": "00-standalone:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "buildTarget": "00-standalone:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false
  }
}
```

***Property '...' has no initializer and is not definitely assigned in the constructo**

```json
"compilerOptions": {
    "strictPropertyInitialization": false,
    ...
}
```

**The basics**

- The server at the end servs our `index.html` and `app.js` (This app.js injection is done by the CLI)
- `AppComponenet.ts` - it holds  the app-root selector. Which is our root
- main.ts - it start our `AppModule`
- This is the root module which again uses the `AppComponenet.ts` 

**TypeScript**

TypeScript (More features than vanilla JS) -> Compiled to -> JavaScript

```ts
// Duck typing
var animal = {          
    name: "Fido",
    species: "Dog",
    age: 5,
    speak: function() { 
        console.log('Woof!');
    }
}

// Type inference
function totalLength(x, y) {
    var total = x.length + y.lengt;
    return total;
}

// Specifying types     
function totalLength(x: any[], y: string): number {
    var total: number = x.length + y.length;
    return total;
}

// Using union type we ccan specify more types for one variable
function totalLength(x: (string | any[]), y: (string | any[])): number {
    var total: number = x.length + y.length;
    
    x.slice(0)
    
    if(x instanceof Array) {
        x.push('TypeScript')
    }
    
    if(x instanceof String) {
        x.substr(0)
    }
    
    return total;
}

 // Function overloads
function totalLength(x: string, y: string): number
function totalLength(x: any[], y: any[]): number
function totalLength(x: (string | any[]), y: (string | any[])): number {
    var total: number = x.length + y.length;
    
    x.slice(0)
    
    if(x instanceof Array) {
        x.push('TypeScript')
    }
    
    if(x instanceof String) {
        x.substr(0)
    }
    
    return total;
}

// Custom Types

interface Todo {
    name: string;
    completed?: boolean; // this is optional
}

interface ITodoService {
    add(todo: Todo): Todo;
    delete(todo: Todo): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
}


// Using interfaces to describe functions   

interface jQuery {
    (selector: string): HTMLElement; // Anonymous function
    version: number;
}


var $ = <jQuery>function(selector: string) {
    // Find DOM element
}

$.version = 1.18

var container = $('#container'); //Anonymous function use here

// Using classes and static keyword

class TodoService {
    static lastId: number = 0;

    constructor(private todos: Todo[]) {
    }

    add(todo: Todo) {
        var newId = TodoService.getNextId();
    }

    getAll() {
        return this.todos;
    }

    static getNextId() {
        return TodoService.lastId += 1;
    }
}

interface Todo {
    name: string;
    state: TodoState;
}

enum TodoState {
    New = 1,
    Active,
    Complete,
    Deleted
}

var todo = {
    name: "Pick up drycleaning",
    state: TodoState.Complete
}

// Accessors get and set

class SmartTodo {

    _state: TodoState;
    
    name: string;
    
    get state() {
        return this._state;
    }
    
    set state(newState) {
        
        if(newState == TodoState.Complete) {
            
            var canBeCompleted = 
                this.state == TodoState.Active
                || this.state == TodoState.Deleted;
                
            if(!canBeCompleted) {
                throw "Todo must be Active or Deleted in order to be marked Completed"
            }
        }
        
        this._state = newState;
    }
    
    constructor(name: string) {
        this.name = name;
    }
}

// Inheriting behavior

interface Todo {
    name: string;
    state: TodoState;
}

enum TodoState {
    New = 1,
    Active,
    Complete,
    Deleted
}

class TodoStateChanger {
    
    constructor(private newState: TodoState) {
    }
    
    canChangeState(todo: Todo): boolean {
        return !!todo;
    }
    
    changeState(todo: Todo): Todo {
        if(this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        
        return todo;
    }
    
}

class CompleteTodoStateChanger extends TodoStateChanger {

    constructor() {
        super(TodoState.Complete);
    }
    
    canChangeState(todo: Todo): boolean {
        return super.canChangeState(todo) && (
                todo.state == TodoState.Active
            || todo.state == TodoState.Deleted
        )
    }
}

// Abstract class

interface Todo {
    name: string;
    state: TodoState;
}

enum TodoState {
    New = 1,
    Active,
    Complete,
    Deleted
}

abstract class TodoStateChanger {
    
    constructor(private newState: TodoState) {
    }
    
    abstract canChangeState(todo: Todo): boolean;
    
    changeState(todo: Todo): Todo {
        if(this.canChangeState(todo)) {
            todo.state = this.newState;
        }
        
        return todo;
    }
    
}

class CompleteTodoStateChanger extends TodoStateChanger {

    constructor() {
        super(TodoState.Complete);
    }
    
    canChangeState(todo: Todo): boolean {
        return !!todo && (
                todo.state == TodoState.Active
            || todo.state == TodoState.Deleted
        )
    }
    
}

// Visibility with access modifiers

interface Todo {
    name: string;
    state: TodoState;
}

enum TodoState {
    New = 1,
    Active,
    Complete,
    Deleted
}


class TodoService {

    private static _lastId: number = 0;

    private get nextId() {
        return TodoService.getNextId();
    }

    private set nextId(nextId) {
        TodoService._lastId = nextId - 1;
    }

    constructor(private todos: Todo[]) {
    }

    add(todo: Todo) {
        var newId = this.nextId;
    }

    private getAll() {
        return this.todos;
    }

    static getNextId() {
        return TodoService.lastId += 1;
    }
}


abstract class TodoStateChanger {

    constructor(protected newState: TodoState) {
    }

    abstract canChangeState(todo: Todo): boolean;

    changeState(todo: Todo): Todo {
        if (this.canChangeState(todo)) {
            todo.state = this.newState;
        }

        return todo;
    }

}

class CompleteTodoStateChanger extends TodoStateChanger {

    constructor() {
        super(TodoState.Complete);
    }

    canChangeState(todo: Todo): boolean {
        return !!todo && (
            todo.state == TodoState.Active
            || todo.state == TodoState.Deleted
        )
    }

}

class SmartTodo {
    constructor(public name: string) {
    }
}

// Implementing interfaces
class TodoService implements ITodoServer {
}

// Using generics

function clone<T>(value: T): T {
    let serialized = JSON.stringify(value);
    return JSON.parse(serialized);
}

class KeyValuePair<TKey, TValue> {
    
    constructor(
        public key: TKey,
        public value: TValue
    ) {
    }
    
}

let pair1 = new KeyValuePair<number, string>(1, 'First');
let pair2 = new KeyValuePair<string, Date>('Second', new Date(Date.now()));
let pair3 = new KeyValuePair<number, string>(3, 'Third');
```

**Debugging**

- We open dev tools -> JS console
- We open dev tools -> Sources -> webpack/./src/app (with help of source maps we can debug in *.ts)
- We install Augury Google Chrome Extension
    - Shows Injector Graph, Router tree, Properties, Modules

**Component definition**

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent {
}
```

**Selectors**
- Tag selector `app-server`
- Attribute selector `[app-server]`
- Class selector `.app-server`

**Databinding**

Output data
- String Interpolation `{{ data }}`
- Example:  `{{ status }}`
- Property Binding `[property] = "data"` 
- Example:  `[src] = "response.data.img"`
- We can also bind to our custom properties so we can send data from one component to another one

React to User event (input)
- Event binding `(event) = "expression"`
- Example:  `(input) = "process($event)"`

Combination of Both
- Two way binding `[(ngModel)="data"]`
- Example:  `[(ngModel)="formData"]"`

**Directives**

Attribute directives:
- Look like a normal HTML attribute
- Only affect / change the element they are added to

Structural directives:
- Look like normal HTML Attribute but have a leading *
- Affect a whole area in the DOM (elements get added / removed)

Namely they are:
- ngModel
- ngIf;else
- ngStyle
- ngClass
- ngFor
- ngSwitch

**Component lifecycles**

- ngOnChanges = Called after a bound @Input property changes
- NgOnInit = Called once the component initialized. It runs after constructor
- ngDoCheck = Called during every change detection run
- ngAfterContentInit = Called after content (ng-content) has been projected into view
- ngAfterContentChecked = Called every time the projected content has been checked
- ngAfterViewInit = Called after the components view has been initialized
- ngAfterViewChecked = Called every time the view have been checked
- ngOnDestroy = Called once the compoenet is about to be destroyed

**Calling order, if we load our app**

ngOnChange - Called multiple times
ngOnInit - Called once
ngDoCheck - Called multiple times
ngAfterContentCheckek - Called multiple times
ngAfterViewInit - Called once
ngAfterViewChecked - Called multiple times
ngAfterContentInit - Called once
ngOnDestroy - Called once

**Angular Dependency injection**

It provides the same instance for all its childs, because of this is important where we define our Service:
- AppModule - same instance of Service is available application-wide
- AppComponent - Same instance of service is available for all Components (but not for other service)
- Any other component - Same instance of servie is available for the component and all its child components

**Angular Services**

- @Injectable() - if a service needs to inject another services, then we have to add this annotation.
- In services is always a good aproach to return the copy of the data via .slice() and later notify to other component with Observable

**Routes**

If we are going to deploy the app on the server, its important to configure the server a way where we always get back the index.html. If this is not possible we can use the hashtag technic.
```ts
RouterModule.forRoot(appRoutes, {useHash: true})
```

We have to following options for routes in Angular (it can be used in ts and html too):

- params
- queryParams
- fragments

HTML syntax sugar:
- `routerLinkActive="active"`
- `routerLink="/"`
- `[routerLink]="['/users']"`
- `[routerLinkActiveOptions]="{exact: true}"`

HTML tags:
- `<router-outlet></router-outlet>`

We are injecting following objects:
- route: ActivatedRoute
- router: Router

Examples:
```ts
ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
        this.server = this.serversService.getServer(+params['id'])!;
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
    });

    this.querySubscription = this.route.queryParams.subscribe(
        (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit']=== '1' ? true : false
        }
    )
}

// Using relative to query params and fragments
this.router.navigate(['/servers', id, 'edit'], {relativeTo: this.route, queryParams: {allowEdit: 1}, fragment: 'loading'})

// With preserve the query params will be pass to the next route (options one preserve or merge)
this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});

// Using Deactivate Guards
export interface CanComponentDeacivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const CanDeactivateGuard: CanDeactivateFn<CanComponentDeacivate> = (component: CanComponentDeacivate, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return component.canDeactivate();
}

// Using Auth Guards
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    const router: Router = inject(Router);
    const userRole: String = inject(AuthService).getUserRole();

    const expectedRoles: String[] = ["USER"]
    const hasRole: boolean = expectedRoles.some((role) => userRole === role);
  
    return hasRole || router.navigate(['/']);
}

export const AuthGuardChild: CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
    return AuthGuard(route, state);
}

// Using Resolve Guard - for static data which just define it the router, see in the project
interface Server {
    id: number,
    name: string,
    status: string
}

export const ServerResolver: ResolveFn<Server> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server => {
    const serverService: ServersService = inject(ServersService);

    return serverService.getServer(+route.params['id'])
}

// Using pathMatch for empty strings
const appRoutes: Routes = [
  {path: '', redirectTo: '/users', pathMatch: 'full'}, // '' empty string is contained by every path, so we have to add pathMatch
  {path: 'users', component: UsersComponent, children: [{path: ':id/:name', component: UserComponent} ]}
]
```

**Observable**

- various Data Srouces - Events Http Request, Triggered in Code

Explenation:

- Observer - An Observer is an object that knows how to handle values, errors, or when the observable completes. It's basically your reaction to the data coming from the observable.
- Observable - An Observable is like a stream of data that can emit values over time. You can think of it like a Netflix subscription: it can keep sending you movies (data) as long as you’re subscribed.
- Subscription - A Subscription represents the connection between the observable and the observer. It lets you start and stop receiving data.
- Subject - A Subject is both an Observable and an Observer. It can emit data to its subscribers, and you can also push values into it.

**Observe**

You write the code which gets executed:
- handle data
- handle error
- Handle Completion

Async task (its like Promises)

**Angular 6 and RxJs6**

support old import syntax:
```
npm install --save rxjs-compat
```

**List of RxJs Operators**

https://rxjs.dev/guide/operators


**Using Angular Forms**

In angular the form is mapped to JSON object with metadata. There are special parameters which we have to set. 


We have two approaches:
- Template driven - Angular infers the Form Object from the DOM
- Reactive - form is created programatically and synchroznied with the DOM

**NgForm Explained**

- The values are stored: ngForm.form.value
- The form was changed after submit - ngForm.dirty
- The form was disabled - ngForm.disabled
- The form is valid based on the validators - ngForm.invalid
- The form was already at least once touched - ngForm.touched

**Pipes**

Used for transforming strings in the html template. Build in pipes are:
- uppercase
- date
- async

The pipes are applied from right to left
string <- date <- uppercase

https://angular.dev/guide/templates/pipes

**Creating custom pipes**

```ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name:'shorten', pure: false}) // pure means that our pipe reruns on data change - can be performance issue
export class ShortenPipe implements PipeTransform {
    transform(value: any, ...args: any[]) {
        if (value.length > args) {
            return value.substr(0, args).concat("...");
        }
        return value;
    }
}
```

**Creating HTTP request**

- As angular is SPA framework. We have to somehow communication with a backend for that we use HttpClientModule its like Axios.

```ts
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class ServerService {
    constructor(private http: HttpClient) { }

    getUserAgent(): Observable<string> {
        return this.http.get<{ ip: string; userAgent: string }>('https://dummyjson.com/ip').pipe(
            map((data) => {
                return data.userAgent;
            }),
            catchError((error) => {
                console.error('Error fetching IP:', error);
                return throwError(() => new Error('Failed to fetch IP data.'));
            })
        );
    }

    // With this config we are able to get back not only the reponse body byt status code headers and so on
    storeServersAsText(servers: any[]) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' })
        return this.http.post('https://dummyjson.com/test', servers, { 'observe': 'response', 'responseType': 'text' });
    }
}
```

**Authentication**

How does Authentication work?
- Send Auth information -> We dont use sessions here
- We use instead of session a so called JWT
- This JWT is send via every request to our backend

**Using Modules**

A Module consistence of:
- Component
- Component
- Directive

Do we need all the component every time? Or we can separate them? As Example we will use a Book Author example.

```ts
 @NgModule({
  declarations: [                               // Whichs Components, Pipes and Directives are used by a module
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
  imports: [                                  // What other modules use this modul
    BrowserModule,                            // We import here everthing what this module exports for us
    FormsModule,
    AppRoutingModule 
  ],
  exports: [],                               // We import here everthing what this module exports for us
  providers: [ServersService, AuthService],  // Which Services we use in our module
  bootstrap: [AppComponent]                 // What is our root component
})
export class AppModule { }
```

**Example for modules**

app.routing.module.ts
```ts
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // defining as a lazdy module, it will be loaded only if visit the route
  { path: 'author', loadChildren: './authors/author.module#AuthorsModule' }
];

@NgModule({ //Preload lazy moduless
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
```

```ts
 @NgModule({
  declarations: [                              
    AppComponent
  ],
  imports: [                                  
    BrowserModule,                            
    HttpClientModule,
    AppRoutingModule,
    BooksModule,
    SharedModule,
    AuthModule,
    CoreModule
  ],
  // Never use services in a lazy module !!! Use it in the App or Eager Module !!!
  providers: [], 
  bootstrap: [AppComponent]                
})
export class AppModule { }
```

authors.routing.module.ts
```ts
const authorsRoutes: Routes = [
    // we defined here as '', because we already have it defined as lazy 'author'
	{ path: '', component: AuthorComponent, children: [
    	{ path: '', component: AuthorsStartComponent },
    	{ path: 'new', component: AuthorsEditComponent, canActivate: [AuthGuard] },
    	{ path: ':id', component: AuthorsDetailComponent },
    	{ path: ':id/edit', component: AuthorsEditComponent, canActivate: [AuthGuard] },
  ] },
]

@NgModule({
	imports; [
        // here we call forChild and not forRoot
		RouterModule.forChild(authorsRoutes) 
	],
	exports: [RouterModule]
})
export class AuthorsRoutingModule {
}
```

authors.module.ts
```ts
 @NgModule({
  declarations: [                             
    AuthorsComponent,
    AuthorsStartComponent,
    AuthorsListComponent,
    AuthorsEditComponent,
    AuthorsDetailComponent,
    AuthorsItemComponent
  ],
  imports: [           
    CommonModule,                      
    ReactiveFormsModule,
    AuthorsRoutingModule,
    SharedModule
  ]        
})
export class AuthorsModule { }
```

books.routing.module.ts
```ts
const booksRoutes: Routes = [
	{ path: 'list-of-books', component: AuthorComponent}
  ] },
]

@NgModule({
	imports; [
        // here we call forChild and not forRoot
		RouterModule.forChild(booksRoutes) 
	],
	exports: [RouterModule]
})
export class BooksRoutingModule {
}
```

books.module.ts
```ts
 @NgModule({
  declarations: [                             
    ListOfBookComponent,
    BookEditComponent
  ],
  imports: [           
    CommonModule,                      
    FormsModule,
    BooksRoutingModule
  ]        
})
export class BooksModule { }
```

auth.routing.module.ts
```ts
const authRoutes: Routes = [
	{path: 'signup', component: SignupComponent},
    {path: 'signin', component: SigninComponent}
];

@NgModule({
	imports; [
        // here we call forChild and not forRoot
		RouterModule.forChild(authRoutes) 
	],
	exports: [RouterModule]
})
export class AuthRoutingModule {
}
```

auth.module.ts
```ts
 @NgModule({
  declarations: [                             
    SignupComponent,
    SigninComponent
  ],
  imports: [           
    CommonModule,                      
    FormsModule,
    AuthRoutingModule
  ]        
})
export class AuthModule { }
```

shared.module.ts
```ts
 @NgModule({
  declarations: [                             
    DropDownDirective
  ],
  exports: [
    CommonModule,           
    DropDownDirective
  ]        
})
export class SharedModule { }
```

core.module.ts
```ts
 @NgModule({
  declarations: [                             
    HomeComponent,
    HeaderComponent
  ],
  imports: [           
    SharedModule,
    AppRoutingModule // We use it in the header component -> the routing defnitions
  ],
  exports: [
    AppRoutingModule, 
    HeaderComponent
  ],
  providers: [
    AuthorsService,
    DataStorageService,
    AuthService,
    AuthGuard
  ]        
})
export class CoreModule { }
```


**Deploying an Angular app**

- First we have to build our app for production
- Set the correct <base> element
    - For exmaple.com/my-app you should have <base href="/my-app">
- Make sure your servesr always returns index.html


AOT is a feature of Angular where the Angular HTML templates and TypeScript code are compiled into efficient JavaScript code during the build process, before the browser downloads and runs the code. (--aot)

```sh
ng build --prod --aot
```


**Angular Universal - Server side rendering**

With Angular universal we are able to generate a real HTML so our SPA is compatible also with SSO like Google. This procedure will use expressJS for rendering our Angular APP.
https://angular.dev/guide/ssr

**Angular Animations**

```sh
npm install @angular/platform-browser
```

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**State management - Redux - ngrx**

What is Application state - (List when application refreshed) - Every data what we have in our services like data from backend, authentication etc ...

Components -> Services -> Actions > Reducers -> Store (Application state)

```sh
# With Angular 16 and lower
npm install @ngrx/store@latest --legacy-peer-deps
# With Angular 17
ng add @ngrx/store
```

When we set the `initialState`its the whole application state not just our data from backend. We can split them up in multiple reducers but then we have to bundle it together to one appState in the appModule.
```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

```ts
export interface AppState {
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
```

In NgRx, Effects are used to handle side effects—operations that are not directly related to state management, such as HTTP requests, navigation, logging, or interacting with external APIs. Effects allow you to interact with the outside world (like fetching data from a server) and then dispatch actions to update the store with the results.

What switchMap Does?
- When you're working with streams (observables), switchMap:
- Receives a value from the source observable.
- Maps that value to a new inner observable (like an HTTP call).
- Subscribes to the new inner observable.
- If a new value comes in before the previous inner observable completes, it cancels the previous one and switches to the new one.

```sh
# With Angular 16 and lower
npm install @ngrx/effects@latest --legacy-peer-deps
# With Angular 17
ng add @ngrx/effects
```
Example:
```ts
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { userReducer } from './reducers';
import { UserEffects } from './user.effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    StoreModule.forRoot({ users: userReducer }),
    EffectsModule.forRoot([UserEffects]), // Register the effects
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from './user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: any }>()
);

// user.effects.ts
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from './user.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from './actions';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService // Service to make API call
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers), // Listen for the loadUsers action
      switchMap(() => {
        // Perform the HTTP call when the action is triggered
        return this.userService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })), // Dispatch success action with users
          catchError((error) => [loadUsersFailure({ error })]) // Dispatch failure action in case of error
        );
      })
    )
  );
}

// user.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadUsers } from './actions';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store<{ users: User[] }>) {
    this.users$ = this.store.select('users');
  }

  ngOnInit() {
    this.store.dispatch(loadUsers()); // Dispatch the action to load users
  }
}
```

In our case:
```ts
@Injectable()
export class AuthEffects {
  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      return [
        {
          type: AuthActions.SIGNUP
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map((action: AuthActions.TrySignup) => {
      return action.payload;
    })
    .switchMap((authData: {username: string, password: string}) => {
      return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    })
    .switchMap(() => {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    })
    .mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {
          type: AuthActions.SIGNIN
        },
        {
          type: AuthActions.SET_TOKEN,
          payload: token
        }
      ];
    });

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(() => {
      this.router.navigate(['/']);
    });

  constructor(private actions$: Actions, private router: Router) {
  }
}
```

With help of ngrx we can also catch every route change. We also have to install Redux devtools

```sh
# With Angular 16 and lower
npm install @ngrx/router-store@latest --legacy-peer-deps
npm install @ngrx/store-devtools@latest --legacy-peer-deps
# With Angular 17
ng add @ngrx/router-store
ng add @ngrx/store-devtools
```

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule,
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

What about state in lazy modules? For that we have to use the keyword `forFeature`

```ts
 @NgModule({
  declarations: [                             
    ListOfBookComponent,
    BookEditComponent
  ],
  imports: [           
    CommonModule,                      
    FormsModule,
    BooksRoutingModule,
    StoreModule.forFeature('book', bookReducer)
  ]        
})
export class BooksModule { }
``` 


**Making our Angular app to a PWA**

```sh
ng add @angular/pwa
```

**Unit Tests**

Start the test
```sh
ng test
```