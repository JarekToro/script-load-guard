# ScriptLoadGuard

##Install:
`npm install load-script-guard`

## Import:
````typescript
import { ScriptLoadGuardService } from 'script-load-guard';
````

## Example:
````javascript
 {
    path: 'print',
    canLoad: [ScriptLoadGuardService],
    data: {scripts:[ '/js/dep.min.js','/js/dep2.min.js']},
    loadChildren: '../modules/lazy/lazy.module#LazyModule'
  }
````
Or
````javascript
{ path: 'foo', component: BarComponent, canActivate:[ScriptLoadGuardService], data:{scripts:['/js/dep.min.js']}},
````