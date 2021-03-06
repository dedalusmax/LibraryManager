import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, take, tap } from 'rxjs/operators';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { CustomerLendsListComponent } from '../customer-lends-list/customer-lends-list.component';
import { Paging } from '../pagination-sorting/paging.model';
import { SortingModel } from '../pagination-sorting/sorting.model';
import { Customer } from '../shared/customer.model';
import { CustomerService } from '../shared/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  animations: [
    trigger('deleteCreateSlide', [
      
      transition('* => void', [
        animate('700ms', keyframes([
          style({ backgroundColor: '#ff4c4c', opacity: 1, offset: 0}),
          style({ backgroundColor: '#ff4c4c', transform: 'translateX(100px)', opacity: 0.5, offset: 0.5}),
          style({ backgroundColor: '#ff4c4c', transform: 'translateX(-1000px)', opacity: 0, offset: 1})
        ]))
      ]),
      transition('void => *', [
        animate('700ms', keyframes([
          style({ backgroundColor: '#ADFF2F', transform: 'translateX(-1000px)', opacity: 1, offset: 0}),
          style({ backgroundColor: '#ADFF2F', transform: 'translateX(100px)', opacity: 0.5, offset: 0.9}),
          style({ backgroundColor: '#ADFF2F', transform: 'translateX(0px)', opacity: 0, offset: 1})
        ]))
      ])
    ]),
    trigger('fadeIn', [
      
      transition('void => *', [
        animate('700ms ease-in', keyframes([
          style({ opacity: 0, offset: 0}),
          style({ opacity: 1, offset: 1})
        ]))
      ])
    ])
  ]
})
export class CustomerListComponent implements OnInit {

  public lang: string;
  public dataSource: Customer [];
  public displayedColumns: string[] = ['cardNumber', 'firstName', 'lastName', 'email', 'lendedBooks', 'actions'];

  public paging: Paging = new Paging();
  public sorting: SortingModel = new SortingModel;

  public searchKey: string;
  public filterSubject: Subject<any> = new Subject();
  public filterSubscription: Subscription;

  public isDeleting: boolean;

  @ViewChild(MatTable, {static: false}) table: MatTable<Customer>;

  constructor(public dialog: MatDialog,
              private toastr: ToastrService,
              private customerService: CustomerService) { }


  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.isDeleting = true;
    this.fetchCustomers(this.paging.CurrentPage, this.paging.PageSize);  
    this.handleFilter();
  }

  public onSeeLends(customer: Customer): void{
    this.dialog.open(CustomerLendsListComponent, {panelClass: 'app-full-bleed-dialog', data: customer});
  }

  public onCreate(): void {
    
    let dialogRef: MatDialogRef<CustomerFormComponent, any> = this.dialog.open(CustomerFormComponent, { panelClass: 'app-full-bleed-dialog' });
    
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((customer: Customer) => {

        if(!customer) return;

        this.dataSource.push(customer);
        this.table.renderRows();

        if(this.lang == 'en') {
          this.toastr.success('Customer successfully added', `${customer.firstName} ${customer.lastName}`);
        }
        // else if(this.lang == 'ru') {
        //   this.toastr.success('?????????? ?????????????? ??????????????????', `${book.title}`);
        // } 
        // else if(this.lang == 'hr') {
        //   this.toastr.success('Knjiga uspje??no dodana', `${book.title}`);
        // }
        this.setDelete(false);
      });
  }

  public onUpdate(customer: Customer): void {

    let dialogRef: MatDialogRef<CustomerFormComponent, any> = this.dialog.open(CustomerFormComponent, { panelClass: 'app-full-bleed-dialog', data: customer});

    dialogRef.afterClosed().pipe(take(1))
      .subscribe((editedCustomer: Customer) => {

        if(!editedCustomer) return;

        const index: number = this.dataSource.findIndex(c => c.id == customer.id);

        // update
        this.dataSource[index] = editedCustomer;
        
        this.table.renderRows();

        if(this.lang == 'en') {
          this.toastr.success('Customer successfully updated', `${customer.firstName} ${customer.lastName}`);
        }
        // else if(this.lang == 'ru') {
        //   this.toastr.success('?????????? ?????????????? ??????????????????', `${book.title}`);
        // }
        // else if(this.lang == 'hr') {
        //   this.toastr.success('Knjiga uspje??no obnovljena', `${book.title}`);
        // } 
          });
  }

  public onDelete(id: string): void {
    
    const index: number = this.dataSource.findIndex( customer => customer.id == id);
    const firstName: string = this.dataSource[index].firstName;
    const lastName: string = this.dataSource[index].lastName;

    this.customerService.deleteCustomer(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(customer => customer.id !== id);
      
      if(this.lang == 'en') {
        this.toastr.success('Customer successfully deleted', `${firstName} ${lastName}`);
      }
      // else if(this.lang == 'ru') {
      //   this.toastr.success('?????????? ?????????????? ??????????????', `${title}`);
      // } 
      // else if(this.lang == 'hr') {
      //   this.toastr.success('Knjiga uspje??no obrisana', `${title}`);
      // }
      
    });

  }

  public onPageChange(page: PageEvent): void {
    this.setDelete(false);
    this.fetchCustomers(page.pageIndex + 1, page.pageSize, this.searchKey, this.sorting.orderBy, this.sorting.sortDirection);
  }

  public onSortChange(event: Sort): void {
    this.setDelete(false);
    const split: string[] = event.active.split('.');
    const orderBy: string = split[split.length - 1]; // only last property
    const sortDirection: 'asc' | 'desc' = event.direction as  'asc' | 'desc';

    this.fetchCustomers(this.paging.CurrentPage, this.paging.PageSize, this.searchKey, orderBy, sortDirection);
    console.log(this.dataSource);
  }

  public setDelete(setter: boolean): void {
    this.isDeleting = setter;
  }

  public setSortModel(orderBy?: string, sortDirection?: 'asc' | 'desc'): void {
    this.sorting.orderBy = orderBy;
    this.sorting.sortDirection = sortDirection;
  }

  public setPagemodel(res: any): void {
    // retrieve paging headers
    let pagination: Paging = JSON.parse(res.headers.get('pagination')) as Paging;

    // update paging model
    // which reflects onto paginator in html
    this.paging.CurrentPage = pagination.CurrentPage;
    this.paging.PageSize = pagination.PageSize;
    this.paging.TotalCount = pagination.TotalCount;
  }

  public applyFilter(searchKey: string): void {
    this.filterSubject.next(searchKey);
  }

  public handleFilter(): void {
    this.setDelete(false);
    this.filterSubscription = this.filterSubject
    .pipe(debounceTime(500))
    .subscribe(searchKey => {
      this.searchKey = searchKey as string;
      this.fetchCustomers(1, this.paging.PageSize, searchKey);
    });

  }

  public fetchCustomers(page, pageSize, searchString?, orderBy?, sortDirection?: 'asc' | 'desc'): void {
    this.customerService.getCustomers(page, pageSize, searchString, orderBy, sortDirection).pipe(
      tap(res => this.dataSource = Object.assign([], res.body as  unknown as MatTableDataSource<Customer[]>)))
      .subscribe(
        res => (this.setPagemodel(res), this.setSortModel(orderBy, sortDirection))
      );
  }

}
