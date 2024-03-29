import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DeliveryboydataService } from '../deliveryboydata.service';
import { deliveryboy } from '../deliveryboy';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';
import { environment } from 'src/environments/environment.prod';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-editdeliveryboy',
  templateUrl: './editdeliveryboy.component.html',
  styleUrls: ['./editdeliveryboy.component.css']
})
export class EditdeliveryboyComponent implements OnInit {
  constructor(private notificationService: NotificationService, private _act_route: ActivatedRoute, private _deliveryboydata: DeliveryboydataService, private _router: Router) { }
  private unsubscribe = new Subject();
  deliveryboy_id: number;
  deliveryPartner_update: FormGroup;
  selectedFile: File = null;
  image_url: string = null;
  img_text: string = 'Update Photo';

  ngOnInit() {
    this.deliveryboy_id = this._act_route.snapshot.params['deliveryboy_id'];
    this.deliveryPartner_update = new FormGroup({
      deliveryboy_name: new FormControl(null, [Validators.required]),
      deliveryboy_address: new FormControl(null, [Validators.required]),
      deliveryboy_mobileno: new FormControl(null, [Validators.required]),
      deliveryboy_email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      img: new FormControl(null, [Validators.required])
    });
    this._deliveryboydata.editDeliveryboy(this.deliveryboy_id).pipe(takeUntil(this.unsubscribe)).subscribe(
      (data: deliveryboy[]) => {
        this.formDataBind(data[0]);
      }
    );
  }

  formDataBind(item: deliveryboy) {
    this.image_url = environment.db + "images/deliveryboy_photos/" + item.img;
    this.deliveryPartner_update.patchValue({
      deliveryboy_name: item.deliveryboy_name,
      deliveryboy_address: item.deliveryboy_address,
      deliveryboy_mobileno: item.deliveryboy_mobileno,
      deliveryboy_email: item.deliveryboy_email,
      password: item.password,
    });
  }

  OnDeliveryPartnerEdit() {
    let fd = new FormData();
    if (this.selectedFile != null) {
      fd.append('image', this.selectedFile, this.selectedFile.name);
    }
    else {
      fd.append('image', this.deliveryPartner_update.get('img').value);
    }
    fd.append('deliveryboy_name', this.deliveryPartner_update.get('deliveryboy_name').value);
    fd.append('deliveryboy_address', this.deliveryPartner_update.get('deliveryboy_address').value);
    fd.append('deliveryboy_mobileno', this.deliveryPartner_update.get('deliveryboy_mobileno').value);
    fd.append('deliveryboy_email', this.deliveryPartner_update.get('deliveryboy_email').value);
    fd.append('password', this.deliveryPartner_update.get('password').value);
    this._deliveryboydata.updateDeliveryboy(this.deliveryboy_id, fd).pipe(takeUntil(this.unsubscribe)).subscribe(
      (data: deliveryboy) => {
        this._router.navigate(['/nav/deliveryboy']);
        this.notificationService.info('Your changes has been saved.');
      }
    );
  }

  onChange(f) {
    this.selectedFile = <File>f.target.files[0];
    this.img_text = this.selectedFile.name;
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
