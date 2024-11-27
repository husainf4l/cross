export interface v2UserRecord {
    UserUid: string;
    UserName: string;
    posName: string;
    lastSeen: Date;
    points: number;
    phoneNumber: string
    createdOn: Date;
    fCMToken: string
    bracket?: number

}


export interface v2Transactions {
    balance: number;
    walletNumber?: string;
    walletType?: string;
    id: string;
    UserUid: string;
    UserName: string;
    PosName: string;
    notes: string;
    points: number;
    status: string;
    createdOn: Date;
    checkedOn: Date;
    type: number;
    isChecked: boolean;
    image: string;


}