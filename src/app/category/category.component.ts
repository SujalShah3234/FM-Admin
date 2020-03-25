import { Component, OnInit , ViewChild} from '@angular/core';
import { category } from './category';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CategorydataService } from './categorydata.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryarr: category[] = [];
  displayedColumns: string[] = ['c_id','c_name', 'delete','edit'];
  dataSource: MatTableDataSource<category>;

  selection = new SelectionModel<category>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private _snackBar: MatSnackBar, private _data: CategorydataService, private router: Router) {
    this.dataSource = new MatTableDataSource();
  }

  applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OnCategoryEdit(item: category) {
    this.router.navigate(['/nav/editcategory',item.c_id]);
  }

  onDelete(item: category) {
    if( confirm( "Are You Sure You Want To Delete ?" )) {
      this._data.deleteCategory(item.c_id).subscribe(
        (data: any) => {
          console.log(data);
          this.categoryarr.splice(this.categoryarr.indexOf(item), 1);
          this.dataSource.data = this.categoryarr;
        }
      );
    }
  }

  ngOnInit() {
    this._data.getAllCategory().subscribe(
      (data: category[]) => {
        this.categoryarr = data;
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

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message , action, {
      duration: 5000,
      verticalPosition: 'bottom', // 'top' | 'bottom'
      horizontalPosition: 'center', //'start' | 'center' | 'end' | 'left' | 'right'
      panelClass: ['warning']
    });
  }
}
