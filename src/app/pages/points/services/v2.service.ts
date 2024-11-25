import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { v2Transactions, v2UserRecord } from './models/points.model';
import { environment } from '../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class V2Service {
    private apiUrl = `${environment.apiUrl}/points-v2`;


    constructor(private http: HttpClient) { }


    getUsers(): Observable<v2UserRecord[]> {
        return this.http.get<v2UserRecord[]>(`${this.apiUrl}/users`);
    }

    getUserById(UserUid: string): Observable<v2UserRecord> {
        return this.http.get<v2UserRecord>(`${this.apiUrl}/users/${UserUid}`);
    }

    getUserTransactions(UserUid: string): Observable<v2Transactions[]> {
        return this.http.get<v2Transactions[]>(`${this.apiUrl}/user-transactions/${UserUid}`);
    }

    sendNotification(token: string, title: string, message: string): Observable<any> {
        const body = { token, title, message };
        return this.http.post(`${this.apiUrl}/send-notification`, body);
    }


}
