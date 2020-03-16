import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { SharedService } from '../shared.service';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.css']
})
export class MailListComponent implements OnInit, OnChanges {

  @Input() mailDetailList: any;
  @Input() type: string;
  private _selectedMailList: any = [];
  private _slectedMail: boolean = false;
  private isSelectedAll: boolean = false;

  public isInbox: boolean = true;
  public searchChar: string = '';
  public emptyMailList: boolean = false;

  //search list flag
  private _isSearchList: boolean = false;
  private searchList: any = [];
  private isFiredByMailContent :boolean = false;


  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    //this._countUnReadMail(true);
    //subscribe value from mail list content
    this._sharedService.mailContentAction.subscribe((data: any) => {
      this.moveSelectedMail(data);
      this.isFiredByMailContent = true;

    });

    this.type = this.type ? this.type : 'inbox';

  }


  ngOnChanges(changes: SimpleChanges) {
    if (this.mailDetailList) {
      if (this.mailDetailList.length > 0) {
        this.emptyMailList = false
      } else {
        this.emptyMailList = true;
      }
    }
  }


  /**
   * @description It's trigger the show mail content
   * @param selectedMailItem 
   */

  showMailDetail(selectedMailItem: any, showMailContent?:boolean) {
    if(showMailContent){
      this.isSelectedAll = false;
      this._selectedMailList = [];
      this._sharedService.slectedMailCount.next({ "count": this._selectedMailList.length, "type": this.type });
    }
    
    //if(this._selectedMailList.length <= 1 || selectedMailItem)
    this._sharedService.selectedMailItem.next(selectedMailItem);

    //for check more multiple select means check

    if(this.isSelectedAll){
      if(this._selectedMailList.length <= 2){
        if (selectedMailItem.unread) {
          this._sharedService.changeMailUnRead(selectedMailItem, this.type);
        }
      }
    }else{
      if(this._selectedMailList.length < 1){
        if (selectedMailItem.unread) {
          this._sharedService.changeMailUnRead(selectedMailItem, this.type);
        }
      }
    }  
      
    //this._countUnReadMail();
  }

  /**
   * @description item is choosed mail moveTo is where we need to move like spam folder or...
   * @param item 
   * @param moveTo 
   */

  public moveMail(item, moveTo) {
    switch (moveTo) {
      case 'inbox':
        this._moveMailIntoInbox(item);
        break;
      case 'spam':
        this._moveMailIntoSpam(item);
        break;
      case 'deleted-item':
        this._moveMailIntoDeletedItem(item);
        break;
      case 'custom-folder':
        this._moveMailIntoCustomFolder(item);
        break;
    }

    //un checked the select all checkbo if checked
    this.isSelectedAll = false;
  }

  /**
   * @description where we need to move
   * @param moveTo 
   */
  public moveSelectedMail(moveTo: string) {
    if (this.mailDetailList.length > 0) {
      if (this.isSelectedAll || this._selectedMailList.length > 0) {
        let mulSelectedMail: boolean = false
        if (this.isSelectedAll || this._selectedMailList.length >= 1) {
          mulSelectedMail = true;
          this.isSelectedAll = false;
        }
        switch (moveTo) {
          case 'inbox':
            this._moveMailIntoInbox(moveTo, mulSelectedMail);
            break;
          case 'spam':
            this._moveMailIntoSpam(moveTo, mulSelectedMail);
            break;
          case 'deleted-item':
            this._moveMailIntoDeletedItem(moveTo, mulSelectedMail);
            break;
          case 'custom-folder':
            this._moveMailIntoCustomFolder(moveTo, mulSelectedMail);
            break;
        }
      } else {
        // if(!this.isFiredByMailContent)
        // alert("Please Select Multiple Mail");
        // console.log("Plesae Select Multiple Mail");
      }
    } else {
      this.emptyMailList = true;
      this._sharedService.selectedMailItem.next({ "mailInfoMessage": "No Mails" });
    }
  }

  /**
   * @description selected mail move to inbox
   * @param item 
   * @param mulSelectedMail 
   */
  private _moveMailIntoInbox(item, mulSelectedMail?: boolean) {
    if (!mulSelectedMail) {
      this.mailDetailList = this.mailDetailList.filter(mailItem => {
        if (mailItem.mId == item.mId) {
          return false;
        } else {
          return true;
        }
      });
      item.unread = true;
      this._sharedService.setInboxList(item);
      this._updateMailList(this.mailDetailList);
    } else {
      let inboxList = this._sharedService.getInboxList();
      this._selectedMailList.filter(mailItem => {
        if (mailItem.isSelected) {
          mailItem.unread = true;
          inboxList.push(mailItem);
          return false;
        } else {
          mailItem.unread = true;
          return true;
        }
      });

      this._selectedMailList = this._selectedMailList.filter(mailItem => {
        this.mailDetailList = this.mailDetailList.filter(selectedMailItem => {
          if (mailItem.isSelected && mailItem.mId == selectedMailItem.mId) {
            return false;
          } else {
            return true;
          }
        });
        if (!mailItem.isSelected) {
          return true;
        }
      });

      this._sharedService.setInboxList(inboxList, true);
      this._updateMailList(this.mailDetailList);
    }

    //update mail list card 
    this._updateMailListCard();

  }

  /**
 * @description selected mail move to spam
 * @param item 
 * @param mulSelectedMail 
 */
  private _moveMailIntoSpam(item, mulSelectedMail?: boolean) {
    if (!mulSelectedMail) {
      this.mailDetailList = this.mailDetailList.filter(mailItem => {
        if (mailItem.mId == item.mId) {
          return false;

        } else {
          return true;
        }
      });

      item.unread = true;
      this._sharedService.setSpamList(item);
      this._updateMailList(this.mailDetailList);
    } else {
      let subList: any;
      let spamMailList = this._sharedService.getSpamList();
      //this.mailDetailList = this._selectedMailList.filter(mailItem => {
      this._selectedMailList.filter(mailItem => {
        if (mailItem.isSelected) {
          mailItem.unread = true;
          spamMailList.push(mailItem);
          return false;
        } else {
          mailItem.unread = true;
          return true;
        }
      });

      this._selectedMailList = this._selectedMailList.filter(mailItem => {
        this.mailDetailList = this.mailDetailList.filter(selectedMailItem => {
          if (mailItem.isSelected && mailItem.mId == selectedMailItem.mId) {
            return false;
          } else {
            return true;
          }
        });
        if (!mailItem.isSelected) {
          return true;
        }
      });

      this._sharedService.setSpamList(spamMailList, true);
      this._updateMailList(this.mailDetailList);
    }
    //update mail list card 
    this._updateMailListCard();

  }

  /**
 * @description selected mail move to Custom Folder
 * @param item 
 * @param mulSelectedMail 
 */
  private _moveMailIntoCustomFolder(item, mulSelectedMail?: boolean) {
    if (!mulSelectedMail) {
      this.mailDetailList = this.mailDetailList.filter(mailItem => {
        if (mailItem.mId == item.mId) {
          return false;
        } else {
          return true;
        }
      });

      item.unread = true;
      this._sharedService.setCustomFolderList(item);
      this._updateMailList(this.mailDetailList);
    } else {
      let customMailList = this._sharedService.getCustomFolderList();
      this._selectedMailList.filter(mailItem => {
        if (mailItem.isSelected) {
          mailItem.unread = true;
          customMailList.push(mailItem);
          return false;
        } else {
          mailItem.unread = true;
          return true;
        }
      });

      this._selectedMailList = this._selectedMailList.filter(mailItem => {
        this.mailDetailList = this.mailDetailList.filter(selectedMailItem => {
          if (mailItem.isSelected && mailItem.mId == selectedMailItem.mId) {
            return false;
          } else {
            return true;
          }
        });
        if (!mailItem.isSelected) {
          return true;
        }
      });

      this._sharedService.setCustomFolderList(customMailList, true);
      this._updateMailList(this.mailDetailList);
    }

    //update mail list card 
    this._updateMailListCard();
  }

  /**
 * @description selected mail move to deleted
 * @param item 
 * @param mulSelectedMail 
 */
  private _moveMailIntoDeletedItem(item, mulSelectedMail?: boolean) {
    if (!mulSelectedMail) {
      this.mailDetailList = this.mailDetailList.filter(mailItem => {
        if (mailItem.mId == item.mId) {
          return false;
        } else {
          return true;
        }
      });

      item.unread = true;
      this._sharedService.setDeletedItemList(item);
      this._updateMailList(this.mailDetailList);

    } else {
      let deletedMailList = this._sharedService.getDeletedItemList();
      this._selectedMailList.filter(mailItem => {
        if (mailItem.isSelected) {
          mailItem.unread = true;
          deletedMailList.push(mailItem);
          return false;
        } else {
          mailItem.unread = true;
          return true;
        }
      });

      this._selectedMailList = this._selectedMailList.filter(mailItem => {
        this.mailDetailList = this.mailDetailList.filter(selectedMailItem => {
          if (mailItem.isSelected && mailItem.mId == selectedMailItem.mId) {
            return false;
          } else {
            return true;
          }
        });
        if (!mailItem.isSelected) {
          return true;
        }
      });

      this._sharedService.setDeletedItemList(deletedMailList, true);
      this._updateMailList(this.mailDetailList);
    }
    //update mail list card 
    this._updateMailListCard();
  }

  /**
   * @description find the which type(inbox or spam) want to update use switchcase
   * @param mailItem 
   */
  private _updateMailList(mailItem) {
    switch (this.type) {
      case 'inbox':
        this._sharedService.setInboxList(mailItem, true);
        break;
      case 'spam':
        this._sharedService.setSpamList(mailItem, true);
        break;
      case 'deleted-item':
        this._sharedService.setDeletedItemList(mailItem, true);
        break;
      case 'custom-folder':
        this._sharedService.setCustomFolderList(mailItem, true);
        break;
    }
    //this._countUnReadMail();
  }

  /** 
   * @description for select mail to do some operation
   * @param checkBoxEvent 
   * @param checkedMail 
   */
  private selectMail(checkBoxEvent: any, checkedMail: any) {
    // After selectedAll Mail
    if (this.isSelectedAll) {
      //unselect and selected
      if (checkBoxEvent.currentTarget.checked) {
        this.mailDetailList.filter((item: any) => {
          if (item.mId == checkedMail.mId) {
            item.isSelected = true;
            this._selectedMailList.push(item);
          }
        });
      }
      else { // selected into unslected
        this._selectedMailList = this._selectedMailList.filter((item: any) => {
          if (item.mId == checkedMail.mId) {
            item.isSelected = false;
            return false;
          }
          else {
            return true;
          }
        });
        if(this._selectedMailList.length == 0){
          this.isSelectedAll = false
        }        
      }

      this._sharedService.slectedMailCount.next({ "count": this._selectedMailList.length, "type": this.type });

    } else {
      // !selectedAll Mail
      let checkSelectedMail = [];
      //selected
      if (checkBoxEvent.currentTarget.checked) {
        this.mailDetailList.filter((item: any) => {
          if (item.mId == checkedMail.mId) {
            item.isSelected = true;
            this._selectedMailList.push(item);
          }
        });
      } else {
        //unselected
        this._selectedMailList = this._selectedMailList.filter((item: any) => {
          if (item.mId == checkedMail.mId) {
            item.isSelected = false;
            return false;
          } else {
            return true;
          }
        });
      }

      this._sharedService.slectedMailCount.next({ "count": this._selectedMailList.length, "type": this.type });

    }
  }

  /**
   * @description for selecct all mail
   * @param checkBoxEvent 
   */
  private selectAllMail(checkBoxEvent: any) {
    if (checkBoxEvent.currentTarget.checked) {
      this.isSelectedAll = true
      this._selectedMailList = this.mailDetailList.filter((item) => {
        item.isSelected = true;
        return true
      });

      //emit 
    }
    else {
      this.isSelectedAll = false
      this._selectedMailList = [];
    }

    this._sharedService.slectedMailCount.next({ "count": this._selectedMailList.length, "type": this.type });
  }


  private _fillteredSelectedMail(checkBoxEvent, checkedMail) {
    this._selectedMailList = this._selectedMailList.filter((item: any) => {
      if (item.mId == checkedMail.mId) {
        if (checkBoxEvent.currentTarget.checked) {
          item.isSelected = true;
          return true;
        } else {
          item.isSelected = false;
          return false;
        }
      }
    });
  }

  private searchChange() {
     alert("Not Implemented");
    // if (this.searchChar != '') {
    //   this._isSearchList = true;
    //   this.searchList = this.mailDetailList.filter(item => {
    //     let subject = item.subject.toLowerCase().includes(this.searchChar.toLowerCase());
    //     let message = item.content.toLowerCase().includes(this.searchChar.toLowerCase());
    //     if (subject || message) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   });

    //   //let searchAny:any = this.mailDetailList.find(this.searchChange);
    //   console.log("searchAny");
    // } else {
    //   this._isSearchList = false;
    // }
  }

  private _updateMailListCard() {
    if (this.mailDetailList) {
      if (this.mailDetailList.length > 0) {
        this.emptyMailList = false;
        this._sharedService.selectedMailItem.next({ "mailInfoMessage": "Please select a mail" });
      } else {
        this.emptyMailList = true;
        this._sharedService.selectedMailItem.next({ "mailInfoMessage": "Please select a mail" });
      }
    }

    if (this.isSelectedAll) {
      this.isSelectedAll = true;
    }
  }

}
