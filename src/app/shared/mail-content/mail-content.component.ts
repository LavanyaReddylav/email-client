import { Component, OnInit } from '@angular/core';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mail-content',
  templateUrl: './mail-content.component.html',
  styleUrls: ['./mail-content.component.css']
})
export class MailContentComponent implements OnInit {
  mailInfo: any;
  multipleMailSelect: boolean = false;
  mailContentType: string = '';  
  mailInfoMessage : string ="Please select a mail";

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    //show slected mail(read/unread) message
    this.sharedService.selectedMailItem.subscribe((data : any) => {
      if(!data.mailInfoMessage){
        this.mailInfo = data;
      }else{
        this.mailInfoMessage = data.mailInfoMessage;
        this.mailInfo = false;
        this.multipleMailSelect = false;

      }

    });
   
    // This is for if multiple mail selected means instant of message show images
    this.sharedService.slectedMailCount.subscribe((data:any) =>{
      this.mailContentType = data.type;
      if( data.count > 1) {
        this.multipleMailSelect = true;
      }
      else{
        this.multipleMailSelect = false;
      }
    });
  }

  public moveItemContent : any = [
    { name: 'Move To Inbox', code: 'inbox', icon: 'glyphicon glyphicon-inbox'},
    { name: 'Move To Spam', code: 'spam', icon: 'glyphicon glyphicon-exclamation-sign'},
    { name: 'Move To Deleted Item', code: 'deleted-item', icon: 'glyphicon glyphicon-trash'},
    { name: 'Move To Custom Folder', code: 'custom-folder', icon: 'glyphicon glyphicon-folder-close'}];

    /**
     * @description it's trigger the event for multiple mail selected list
     * @param type 
     */

  private moveMail(type: string){
    this.sharedService.mailContentAction.next(type);
  }  
    

}
