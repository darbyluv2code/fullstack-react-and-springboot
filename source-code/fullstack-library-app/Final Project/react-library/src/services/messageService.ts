import type { MessageModel } from "../models/MessageModel";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface MessageResponse {
    content: MessageModel[];
    page: {
        totalElements: number;
        totalPages: number;
    };
}

interface AddMessageRequest {
    title: string;
    question: string;
}

interface AdminResponseRequest {
    id: number;
    response: string;
}

export const messageService = {
    async getUserMessage(
        pageNo: number,
        pageSize: number
    ): Promise<MessageResponse> {
        const response = await fetchWithAuth(
            `${BASE_URL}/messages?pageNo=${pageNo}&pageSize=${pageSize}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch your messages")
        }
        return response.json();
    },

    async addMessage(request: AddMessageRequest): Promise<MessageModel> {
        const response = await fetchWithAuth(
            `${BASE_URL}/messages`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to submit your messages")
        }
        return response.json();
    },

    async getOpenAdminMessages(
        pageNo: number,
        pageSize: number
    ): Promise<MessageResponse> {
        const response = await fetchWithAuth(
            `${BASE_URL}/messages/admin?pageNo=${pageNo}&pageSize=${pageSize}`
        );
        if (!response.ok) {
            throw new Error("Failed to fetch open questions");
        }
        return response.json();
    },

    async respondToMessage(
        request: AdminResponseRequest
    ): Promise<MessageModel> {
        const response = await fetchWithAuth(`${BASE_URL}/messages/admin`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error("Failed to submit response");
        }
        return response.json();
    }







};






