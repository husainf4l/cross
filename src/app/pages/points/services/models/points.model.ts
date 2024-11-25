export interface v2UserRecord {
    UserUid: string;
    UserName: string;
    posName: string;
    lastSeen: Date;
    points: number;
    phoneNumber: string
    createdOn: Date;
    fCMToken: string

}


export interface v2Transactions {
    id: string;
    UserUid: string;
    UserName: string;
    posName: string;
    notes: string;
    points: number;
    status: string;
    createdOn: Date;
    checkedOn: Date;
    type: number;
    isChecked: boolean;


}