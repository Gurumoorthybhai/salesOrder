import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Outlet } from '../models/outlet.model';
import { OutletService } from '../services/outlet.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-editoutlet',
  templateUrl: './create-editoutlet.component.html',
  styleUrls: ['./create-editoutlet.component.scss'],
})
export class CreateEditoutletComponent implements OnInit {
  outletform: FormGroup;
  savebtn: boolean;
  outletId;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private outletService: OutletService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.savebtn = true;
    this.outletform = this.fb.group({
      outletName: ['', Validators.required],
      outletPhoneNo: ['', Validators.required],
      outletAddress: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.outletId = +params.get('id');
      if (this.outletId) {
        this.savebtn = false;
        this.getOutletDetails(this.outletId);
      }
    });
  }
  getOutletDetails(id: number) {
    console.log('getoutletDetails', id);
    this.outletService.getOutletDetails().subscribe((data) => {
      console.log('data', data);
      const outletDetails = data.filter((data) => data.outletId == id);
      this.editOutletDetails(outletDetails);
    });
  }

  editOutletDetails(outlet: Outlet) {
    console.log('editoutletDetails', outlet);
    this.outletform.patchValue({
      outletName: outlet[0]['outletName'],
      outletPhoneNo: outlet[0]['outletPhoneNo'],
      outletAddress: outlet[0]['outletAddress'],
    });
  }
  saveOutletDetails(req) {
    if (this.outletform.valid) {
      this.outletService.insertOutletDetails(req).subscribe(
        (data) => {
          if (data) {
            alert('outlet added successfully');
            this.router.navigate(['outletlist']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateOutletDetails(req) {
    if (this.outletform.valid) {
      req.outletId = this.outletId;
      this.outletService.updateOutletDetails(req).subscribe(
        (data) => {
          if (data) {
            alert('outlet updated successfully');
            this.router.navigate(['outletlist']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
