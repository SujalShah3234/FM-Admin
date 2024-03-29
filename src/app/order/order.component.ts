import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { order } from './order';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { OrderdataService } from './orderdata.service';
import { NotificationService } from '../notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private notificationService: NotificationService, private _data: OrderdataService, public router: Router, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }

  private unsubscribe = new Subject();
  cancleClicked: boolean = false;
  orderarr: order[] = [];
  expandedElement: ViewMore | null;
  displayedColumns: string[] = ['order_date', 'order_amount', 'order_status', 'action'];
  dataSource: MatTableDataSource<order>;
  selection = new SelectionModel<order>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  openDialog(order_id) {
    this.router.navigate(['/nav/ordermore', order_id]);
  }

  onDelete(item: order) {
    this._data.deleteOrder(item.order_id).pipe(takeUntil(this.unsubscribe)).subscribe(
      (data: any) => {
        this.orderarr.splice(this.orderarr.indexOf(item), 1);
        this.dataSource.data = this.orderarr;
      }
    );
    this.notificationService.warn('Selected record deleted !');
  }

  OnOrderEdit(item: order) {
    this.router.navigate(['/nav/editorder', item.order_id]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this._data.getAllOrder().pipe(takeUntil(this.unsubscribe)).subscribe(
      (data: order[]) => {
        this.orderarr = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

export interface ViewMore {
  u_email_id: string;
  order_date: Date;
  order_status: string;
  deliveryboy_id: number;
}