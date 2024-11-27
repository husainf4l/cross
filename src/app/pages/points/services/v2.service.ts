import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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


    getCompanyTransactionById(transactionId: string) {
        return this.http.get(`${this.apiUrl}/getcompanytransactionbyid/${transactionId}`)
    }


    addTransaction(transactionData: {
        UserUid: string;
        UserName: string;
        PosName: string;
        type: number;
        points: number;
        createdOn: Date
    }): Observable<any> {
        return this.http.post(`${this.apiUrl}/edit/add`, transactionData);
    }



    redeemAdd(transactionData: {
        transactionId: string,
        UserUid: string,
        points: number,
        fcmToken: string,
        currentPoints: number
    }): Observable<any> {
        return this.http.post(`${this.apiUrl}/redeem/add`, transactionData);
    }



    getTransactions(limit: number, toggle: boolean): Observable<v2Transactions[]> {
        let params = new HttpParams();
        if (limit) {
            params = params.set('limit', limit.toString());
        }
        params = params.set('toggle', toggle.toString());
        return this.http.get<v2Transactions[]>(`${this.apiUrl}/user-transactions/all`, { params });
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
