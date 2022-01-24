import { RouterTestingModule } from '@angular/router/testing';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from '@angular/fire/firestore'
import { firstValueFrom } from 'rxjs';
import { Room } from '../models/room';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(
    private db: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  public user?: User;

  async signIn() {

    const resp = await this.auth.signInAnonymously();

    if (resp.additionalUserInfo?.isNewUser) {
      const newUser = {
        id: resp.user?.uid,
        name: '',
        imgUrl: 'assets/avatars/hipo.png',
        createdAt: firebase.Timestamp.now(),
        lastVisit: firebase.Timestamp.now()
      };
      this.user = newUser;
      await this.db.collection<User>('users').doc(resp.user?.uid).set(newUser)
    }
    else {
      this.db.collection('users').doc(resp.user?.uid).update({ lastVisit: firebase.Timestamp.now() });
      var doc = await firstValueFrom(this.db.collection<User>('users').doc(resp.user?.uid).get())

      this.user = { ...doc.data(), id: doc.id } as User
    }
  }

  updateMe(user: any) {
    this.db.collection('users').doc(this.user?.id).update(user);
  }

  listenRoom(roomId: string) {
    return this.db.collection<Room>('rooms').doc(roomId).valueChanges();
  }

  createRoom(roomId: string) {

    if (!this.user) return;

    this.db.collection<Room>('rooms').doc(roomId).set({
      id: roomId,
      name: roomId,
      users: [
        {
          hash: this.getMyHash(),
          name: this.user.name,
          imgUrl: this.user.imgUrl,
          score: 0,
          inactive: false,
          lastMoveAt: firebase.Timestamp.now()
        }
      ],
      definitions: [],
      messages: [],
      word: '',
      step: 0,
      stepEndAt: null,
      maxRounds: 3,
      round: 0,
      maxTimeStep1: 40,
      maxTimeStep2: 40,
      maxTimeStep3: 10,
      createdAt: firebase.Timestamp.now()
    });

  }

  getMyHash() {
    var md5 = new Md5();
    return md5.appendStr(this.user?.id || '').end();
  }


}
