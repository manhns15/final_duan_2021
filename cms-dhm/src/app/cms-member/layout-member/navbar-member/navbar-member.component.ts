import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../service/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar-member',
  templateUrl: './navbar-member.component.html',
  styleUrls: ['./navbar-member.component.css']
})
export class NavbarMemberComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  constructor(
    private token: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if (this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }
  logOut(): void {
    this.token.signOut();
    // window.location.reload();
    this.router.navigate(['/login']);
  }
}
