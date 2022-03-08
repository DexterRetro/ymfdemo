import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OldUsers } from 'src/app/models/OldUsers';
import { UnverifiedUser } from 'src/app/models/unverifiedUser';
import { User } from 'src/app/models/user';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { VerifyNewUserpopup } from 'src/app/templates/VerifyNewUserPopup/VerifyNewUser-popup';
import { VerifyOldUserpopup } from 'src/app/templates/VerifyOldUserPopup/VerifyOldUser-popup';


@Component({
  selector: 'app-membership-admin',
  templateUrl: './membership-admin.component.html',
  styleUrls: ['./membership-admin.component.scss'],
})
export class MembershipAdminComponent implements AfterViewInit {
  RegisteredColumns: string[] = ['YMFID', 'NAME', 'PROVINCE', 'CONTACTS','star'];
  UnverifiedColumns: string[] = ['NAME','CONTACTS','STATE'];

  dataSource: MatTableDataSource<User> | any;
  selection = new SelectionModel<User>(true, []);
  loadingReg=true;
  loadingUnReg=true;
  UnverifiedUsers:{
    userName?:String,
    userSurname?:String,
    email?:String,
    phoneNumber?:String,
    id?:any,
    type?:String}[]=[];
  NewUsers:UnverifiedUser[]=[];
  oldUsers:OldUsers[]=[];
  VerificationInprogress=false;
  VerifiyingUser='';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatTable) tableUU: MatTable<{ userName: String; userSurname: String; email: String; phoneNumber: String; id: any; type: String; }> | undefined;

  constructor(private userSer:UsersServiceService,private dialog:MatDialog,private router:Router) {
    this.Init();
  }

  async Init(){
    if(this.userSer.user?.role!==('board-member'|| 'admin')&&
        this.userSer.user?.extraRoles!==('registra')){
          this.router.navigateByUrl('/member');
          return;
    }
    const NewUsersres= await this.userSer.GetUnverifiedUsers();
    NewUsersres.subscribe(response=>{
      this.NewUsers = response.Users;

      this.NewUsers.forEach(e=>{
        this.UnverifiedUsers.push({
          userName:e.userName,
          userSurname:e.userSurname,
          email:e.email,
          phoneNumber:e.phoneNumber,
          id:e._id,
          type:'new'})
      })
      this.tableUU?.renderRows();
    });

    const OldUserres = await this.userSer.GetTransUsers();
    OldUserres.subscribe(response=>{
      this.oldUsers = response.Users;

      this.oldUsers.forEach(e=>{
        this.UnverifiedUsers.push({
          userName:e.userName,
          userSurname:e.userSurname,
          email:e.email,
          phoneNumber:e.phoneNumber,
          id:e._id,
          type:'old'})
          
      });
      this.tableUU?.renderRows();
    });
  }
    
  getAwaitingState(state:string):String{
    if(state==='new'){
      return 'Registration Approval'
    }else if(state==='old'){
      return 'Web Account Approval'
    }
    return 'Verification'
  }

  viewUnverifiedUser(id:any,type:any){
    if(type==='new'){
      const user = this.NewUsers.find(e=>{
        return e._id===id
      });
      if(!user){return;}
      this.dialog.open(VerifyNewUserpopup,{data:{user:user,id:'',action:''}});
    }else{
      const user = this.oldUsers.find(e=>{
        return e._id===id;
      })
      if(!user){return;}
      this.dialog.open(VerifyOldUserpopup,{data:{user:user,id:'',action:''}});
    }
  }


 async ngAfterViewInit() {
    const RegUsersres = await this.userSer.GetAllUsers();
    RegUsersres.subscribe(response=>{
      this.dataSource = new MatTableDataSource(response.Users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loadingReg=false;
    });
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  }
