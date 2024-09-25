import { Component, OnInit, Output, ViewChild, } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { NavService } from '../services/nav.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  isExpanded: boolean = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  authPageFlag: boolean = false;

  constructor(
    private navService: NavService,

  ) {

  }

  ngOnInit() {
    this.navService.currentUrl.subscribe((res: any) => {
      // console.log('navService res', res)
      this.authPageFlag = res?.startsWith('/authentication');
      // console.log('authPageFlag', this.authPageFlag)
    })
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  toggleSidebar() {
    console.log('toggleSidebar before isExpanded', this.isExpanded);

    this.isExpanded = !this.isExpanded;
    console.log('toggleSidebar after isExpanded', this.isExpanded);
  }

  menuClick(){
    this.isExpanded = true;
  }
}
