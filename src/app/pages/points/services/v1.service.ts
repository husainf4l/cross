import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { v1Transactions, v1UserRecord, wallet } from './models/pointsv1.model';


@Injectable({
    providedIn: 'root'
})
export class V1Service {
    private apiUrl = `${environment.apiUrl}/points-v1`;


    constructor(private http: HttpClient) { }


    getUsers(): Observable<v1UserRecord[]> {
        return this.http.get<v1UserRecord[]>(`${this.apiUrl}/users`);
    }

    getUserById(UserUid: string): Observable<v1UserRecord> {
        return this.http.get<v1UserRecord>(`${this.apiUrl}/users/${UserUid}`);
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
        currentPoints: number
    }): Observable<any> {
        return this.http.post(`${this.apiUrl}/redeem/add`, transactionData);
    }

    updateUserBracket(data: { UserUid: string; bracket: number }): Observable<any> {
        return this.http.put(`${this.apiUrl}/update-bracket`, data);
    }


    getTransactions(limit: number, toggle: boolean): Observable<v1Transactions[]> {
        let params = new HttpParams();
        if (limit) {
            params = params.set('limit', limit.toString());
        }
        params = params.set('toggle', toggle.toString());
        return this.http.get<v1Transactions[]>(`${this.apiUrl}/user-transactions/all`, { params });
    }

    getTransactionById(id: string, UserUid: string) {
        return this.http.get<v1Transactions>(
            `${this.apiUrl}/transactions/${id}?useruid=${UserUid}`
        );
    }

    getUserWallet(UserUid: string) {
        return this.http.get<wallet[]>(
            `${this.apiUrl}/wallet/${UserUid}`
        );
    }



    getUserTransactions(UserUid: string): Observable<v1Transactions[]> {
        return this.http.get<v1Transactions[]>(`${this.apiUrl}/user-transactions/${UserUid}`);
    }

    //edit transaction 
    updateTransactionPoints(transactionId: string, updatedTransaction: v1Transactions) {
        return this.http.put(`${environment.apiUrl}/transactions/${transactionId}`, updatedTransaction);
    }



    //cominications
    sendNotification(token: string, title: string, message: string): Observable<any> {
        const body = { token, title, message };
        return this.http.post(`${this.apiUrl}/send-notification`, body);
    }

    updateUserPoints(
        transactionId: string,
        data: { margoSales: number; papayaSales: number; lavaSales: number; bracket: number; currentPoints: number; invRef: string, UserUid: string, userName: string, posName: string, }
    ): Observable<any> {
        const url = `${this.apiUrl}/transactions/${transactionId}`;
        return this.http.put(url, data);
    }


}
