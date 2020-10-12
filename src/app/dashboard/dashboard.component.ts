import { Component, ViewChild, ElementRef } from "@angular/core";
import { DashboarddataService } from "./dashboarddata.service";
import { IntlService } from '@progress/kendo-angular-intl';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
var now = new Date();
@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent {
  @ViewChild('resizedDiv') resizedDiv: ElementRef;

  constructor(public _data: DashboarddataService, private intl: IntlService) {
    this.labelContent1 = this.labelContent1.bind(this);
  }

  public order_data: any[] = [];
  public bill_data: any[] = [];
  public bill_data_display: any[] = [];
  public bill_data_name_display: any[] = [];

  public month: any[] = [];
  public order_amount: any[] = [];

  public paypalAmount: number = 0;
  public Cash_On_Dlivery_Amount: number = 0;
  public wallet_amount: number = 0;

  public revenue: number;
  public total_order: any[] = [];
  public customers: any[] = [];
  public delivery_partners: any[] = [];

  public type_data: any[] = [];
  public type: any[] = [];
  public count: any[] = [];

  public monthOrderCount: any[] = [];
  public orderData: any[] = [];
  public months: any[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  startyr: number = 2019;

  currentYear = now.getFullYear();
  selectedYear: number = this.currentYear;

  yearArray = [];

  public DonutData: any[] = [];
  public pieData: any[] = [];

  public donutData: any[] = [];

  public labelContent(e: any): string {
    return e.category;
  }

  ngOnInit() {
    this.onYearChange();
    this.getPayment_method();
    this.getStatus();
    this.get_small_widget_data();
    this.get_trending_product();
  }

  getStatus() {
    this._data.getStatus().subscribe((data3: any[]) => {
      this.DonutData = [];
      this.DonutData = data3;
      for (let i = 0; i < data3.length; i++) {
        this.pieData = [
          { category: 'Delivered', value: this.DonutData[i].Delivered },
          { category: 'Packing', value: this.DonutData[i].Packing },
          { category: 'On The Way', value: this.DonutData[i].On_The_Way },
        ];
      }
    });
  }

  get_trending_product() {
    this._data.getTopOrder().subscribe((data1: any[]) => {
      this.bill_data = [];
      this.bill_data = data1;
      for (let i = 0; i < data1.length; i++) {
        this.bill_data_display.push(this.bill_data[i].total);
        this.bill_data_name_display.push(this.bill_data[i].pro_name);
      }
    });
  }

  getPayment_method() {
    this._data.getInvoiceByMode("cod").subscribe((data: any) => {
      if (data[0].total) {
        this.Cash_On_Dlivery_Amount = data[0].total;
      } else {
        this.Cash_On_Dlivery_Amount = 0;
      }
    });

    this._data.getInvoiceByMode("wallet").subscribe((data: any) => {
      if (data[0].total) {
        this.wallet_amount = data[0].total;
      } else {
        this.wallet_amount = 0;
      }
    });

    this._data.getInvoiceByMode("paypal").subscribe((data: any) => {
      if (data[0].total) {
        this.paypalAmount = data[0].total;
      } else {
        this.paypalAmount = 0;
      }
      this.donutData = [{
        kind: 'Paypal', share: this.paypalAmount, color: '#035aa6'
      }, {
        kind: 'Cash', share: this.Cash_On_Dlivery_Amount, color: '#79d70f'
      }, {
        kind: 'Wallet', share: this.wallet_amount, color: '#f3c623'
      }];
    });
  }

  get_small_widget_data() {
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
  }

  public labelContent1(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.category} : ${this.intl.formatNumber(args.dataItem.value, '')}`;
  }

  onYearChange(): void {
    this._data.getAllorder(this.selectedYear).subscribe((data1: any[]) => {
      this.monthOrderCount = [];
      this.monthOrderCount = data1;
      for (let j = 0; j < data1.length; j++) {
        this.orderData.push(this.monthOrderCount[j].COUNT);
      }
    });
  }

  public donutlabelContent(e: any): string {
    return `${e.category}: \n ${e.value}%`;
  }
}