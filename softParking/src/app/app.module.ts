import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//http
import { HttpModule } from '@angular/http';

//Firebase
import { AngularFireAuthModule } from "angularfire2/auth";
import { FIREBASE_CONFIG } from "./app.firebase";
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FireDatabaseProvider } from '../providers/fire-database/fire-database';


import { AlertProvider } from '../providers/alert/alert';
import { FireStorageProvider } from '../providers/fire-storage/fire-storage';
import { FireAuthProvider } from '../providers/fire-auth/fire-auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FactoryMethodHttpProvider } from '../providers/factory-method-http/factory-method-http';
import { ReportProvider } from '../providers/report/report';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,

    HttpModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FireDatabaseProvider,
    AlertProvider,
    FireStorageProvider,
    FireAuthProvider,
    FactoryMethodHttpProvider,
    ReportProvider
  ]
})
export class AppModule {}
