import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private _sharedService: SharedService) { }

  private _notifyUnreadMailSubscribe;
  private _notifyUnreadMail:any = {};

  private navBarList: any = [
    { name: 'Inbox', code: 'inbox', icon: 'glyphicon glyphicon-inbox', css: 'active' },
    { name: 'Spam', code: 'spam', icon: 'glyphicon glyphicon-exclamation-sign', css: '' },
    { name: 'Deleted Item', code: 'deleted-item', icon: 'glyphicon glyphicon-trash', css: '' },
    { name: 'Custom Folder', code: 'custom-folder', icon: 'glyphicon glyphicon-folder-close', css: '' }
  ]

  ngOnInit() {
    this._notifyUnreadMailSubscribe = this._sharedService.notifyUnreadMailCount.subscribe((data: any) => {      
        this._notifyUnreadMail[data.type] = data.count;
    });
  }

}
