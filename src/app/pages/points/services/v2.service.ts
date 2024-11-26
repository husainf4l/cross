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


    cleanCache() {
        return this.http.get(`${this.apiUrl}/clean-cache`);
    }




    //transactions

    getTransactions(): Observable<v2Transactions[]> {
        return this.http.get<v2Transactions[]>(`${this.apiUrl}/user-transactions/all`);
    }


    getTransactionById(id: string) {
        return this.http.get<v2Transactions>(`${this.apiUrl}/transactions/${id}`);
    }


    getUserTransactions(UserUid: string): Observable<v2Transactions[]> {
        return this.http.get<v2Transactions[]>(`${this.apiUrl}/user-transactions/${UserUid}`);
    }

    //edit transaction 
    updateTransactionPoints(transactionId: string, updatedTransaction: v2Transactions) {
        return this.http.put(`${environment.apiUrl}/transactions/${transactionId}`, updatedTransaction);
    }



    //cominications
    sendNotification(token: string, title: string, message: string): Observable<any> {
        const body = { token, title, message };
        return this.http.post(`${this.apiUrl}/send-notification`, body);
    }

    updateUserPoints(
        transactionId: string,
        data: { margoSales: number; papayaSales: number; lavaSales: number; bracket: number; currentPoints: number; invRef: string, UserUid: string, userName: string, posName: string, fcmToken: string }
    ): Observable<any> {
        const url = `${this.apiUrl}/transactions/${transactionId}`;
        // Send the data object directly
        return this.http.put(url, data);
    }





}
