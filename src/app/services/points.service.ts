import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, Timestamp } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { UserRecord } from './models/firebase.model';
import { doc, getDocs } from 'firebase/firestore';




@Injectable({
    providedIn: 'root',
})
export class PointsService {

    private collectionPath = 'users';

    constructor(private firestore: Firestore) { }

    async getUsersOnce(): Promise<UserRecord[]> {
        const pointsCollection = collection(this.firestore, this.collectionPath);
        const snapshot = await getDocs(pointsCollection);

        return snapshot.docs.map(doc => {
            const data = doc.data() as UserRecord;
            return { id: doc.id, ...data };
        });
    }

    getPoints() {

    }

}  