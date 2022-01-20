
import * as firebase from '@angular/fire/firestore'

export interface Room {
    id?: string,
    name: string
    users: any[]
    definitions: any[]
    messages: any[]
    word: string
    step: number
    stepEndAt: firebase.Timestamp | null
    maxRounds: number
    round: number
    createdAt: firebase.Timestamp
    maxTimeStep1: number
    maxTimeStep2: number
}
