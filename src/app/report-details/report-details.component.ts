import { logging } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment';
import { OrderService } from '../services/order.service';
import { ReportService } from '../services/report.service';
@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.component.html',
  styleUrls: ['./report-details.component.scss'],
})
export class ReportDetailsComponent implements OnInit {
  startDatevalue;
  endDatevalue;
  Orders: any;
  constructor(private reportService: ReportService) {}

  ngOnInit(): void {}

  startDate(event: MatDatepickerInputEvent<Date>) {
    this.startDatevalue = event.value.toISOString();
  }

  endDate(event: MatDatepickerInputEvent<Date>) {
    this.endDatevalue = event.value.toISOString();
  }
  filter() {
    let req = {};
    req['startDate'] = this.startDatevalue;
    req['endDate'] = this.endDatevalue;
    //this.getOrderDetails();
    this.reportService.insertProductFilterDate(req).subscribe((data) => {
      this.Orders = data;
      console.log('filtered data', this.Orders);
    });
    console.log('date range', req);
  }
}
