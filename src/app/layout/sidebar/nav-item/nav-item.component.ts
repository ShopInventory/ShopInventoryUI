import { Component, Input, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { NavItem } from '../nav-item-data';
import { NavService } from 'src/app/services/nav.service';
import { Router } from '@angular/router';
import { MatExpansionPanel } from '@angular/material/expansion';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss']
})
export class NavItemComponent {
  @Input() item: NavItem | any;
  @Input() isExpanded!: boolean;
  @ViewChild('expansionPanel') expansionPanel!: MatExpansionPanel;
  panelOpenState = false;

  constructor(public navService: NavService, public router: Router) { }

  ngOnChanges() {
    console.log('ngOnChanges isExpanded', this.isExpanded);

    if (!this.isExpanded) {
      this.closePanel();
    }
  }

  closePanel() {
    this.expansionPanel.close();
  }

  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }

    // scroll
    document.querySelector('.page-wrapper')?.scroll({
      top: 0,
      left: 0,
    });
  }
}
