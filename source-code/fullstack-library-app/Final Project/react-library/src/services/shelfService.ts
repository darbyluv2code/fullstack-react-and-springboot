import type { ShelfCurrentLoansModel } from "../models/ShelfCurrentLoansModel";
import type { ShelfHistoryModel } from "../models/ShelfHistoryModel";
import { fetchWithAuth } from "./fetchWithAuth";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const shelfService = {

    async getCurrentLoans(page: number = 0, size: number = 5) {
        const url = `${BASE_URL}/shelf/loans?page=${page}&size=${size}`;
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error("Failed to fetch current loans");
        }

        const data = await response.json();

        const loans: ShelfCurrentLoansModel[] = data.content.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                author: item.author,
                description: item.description,
                img: item.img,
                checkoutDate: item.checkoutDate,
                returnDate: item.returnDate,
                daysLeft: item.daysLeft
            };
        });

        return {
            content: loans,
            page: {
                totalElements: data.page?.totalElements,
                totalPages: data.page?.totalPages,
                size: data.page?.size,
                number: data.page?.size,
            }
        };
    },

    async getHistory(page: number = 0, size: number = 5) {
        const url = `${BASE_URL}/shelf/history?page=${page}&size=${size}`;
        const response = await fetchWithAuth(url);

        if (!response.ok) {
            throw new Error("Failed to fetch loan history");
        }

        const data = await response.json();

        const history: ShelfHistoryModel[] = data.content.map((item: any) => {
            return {
                id: item.id,
                userEmail: item.userEmail,
                checkoutDate: item.checkoutDate,
                returnedDate: item.returnedDate,
                title: item.title,
                author: item.author,
                description: item.description,
                img: item.img
            };
        });

        return {
            content: history,
            page: {
                totalElements: data.page?.totalElements,
                totalPages: data.page?.totalPages,
                size: data.page?.size,
                number: data.page?.size,
            }
        };
    },

    async returnBook(bookId: number) {
        const url = `${BASE_URL}/shelf/return/${bookId}`;
        const response = await fetchWithAuth(url, {
            method: "PUT",
        });

        if (!response.ok) {
            throw new Error("Failed to return book");
        }

        return await response.json();
    }

}














