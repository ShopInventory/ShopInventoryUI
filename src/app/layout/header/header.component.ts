import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isExpanded: boolean = true;

  @Output() toggle = new EventEmitter<void>();
  userPic = '';

  ngOnInit() {
    this.userPic = "assets/icons/male-user.png"
  }

  toggleSidebar() {
    this.toggle.emit();
  }
}
