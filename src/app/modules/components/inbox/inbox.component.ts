import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { Observable, of, from } from 'rxjs';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  public mailDetailList: any;
  public type:string = "inbox";
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.mailDetailList = this._sharedService.getInboxList();
    if(!this.mailDetailList){
      this._sharedService.getInboxDetails().subscribe((response) => {
        this._sharedService.setInboxList(response, true);
        this.mailDetailList = response;
        let unreadInboxList = this.mailDetailList.filter(item =>{
          if(item.unread){
              return true;
          }else{
              return false;
          }
        })
        //return response;
        this._sharedService.notifyUnreadMailCount.next({ "type" : 'inbox', "count": unreadInboxList.length})
      });
      this._sharedService.getSpamDetails().subscribe((response : any) => {
        let unreadSpamList = response.filter(item =>{
          if(item.unread){
            return true;
        }else{
            return false;
        }
        });
        this._sharedService.notifyUnreadMailCount.next({ "type" : 'spam', "count": unreadSpamList.length})

        this._sharedService.setSpamList(response,true);        
      });
    }    
  }
}
