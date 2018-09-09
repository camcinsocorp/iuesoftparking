import { Injectable } from '@angular/core';
import { ToastController , LoadingController } from 'ionic-angular';

  @Injectable()
  export class AlertProvider {
    public loading:any;
    constructor(private toasCtrl: ToastController,private loadingCtrl: LoadingController) {
      
    }
    viewMessageToastController(message:string){
      this.toasCtrl.create({
        message: message, duration: 5000
      }).present();
    }

    viewMessageToastControllerSuccess(message:string){
      this.toasCtrl.create({
        message: message, duration: 5000,
        cssClass:"success"
      }).present();
    }

    viewMessageToastControllerError(message:string){
      this.toasCtrl.create({
        message: message, duration: 5000,
        cssClass:"error"
      }).present();        

    }
  }
