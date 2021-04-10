import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Outlet } from '../models/outlet.model';
import { OutletService } from '../services/outlet.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-outletlist',
  templateUrl: './outletlist.component.html',
  styleUrls: ['./outletlist.component.scss'],
})
export class OutletlistComponent implements OnInit {
  Outlets: any;

  constructor(private router: Router, private OutletService: OutletService) {}
  ngOnInit(): void {
    //console.log('dummyData', dummyData);
    this.getOutletDetails();
  }

  addOutlet() {
    this.router.navigate(['createOutlet']);
  }

  deleteOutlet(OutletId: number) {
    this.OutletService.deleteOutletDetails(OutletId).subscribe(
      (res) => {
        if (res) {
          alert('OutletDetails deleted successfully');
          // alert("Records deleted successfully");
          this.getOutletDetails();
        }
      },
      (err) => {
        alert('Error in deleting OutletDetails');

        //alert("Error in deleting Records");
        console.log(err);
      }
    );
  }
  editOutlet(OutletID: number) {
    console.log('OutletID', OutletID);
    this.router.navigate(['editOutlet', OutletID]);
  }

  getOutletDetails() {
    this.OutletService.getOutletDetails().subscribe(
      (data) => {
        if (data) {
          this.Outlets = data;
          console.log('this.Outlets', this.Outlets);
        }
      },
      (error) => {
        console.log('error in getting OutletDetails');
      }
    );
  }

  newOrder(productId: number) {
    this.router.navigate(['newOrder', productId]);
  }

  cartList(orderID: number) {
    this.router.navigate(['ordersList', orderID]);
  }
}
