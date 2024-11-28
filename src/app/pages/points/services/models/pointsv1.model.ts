export interface v1UserRecord {
    UserUid: string;
    UserName: string;
    posName: string;
    lastSeen?: Date;
    lastseen?: Date;
    points: number;
    phoneNumber: string
    createdOn: Date;
    bracket?: number

}


export interface v1Transactions {
    id: string;
    UserName: string;
    createdOn: Date;
    doneBy: Date;
    title: string;
    isChecked: boolean;
    adsUrl: string;
    subTitle: string


}