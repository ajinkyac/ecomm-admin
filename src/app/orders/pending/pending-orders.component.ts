import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrderService } from '../service/order.service';

@Component({
    selector: 'app-pending-orders',
    templateUrl: './pending-orders.component.html'
})
export class PendingOrdersComponent implements OnInit, OnDestroy {
    public columnDefs = [
        { headerName: 'Order id', field: 'orderId', sortable: true, filter: true },
        { headerName: 'Product name', field: 'productName', sortable: true, filter: true },
        { headerName: 'Quantity', field: 'quantity', sortable: true, filter: true },
        { headerName: 'Amount', field: 'amount', sortable: true, filter: true },
        { headerName: 'Delivery address', field: 'deliveryAddress'},
        { headerName: 'Order date', field: 'orderDate', sortable: true, filter: true },
        { headerName: 'Delivery date', field: 'deliveryDate', sortable: true, filter: true },
        { headerName: 'Delivery agent', field: 'deliveryAgent' }
    ];
    public rowData = [];
    public gridOptions = {
        defaultColDef: {
            sortable:true,
            resizable: true,
            filter: true
        },
        pagination: true,
        paginationPageSize: 5
    };

    private keepSubscriptionAlive = true;

    constructor(private orderService: OrderService) {}

    ngOnInit(): void {
        this.orderService
            .getPendingOrders()
            .pipe(takeWhile(() => this.keepSubscriptionAlive))
            .subscribe(currentOrders => {
                this.rowData = currentOrders;
            });
    }

    ngOnDestroy(): void {
        this.keepSubscriptionAlive = false;
    }
}