import { Component, EventEmitter, Input, Output } from '@angular/core';
import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() showSubmenu: boolean = false;
  @Input() isShowing: boolean = false;
  @Input() showSubSubMenu: boolean = false;
  @Input() isExpanded!: boolean; // Add this line to accept isExpanded input
  @Output() onMenuClick = new EventEmitter<void>();


  navItems = navItems;

  menuClick(){
    this.onMenuClick.emit()
  }

}
