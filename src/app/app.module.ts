import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterStateSerializer } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { AppRoutingModule, CustomRouterStateSerializer } from './routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomRouterStateSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
