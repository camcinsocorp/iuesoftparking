import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

//Firebase
import { AngularFireAuth } from "angularfire2/auth";

//serviceFireDatabase
import { FireDatabaseProvider, } from '../fire-database/fire-database';

// //factory
// import {FactoryMethodHttpProvider} from '../factory-method-http/factory-method-http'


@Injectable()
export class FireAuthProvider {
    private parentUser: firebase.User;
    private parentUserInfo: any;
    private childUserInfo:any;

    constructor(
        
        public afAuth: AngularFireAuth,
        public dbData:FireDatabaseProvider,
        
       ) {
    }


   loginUser(newEmail: string, newPassword: string):any {
        return this.afAuth.auth.signInWithEmailAndPassword(newEmail, newPassword);
    }

   logoutUser(){
        this.afAuth.auth.signOut();
    }

}
