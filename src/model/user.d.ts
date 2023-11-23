export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?:string;//问号代表是否可选  个人简介
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    plantCode: string;
    createTime: Date;
    tags:string[];
}