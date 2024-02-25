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

    ng server

Create componenet (or we do it manually)

    ng generate component component-name

From Angular v17 onwards, Standalone is now the new default for the CLI. So when you create a new project, you won't have any modules in it if you don't specify anything. However, it is still possible to create a module-based app by using the --no-standalone flag : **ng new --no-standalone**

Adding bootstrap to Angular project

    npm install --save bootstrap
    angular.json -> "node_modules/bootstrap/dist/css/bootstrap.min.css"

**The basics**

- The server at the end servs our `index.html` and `app.js`
- `AppComponenet.ts` - it holds  the app-root selector. Which is our root
- main.ts - itt start our `AppModule`
- This is the root module which again usses the `AppComponenet.ts` 

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

- ngModel
- ngIf;else
- ngStyle
- ngClass
- ngFor