import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/users.model';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
})
export class ListUsersComponent implements OnInit {
  users: any;

  constructor(private router: Router, private usersServices: UserService) {}
  ngOnInit(): void {
    //console.log('dummyData', dummyData);
    this.getUserDetails();
  }

  addUser() {
    this.router.navigate(['createUser']);
  }

  deleteUser(userId: number) {
    this.usersServices.deleteUserDetails(userId).subscribe(
      (res) => {
        if (res) {
          alert('UserDetails deleted successfully');
          // alert("Records deleted successfully");
          this.getUserDetails();
        }
      },
      (err) => {
        alert('Error in deleting UserDetails');

        //alert("Error in deleting Records");
        console.log(err);
      }
    );
  }
  editUser(userID: number) {
    console.log('userID', userID);
    this.router.navigate(['editUser', userID]);
  }

  getUserDetails() {
    this.usersServices.getUserDetails().subscribe(
      (data) => {
        if (data) {
          this.users = data;
          console.log('userdata', data);
        }
      },
      (error) => {
        console.log('error in getting userDetails');
      }
    );
  }
}
