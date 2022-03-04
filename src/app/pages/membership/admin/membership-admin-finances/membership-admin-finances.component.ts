import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-membership-admin-finances',
  templateUrl: './membership-admin-finances.component.html',
  styleUrls: ['./membership-admin-finances.component.scss']
})
export class MembershipAdminFinancesComponent implements OnInit {
  saleData = [
    { name: "Members", value: 105000 },
    { name: "Registered", value: 55000 },
    { name: "Active", value: 15000 },
    { name: "UnActive", value: 150000 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
