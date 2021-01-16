import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { LendService } from '../shared/lend.service';


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

  lang: string;
  dataSource: Customer [];
  displayedColumns: string[] = ['cardNumber', 'firstName', 'lastName', 'email', 'lendedBooks', 'actions'];

  paging = new Paging();
  sorting = new SortingModel;

  searchKey: string;
  filterSubject = new Subject();
  filterSubscription: Subscription;

  isDeleting: boolean;

  @ViewChild(MatTable, {static: false}) table: MatTable<Customer>;

  constructor( public dialog: MatDialog,
               private toastr: ToastrService,
               private customerService: CustomerService,
               private lendService: LendService) { }


  ngOnInit() {
    this.lang = localStorage.getItem('lang');
    this.isDeleting = true;
    this.fetchCustomers(this.paging.CurrentPage, this.paging.PageSize);  
    this.handleFilter();
  }

  onSeeLends(customer: Customer){
    this.dialog.open(CustomerLendsListComponent, {panelClass: 'app-full-bleed-dialog', data: customer});
  }

  onCreate() {
    
    let dialogRef = this.dialog.open(CustomerFormComponent, { panelClass: 'app-full-bleed-dialog' });
    
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((customer: Customer) => {

        if(!customer) return;

        this.dataSource.push(customer);
        this.table.renderRows();

        if(this.lang == 'en') {
          this.toastr.success('Customer successfully added', `${customer.firstName} ${customer.lastName}`);
        }
        // else if(this.lang == 'ru') {
        //   this.toastr.success('Книга успешно добавлена', `${book.title}`);
        // } 
        // else if(this.lang == 'hr') {
        //   this.toastr.success('Knjiga uspješno dodana', `${book.title}`);
        // }
        this.setDelete(false);
      });
  }

  onUpdate(customer: Customer) {

    let dialogRef = this.dialog.open(CustomerFormComponent, { panelClass: 'app-full-bleed-dialog', data: customer});

    dialogRef.afterClosed().pipe(take(1))
      .subscribe((editedCustomer: Customer) => {

        if(!editedCustomer) return;

        const index = this.dataSource.findIndex(c => c.id == customer.id);

        // update
        this.dataSource[index] = editedCustomer;
        
        this.table.renderRows();

        if(this.lang == 'en') {
          this.toastr.success('Customer successfully updated', `${customer.firstName} ${customer.lastName}`);
        }
        // else if(this.lang == 'ru') {
        //   this.toastr.success('Книга успешно обновлена', `${book.title}`);
        // }
        // else if(this.lang == 'hr') {
        //   this.toastr.success('Knjiga uspješno obnovljena', `${book.title}`);
        // } 
          });
  }

  onDelete(id: string) {
    
    const index = this.dataSource.findIndex( customer => customer.id == id);
    const firstName = this.dataSource[index].firstName;
    const lastName = this.dataSource[index].lastName;

    this.customerService.deleteCustomer(id).subscribe(() => {
      this.dataSource = this.dataSource.filter(customer => customer.id !== id);
      
      if(this.lang == 'en') {
        this.toastr.success('Customer successfully deleted', `${firstName} ${lastName}`);
      }
      // else if(this.lang == 'ru') {
      //   this.toastr.success('Книга успешно удалена', `${title}`);
      // } 
      // else if(this.lang == 'hr') {
      //   this.toastr.success('Knjiga uspješno obrisana', `${title}`);
      // }
      
    });

  }

  onPageChange(page: PageEvent) {
    this.setDelete(false);
    this.fetchCustomers(page.pageIndex + 1, page.pageSize, this.searchKey, this.sorting.orderBy, this.sorting.sortDirection);
  }

  onSortChange(event: Sort) {
    this.setDelete(false);
    const split = event.active.split('.');
    const orderBy = split[split.length - 1]; // only last property
    const sortDirection = event.direction as  'asc' | 'desc';

    this.fetchCustomers(this.paging.CurrentPage, this.paging.PageSize, this.searchKey, orderBy, sortDirection);
    console.log(this.dataSource);
  }

  setDelete(setter) {
    this.isDeleting = setter;
  }

  setSortModel(orderBy?, sortDirection?) {
    this.sorting.orderBy = orderBy;
    this.sorting.sortDirection = sortDirection;
  }

  setPagemodel(res) {
    // retrieve paging headers
    let pagination = JSON.parse(res.headers.get('pagination')) as Paging;

    // update paging model
    // which reflects onto paginator in html
    this.paging.CurrentPage = pagination.CurrentPage;
    this.paging.PageSize = pagination.PageSize;
    this.paging.TotalCount = pagination.TotalCount;
  }

  applyFilter(searchKey) {
    this.filterSubject.next(searchKey);
  }

  handleFilter() {
    this.setDelete(false);
    this.filterSubscription = this.filterSubject
    .pipe(debounceTime(500))
    .subscribe(searchKey => {
      this.searchKey = searchKey as string;
      this.fetchCustomers(1, this.paging.PageSize, searchKey);
    });

  }

  fetchCustomers(page, pageSize, searchString?, orderBy?, sortDirection?: 'asc' | 'desc'){
    this.customerService.getCustomers(page, pageSize, searchString, orderBy, sortDirection).pipe(
      tap(res => this.dataSource = Object.assign([], res.body as  unknown as MatTableDataSource<Customer[]>)))
      .subscribe(
        res => (this.setPagemodel(res), this.setSortModel(orderBy, sortDirection))
      );
  }

}
