import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { ScriptService } from 'ngx-script-loader';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { combineLatest , of } from 'rxjs/index';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ScriptLoadGuardService implements CanLoad, CanActivate {
  constructor(private scriptService: ScriptService) {}

  canLoad(route: Route): Observable<boolean> {
    const scripts = route.data['scripts'] as Array<string>;

    return this.loadScripts(scripts);


  }

  private loadScripts(scripts: Array<string>) {

    const loaders: Array<Observable<Event>> = [];

    scripts.forEach(script => {
      loaders.push(this.scriptService.loadScript(script));
    });

    const loadStream = combineLatest(...loaders) as Observable<Event[]>;
    return loadStream.pipe(map(() => {
      return true;
    }), catchError(err => {
      const scriptsString = scripts.join(',');
      throw new Error('failed to load: '+ scriptsString);
    }));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const scripts = route.data['scripts'] as Array<string>;
    return this.loadScripts(scripts);
  }
}
