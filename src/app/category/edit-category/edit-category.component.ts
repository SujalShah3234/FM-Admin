import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategorydataService } from '../categorydata.service';
import { category } from '../category';
import { NotificationService } from 'src/app/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  constructor(private notificationService: NotificationService, private _act_route: ActivatedRoute, private _categorydata: CategorydataService, private _router: Router) { }
  private unsubscribe = new Subject();
  c_id1: number;
  c_name1: string;

  ngOnInit() {
    this.c_id1 = this._act_route.snapshot.params["c_id"];
    this._categorydata.editCategory(this.c_id1).pipe(takeUntil(this.unsubscribe)).subscribe(
      (data: category) => {
        this.c_id1 = data[0].c_id;
        this.c_name1 = data[0].c_name;
      }
    );
  }

  OnCategoryEdit(f) {
    this._categorydata.updateCategory(this.c_id1,f.value).pipe(takeUntil(this.unsubscribe)).subscribe(
      (data: any) => {
        this._router.navigate(['/nav/category']);
        this.notificationService.info('Changes has been saved.');
      }
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
