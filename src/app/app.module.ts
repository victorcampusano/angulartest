import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';


import { AppComponent } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyBmZHTZcoQpufgvbGuMVRMY8sAyqBq7kuU",
  authDomain: "ng-notastuto.firebaseapp.com",
  databaseURL: "https://ng-notastuto.firebaseio.com",
  storageBucket: "ng-notastuto.appspot.com",
  messagingSenderId: "1033096012674"
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    ,FormsModule
    ,[AngularFireModule.initializeApp(firebaseConfig)]
    ,AngularFireDatabaseModule
    ,AngularFireAuthModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
