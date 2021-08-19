import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  listUser: any[] = [];
  page = 1;
  pageSize = 8;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser() {
    this.userService.findAllUser().subscribe(res => {
      if (res) {
        console.log(res);
        res.map((x: any) => {
            x.roles.map((o: any) => {
              if (o.namerole === 'ROLE_MODERATOR')
              {
                this.listUser.push(x);
              }
            });
          });
        console.log(this.listUser);
      }
    });
  }
}
