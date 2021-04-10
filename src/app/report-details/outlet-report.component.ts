import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { OrderService } from '../services/order.service';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-outlet-report',
  templateUrl: './outlet-report.component.html',
  styleUrls: ['./outlet-report.component.scss'],
})
export class OutletReportComponent implements OnInit {
  startDatevalue;
  endDatevalue;
  Orders: any;
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}
  filter() {
    let req = {};
    req['startDate'] = this.startDatevalue;
    req['endDate'] = this.endDatevalue;
    //this.getOrderDetails();
    this.reportService.insertOutletFilterDate(req).subscribe((data) => {
      this.Orders = data;
      console.log('filtered data', this.Orders);
    });
    console.log('date range', req);
  }
  valueChanged(event: MatDatepickerInputEvent<Date>) {
    this.startDatevalue = event.value.toISOString();
  }

  endDate(event: MatDatepickerInputEvent<Date>) {
    this.endDatevalue = event.value.toISOString();
  }
}
