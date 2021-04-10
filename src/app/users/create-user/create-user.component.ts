import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../models/users.model';
import { UserService } from 'src/app/services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  userform: FormGroup;
  savebtn: boolean;
  userId;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userDetails: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.savebtn = true;
    this.userform = this.fb.group({
      username: ['', Validators.required],
      phoneNo: ['', Validators.required],
      reportingManager: ['', Validators.required],
    });

    this.route.paramMap.subscribe((params) => {
      this.userId = +params.get('id');
      if (this.userId) {
        this.savebtn = false;
        this.getUserDetails(this.userId);
      }
    });
  }
  getUserDetails(id: number) {
    console.log('getUserDetails', id);
    this.userDetails.getUserDetails().subscribe((data) => {
      console.log('data', data);
      const userDetails = data.filter((data) => data.userId == id);
      this.editUserDetails(userDetails);
    });
  }

  editUserDetails(user: User) {
    console.log('editUserDetails', user);
    this.userform.patchValue({
      username: user[0]['username'],
      phoneNo: user[0]['phoneNo'],
      reportingManager: user[0]['reportingManager'],
    });
  }
  saveUserDetails(req) {
    if (this.userform.valid) {
      this.userDetails.insertUserDetails(req).subscribe(
        (data) => {
          if (data) {
            alert('User added successfully');
            this.router.navigate(['userslist']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  updateUserDetails(req) {
    if (this.userform.valid) {
      req.userId = this.userId;
      this.userDetails.updateUserDetails(req).subscribe(
        (data) => {
          if (data) {
            alert('User updated successfully');
            this.router.navigate(['userslist']);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
