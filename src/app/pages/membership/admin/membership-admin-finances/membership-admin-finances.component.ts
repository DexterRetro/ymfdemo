import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Transactions } from 'src/app/models/transactions';
import { UsersServiceService } from 'src/app/services/users-service.service';


@Component({
  selector: 'app-membership-admin-finances',
  templateUrl: './membership-admin-finances.component.html',
  styleUrls: ['./membership-admin-finances.component.scss']
})
export class MembershipAdminFinancesComponent implements OnInit {
  dataSource: MatTableDataSource<Transactions> | any;
  selection = new SelectionModel<Transactions>(true, []);
  Columns: string[] = ['CUSTOMER','CONTACTS','AMOUNT PAID','PAYMENT PLATFORM','REF CODE','STATE'];
  loading=true;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private Auth:UsersServiceService,private router:Router) { 
    if(this.Auth.user?.role!=='admin'&&
    this.Auth.user?.extraRoles!=='accounting'||'registra'){
      this.router.navigateByUrl('/member');
      return;
    }
  }

  ngOnInit(): void {
  }
  async ngAfterViewInit() {
   // const RegUsersres = await this.userSer.GetAllUsers();
   /** RegUsersres.subscribe(response=>{
   //   this.dataSource = new MatTableDataSource(response.Users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingReg=false;
    });
   */
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
