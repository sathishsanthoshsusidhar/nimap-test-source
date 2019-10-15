import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog} from '@angular/material';
import {MatPaginator} from '@angular/material/paginator';
import { WebServiceService } from 'src/app/@service/web-service.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from 'src/app/@shared/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  public array: any;
  categoryDataSource: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  displayedColumns = ['id', 'Catergory', 'Edit', 'Delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(public dialog: MatDialog, private webservice: WebServiceService, private route: Router) { }

  ngOnInit() {
    this.pageSize = 5;
    this.RenderDataTable();
  }
  openDialog(did: any): any {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data:{ msg: 'Do you confirm the deletion of this data?', id: did},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory(did);
      }
    });
  }
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  RenderDataTable() {
    this.webservice.GetAllCategories()
      .subscribe(
      res => {
        console.log(res);
        this.categoryDataSource = new MatTableDataSource<Element>(res);
        this.categoryDataSource.paginator = this.paginator;
        this.array = res;
        this.totalSize = this.array.length;
      },
      error => {
        console.log('There was an error while retrieving Posts !!!' + error);
      });
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    // this.ProductDataSource = part;
    this.RenderDataTable();
  }

  editCategory(id: number) {
      this.route.navigate(['edit-category', id]);
  }

  deleteCategory(id: number) {
    this.webservice.deleteCategory(id).subscribe(res => {
      this.pageSize = 5;
      this.RenderDataTable();
    }
    );
  }
}
