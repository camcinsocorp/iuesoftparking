import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav,NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage:string = "HomePage";

  constructor(public platform: Platform, public statusBar: StatusBar,
   public splashScreen: SplashScreen
   
   ) {
     this.initializeApp();
  }

  initializeApp(){
     this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setAdminitradorPage(){
    this.nav.setRoot("LoginPage")
  }

  setHome(){
    this.nav.setRoot("HomePage") 
  }

}

