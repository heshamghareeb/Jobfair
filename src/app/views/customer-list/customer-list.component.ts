import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { TransactionGraphComponent } from '../transaction-graph/transaction-graph.component';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { NoDataFoundComponent } from '../no-data-found/no-data-found.component';


@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, TransactionGraphComponent, MatTableModule, FormsModule, MatIconModule, NoDataFoundComponent],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  customerSearchInput:string = "";

  customers: any[] = [];
  transactions: any[] = [];
  filteredCustomers: any[] = [];
  selectedCustomerTransactions: any = [];
  selectedCustomerId: any;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCustomers().subscribe(data => {
      this.customers = data;
      this.filteredCustomers = data;
      console.log(this.filteredCustomers,'filteredCustomers');
      console.log(this.customers,'customers');

    });

    this.dataService.getTransactions().subscribe(data => {
      this.transactions = data;
      console.log(this.transactions,'this.transactions');

    });


  }

  // filterCustomers(searchTerm: string): void {
  //   this.filteredCustomers = this.customers.filter(customer =>
  //     customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // }

  getTransactionAmount(customerId: number): number {
    return this.transactions
      .filter(transaction => transaction.customer_id == customerId)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
  }

  filterCustomers(): void {
    const name = this.customerSearchInput;
    this.filteredCustomers = this.customers.filter(customer => customer.name.toLowerCase().includes(name.toLowerCase()));
  }


  selectCustomer(customerId: string): void {
    console.log(customerId,'selectCustomer customerId')
    this.selectedCustomerTransactions = this.transactions.filter(transaction => transaction.customer_id === +customerId);
    console.log(this.selectedCustomerTransactions, 'selectCustomer this.selectedCustomerTransactions')
    this.selectedCustomerId = customerId;
  }
}
