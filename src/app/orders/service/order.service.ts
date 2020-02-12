import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private static readonly CURRENT_ORDERS = '/current-orders';
    private static readonly PENDING_ORDERS = '/pending-orders';
    private baseURL: string;

    constructor(private http: HttpClient) {
        this.setURL();
    }

    getCurrentOrders(): Observable<any> {
        const url = this.baseURL + OrderService.CURRENT_ORDERS;
        return this.http.get(url);
    }

    getPendingOrders(): Observable<any> {
        const url = this.baseURL + OrderService.PENDING_ORDERS;
        return this.http.get(url);
    }

    private setURL(): void {
        // This should be based on window.location.href or APP_BASE_HREF
        if (!this.baseURL) {
            // The json-server is running on 3000 e.g. json-server --watch db.json
            this.baseURL = 'http://localhost:3000';
        }
    }
}