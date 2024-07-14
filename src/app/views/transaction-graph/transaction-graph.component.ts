import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DataService } from '../../core/data.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-transaction-graph',
  standalone: true,
  imports: [NgxChartsModule, CommonModule, ],
  templateUrl: './transaction-graph.component.html',
  styleUrl: './transaction-graph.component.scss'
})
export class TransactionGraphComponent implements OnInit, OnChanges{
  @Input() customerId: any;
  transactions: any[] = [];
  chartData: any[] = [];
  testData: any[] = [];
  colorScheme = '#5AA454'
  // colorScheme = {
  //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  // };



  //view : To define the display dimensions
  view: [number, number] = [700, 400];
  // xAxisLabel : X-Axis Label
  xAxisLabel = 'Financial Year';
  // yAxisLabel : Y-Axis Label
  yAxisLabel = 'Revenue (In Cr.)';

//graphData : Array of JSON data having "name" as parameter to
  //display on X-axis and "value" as parameter to display on Y-axis
  graphData = [
    {
      "name": "FY 21-22",
      "value": 35
    },
    {
      "name": "FY 22-23",
      "value": 58
    },
    {
      "name": "FY 23-24",
      "value": 103
    },
    {
      "name": "FY 24-25",
      "value": 185
    }
  ];

  constructor(private dataService: DataService) {
    console.log(this.customerId,'customerId constructor');
  }

  ngOnInit(): void {
    if (this.customerId !== undefined) {

      this.preparedTransactionsData();
    }
  }


  preparedTransactionsData(){
    this.dataService.getTransactions().subscribe((data:any) => {
      console.log(data,'data');
      this.testData = data;
      this.transactions = data.filter((transaction:any) =>{
        console.log(transaction,'transaction');
        console.log(this.customerId,'customerId');
        console.log(transaction.customer_id == this.customerId,'transaction.customer_id === this.customerId');

      return  transaction.customer_id == this.customerId
      });
      this.prepareChartData();
    });
  }

  prepareChartData(): void {
    console.log('prepareChartData');

    const grouped = this.transactions.reduce((acc, transaction) => {
      console.log(acc,'acc');
      console.log(transaction,'transaction');

      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});

    this.chartData = Object.keys(grouped).map(date => ({
      name: date,
      value: grouped[date]
    }));


    console.log(this.chartData ,'this.chartData ');

  }

  ngOnChanges(): void {
    this.preparedTransactionsData();
    this.prepareChartData();
  }
}
