import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContenuComponent } from './templates/contenu/contenu.component';
import { NavigationComponent } from './templates/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    ContenuComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
