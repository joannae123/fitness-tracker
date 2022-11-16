import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() sideNavClose = new EventEmitter<void>();
  isAuth = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onCloseSideNav(){
    this.sideNavClose.emit();
  }

  onLogout(){
    this.onCloseSideNav();
    this.authService.logout();
  }

  ngOnDestroy(): void {
    if(this.authSubscription){
      this.authSubscription.unsubscribe();
    }
  }

}
