import { Component, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";
import { DashboarddataService } from "./dashboarddata.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  constructor(public _data: DashboarddataService) {}

  public order_data: any[];
  public bill_data: any[];
  public bill_data_display: any[] = [];
  public bill_data_name_display: any[] = [];

  public order_date: any[] = [];
  public order_amount: any[] = [];

  public paypalAmount: number=5;
  public Cash_On_Dlivery_Amount: number=10;
  public card_Amount: number=2;

  public revenue: any[]=[];

  public total_order: any [] = [];

  public customers: any [] = [];

  public delivery_partners: any [] = [];

  public type_data: any[] = [];
  public type: any [] = [];
  public count: any [] = [];

  ngOnInit() {

    this._data.getRevenue().subscribe((data2: any[]) => {
      this.revenue = data2[0].revenue;
    });

    this._data.getTotalOrder().subscribe((data3: any[]) => {
      this.total_order = data3[0].total_order;
    });

    this._data.getCustomer().subscribe((data4: any[]) => {
      this.customers = data4[0].customers;
    });

    this._data.getDeliveryPartner().subscribe((data5: any[]) => {
      this.delivery_partners = data5[0].delivery_partners;
    });

    this._data.getAllorder().subscribe((data1: any[]) => {
      this.order_data = data1;
      for (let i = 0; i < data1.length; i++) {
        this.order_date.push(this.order_data[i].order_date);
        this.order_amount.push(this.order_data[i].order_amount);
      }
      console.log(this.order_data);
    });

    this._data.getTopOrder().subscribe((data1: any[]) => {
      this.bill_data = data1;
      for (let i = 0; i < data1.length; i++) {
        this.bill_data_display.push(this.bill_data[i].pro_price);
        this.bill_data_name_display.push(this.bill_data[i].pro_name);
      }
      console.log(this.bill_data_display);
    });

    this._data.getInvoiceByMode("card").subscribe((data: any[]) => {
      this.type_data = data;
      for (let i = 0; i < data.length; i++) {
        this.type.push(this.type_data[i].Payment_Type);
        this.count.push(this.type_data[i].total);
      }
      console.log(this.type);
      console.log(this.count);
    });

    this._data.getInvoiceByMode("cod").subscribe((data: any[]) => {
      this.type_data = data;
      for (let i = 0; i < data.length; i++) {
        this.type.push(this.type_data[i].Payment_Type);
        this.count.push(this.type_data[i].total);
      }
      console.log(this.type);
      console.log(this.count);
    });

    this._data.getInvoiceByMode("paypal").subscribe((data: any[]) => {
      this.type_data = data;
      for (let i = 0; i < data.length; i++) {
        this.type.push(this.type_data[i].Payment_Type);
        this.count.push(this.type_data[i].total);
      }
      console.log(this.type);
      console.log(this.count);
    });
    // this._data.getInvoiceByMode("cod").subscribe((data: any) => {
    //   console.log("COD="+data.value);
    //   console.log(data[0].total);
    //   if (data[0].total) {
    //     this.Cash_On_Dlivery_Amount = data[0].total;
    //   } else {
    //     this.Cash_On_Dlivery_Amount = 0;
    //   }
    //   console.log("COD amt"+this.Cash_On_Dlivery_Amount);
    // });

    // this._data.getInvoiceByMode("paypal").subscribe((data: any) => {
    //   console.log("Paypal="+data.value);
    //   console.log(data[0].total);
    //   if (data[0].total) {
    //     this.paypalAmount = data[0].total;
    //   } else {
    //     this.paypalAmount = 0;
    //   }
    //   console.log("paypal amt"+this.paypalAmount);
    // });

    // this._data.getInvoiceByMode("card").subscribe((data: any) => {
    //   console.log("Card="+data.value);
    //   console.log(data[0].total);
    //   if (data[0].total) {
    //     this.card_Amount = data[0].total;
    //   } else {
    //     this.card_Amount = 0;
    //   }
    //   console.log("Card amt"+this.card_Amount);
    // });
  }

  public pieData: any[] = [
    { category: "cod", value: this.Cash_On_Dlivery_Amount },
    { category: "paypal", value: this.paypalAmount },
    { category: "card", value: this.card_Amount },
  ];

  public series: any[] = [
    {
      name: "Medicines",
      data: [200, 500, 750, 300, 200, 100, 50, 80, 86, 80, 124, 321],
    },
  ];
  public categories: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
}
