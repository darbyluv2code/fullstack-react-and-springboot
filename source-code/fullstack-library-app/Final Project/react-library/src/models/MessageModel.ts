export interface MessageModel {
    id: number;
    userEmail: string;
    title: string;
    question: string;
    adminEmail?: string;
    response?: string;
    closed: boolean;
}