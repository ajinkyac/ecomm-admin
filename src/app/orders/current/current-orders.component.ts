import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeWhile } from 'rxjs/operators';

import { OrderService } from '../service/order.service';

@Component({
    selector: 'app-current-orders',
    templateUrl: './current-orders.component.html'
})
export class CurrentOrdersComponent implements OnInit, OnDestroy {
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
            editable: false,
            sortable: true,
            resizable: true,
            filter: true
        },
        pagination: true,
        paginationPageSize: 5
    };

    private keepSubscriptionAlive = true;

    constructor(private orderService: OrderService) { }

    ngOnInit(): void {
        this.orderService
            .getCurrentOrders()
            .pipe(takeWhile(() => this.keepSubscriptionAlive))
            .subscribe(currentOrders => {
                this.rowData = currentOrders;
            });
    }

    ngOnDestroy(): void {
        this.keepSubscriptionAlive = false;
    }
}