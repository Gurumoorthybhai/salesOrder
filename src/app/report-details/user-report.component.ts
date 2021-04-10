import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-user-report',
  templateUrl: './user-report.component.html',
  styleUrls: ['./user-report.component.scss'],
})
export class UserReportComponent implements OnInit {
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
    this.reportService.insertUserFilterDate(req).subscribe((data) => {
      this.Orders = data;
      console.log('filtered data', this.Orders);
    });
    console.log('date range', req);
  }

  startDate(event: MatDatepickerInputEvent<Date>) {
    this.startDatevalue = event.value.toISOString();
  }
  endDate(event: MatDatepickerInputEvent<Date>) {
    this.endDatevalue = event.value.toISOString();
  }
}
