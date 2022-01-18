
import * as firebase from '@angular/fire/firestore'

export interface User {
    id?: string,
    name: string
    imgUrl: string
    createdAt: firebase.Timestamp,
    lastVisit: firebase.Timestamp
}
