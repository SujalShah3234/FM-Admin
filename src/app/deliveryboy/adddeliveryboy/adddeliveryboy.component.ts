import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryboydataService } from '../deliveryboydata.service';
import { deliveryboy } from '../deliveryboy';
import { NotificationService } from 'src/app/notification.service';
@Component({
  selector: 'app-adddeliveryboy',
  templateUrl: './adddeliveryboy.component.html',
  styleUrls: ['./adddeliveryboy.component.css']
})
export class AdddeliveryboyComponent implements OnInit {

  constructor(
    private notificationService: NotificationService, 
    private _deliveryboydata: DeliveryboydataService, 
    private _router: Router
  ) { }

  arrDeliveryboy: deliveryboy[] = [];
  selectedFile: File = null;
  value = '';

  ngOnInit() { }

  onDeliveryboyAdd(f) {
    let fd = new FormData();
    fd.append('deliveryboy_id', f.value.deliveryboy_id);
    fd.append('deliveryboy_name', f.value.deliveryboy_name);
    fd.append('deliveryboy_address', f.value.deliveryboy_address);
    fd.append('deliveryboy_mobileno', f.value.deliveryboy_mobileno);
    fd.append('deliveryboy_email', f.value.deliveryboy_email);
    fd.append('password', f.value.password);
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this._deliveryboydata.addDeliveryboy(fd).subscribe((data: any[]) => {
      this._router.navigate(['/nav/deliveryboy']);
      this.notificationService.success('Record added successfully !');
    });
  }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
  }
}