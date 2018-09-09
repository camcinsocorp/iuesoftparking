import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

//Firebase
import * as firebase from 'firebase';


@Injectable()
export class FireStorageProvider {

	firestore = firebase.storage();

	constructor(public loadingCtrl:LoadingController) {

	}

	getUrlStorage(urlFile,callback){
		let loader = this.loadingCtrl.create({content: 'Espere Porfavor...'});
		loader.present();
		return this.firestore.ref().child(urlFile).getDownloadURL().then((file) => { 
			callback(file);
			loader.dismiss();
		})
	} 
}
