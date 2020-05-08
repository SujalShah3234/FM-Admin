import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboarddataService {

  url: string = 'http://localhost:3000/dashboardTrendingPro/';
  order_url: string = 'http://localhost:3000/ordersbyDate/';
  invoice_url: string = 'http://localhost:3000/invoicemode/'

  constructor(public _http: HttpClient) { }

  getTopOrder(){
    return this._http.get(this.url);
  }

  getAllorder(){
    return this._http.get(this.order_url);
  }

  getInvoiceByMode(PaymentMODE)
  {
    return this._http.get(this.invoice_url+PaymentMODE);
  }
}