import { NgModule } from '@angular/core';
import { ScriptLoadGuardService } from './script-load-guard.service';
import { ScriptLoaderModule } from 'ngx-script-loader';
@NgModule({
  imports: [
    ScriptLoaderModule.forRoot()
  ],
  providers:[ScriptLoadGuardService]
})
export class ScriptLoadGuardModule { }
