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

**The basics**

- The server at the end servs our `index.html` and `app.js`
- `AppComponenet.ts` - it holds  the app-root selector. Which is our root
- main.ts - it start our `AppModule`
- This is the root module which again uses the `AppComponenet.ts` 

**Debugging**

- We open dev tools -> JS console
- We open dev tools -> Sources -> webpack/./src/app
- We install Augury Google Chrome Extension

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
- Property Binding `[property] = "data"`

React to User event (input)
- Event binding `(event) = "expression"`

Combination of Both
- Two way binding `[(ngModel)="data"]`

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

**Angular Dependency injection**

It provides the same instance for all its childs, because of this is important where we define our Service:
- AppModule - same instance of Service is available application-wide
- AppComponent - Same instance of service is available for all Componeneet (but not for other service)
- Any other component - Same instance of servie is available for the component and all its child components