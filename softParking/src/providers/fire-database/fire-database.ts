import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

import 'rxjs/add/operator/map';

//Firebase
import {AngularFireDatabase,AngularFireObject } from 'angularfire2/database';

@Injectable()
export class FireDatabaseProvider {

	constructor(
		public afDb: AngularFireDatabase,
		public loadingCtrl:LoadingController) {   
	}

	getInfo(callback){
		let loader = this.loadingCtrl.create({content: 'Espere Porfavor...'});
		loader.present();
		this.afDb.object('/Parqueadero/').valueChanges().subscribe( (data) => {
			callback(data);
			loader.dismiss();
		});
	}

	
}
