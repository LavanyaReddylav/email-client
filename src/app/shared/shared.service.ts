import { Injectable } from '@angular/core';
import { Observable, of, from, Subject } from 'rxjs';

import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private _currentInboxList: any;
  private _currentSpamList: any;
  private _currentDeletedItemList: any = [];
  private _currentCustomFolderList: any = [];
  public selectedMailItem = new Subject();
  public notifyUnreadMailCount = new Subject();
  public slectedMailCount = new Subject();
  public mailContentAction = new Subject();

  constructor(private _http: HttpClient) { }

  /**
   * @description get the message form server as of now local
   */

  public getInboxDetails() {
    return this._http.get("./assets/server_files/inbox.json");
  }

  /**
   * @description after move/add the mail from inbox then update
   * @param inboxList 
   * @param isUpdatedInboxList 
   */

  public setInboxList(inboxList, isUpdatedInboxList ? :boolean) {
    if(isUpdatedInboxList){
      this._currentInboxList = inboxList;
    }
    else{
      this._currentInboxList.push(inboxList);
    }
    
    console.log(inboxList);
    this._countUnreadInboxMail();
  }

  /**
   * @description return current inbox lists
   */

  public getInboxList() {
    return this._currentInboxList;
  }


  //return current spam list
  public getSpamDetails() {
    return this._http.get("../../../assets/server_files/spam.json");
  }

  /**
   * @description after move/add the mail from spam then update spam list
   * @param spamList 
   * @param isUpdatedSpamList 
   */
  public setSpamList(spamList, isUpdatedSpamList?: boolean) {
    if (isUpdatedSpamList) {
      this._currentSpamList = spamList;
    } else {
      this._currentSpamList.push(spamList);
    }
    console.log(spamList);
    this._countUnreadSpamMail();
  }

  //return current spam list
  public getSpamList() {
    return this._currentSpamList;
  }

  /**
   * @description after move/add the mail from deleted items then update list
   * @param deletedItemList 
   * @param isUpdatedDeletedItemList 
   */
  public setDeletedItemList(deletedItemList, isUpdatedDeletedItemList? : boolean ) {
    if(isUpdatedDeletedItemList){
      this._currentDeletedItemList = deletedItemList ; 
    }else{
      this._currentDeletedItemList.push(deletedItemList);
      //this._currentDeletedItemList = deletedItemList;
    }
    this._countUnreadDeletedItemMail(); 
  }

  public getDeletedItemList() {
    return this._currentDeletedItemList;
  }

  /**
   * @description after move/add the mail from custom folder then update custom folder list
   * @param customFolderList 
   * @param isUpdatedcustomFolderList 
   */
  public setCustomFolderList(customFolderList, isUpdatedcustomFolderList? : boolean) {
    if(isUpdatedcustomFolderList){
      this._currentCustomFolderList = customFolderList;
    }else{
      this._currentCustomFolderList.push(customFolderList);     
    }    
    this._countUnreadCustomFolderMail();
  }

 
  //retun current custom folder list
  public getCustomFolderList() {
    return this._currentCustomFolderList;
  }

  
 
  public changeMailUnRead(selectedMailItem: any, type: string) {
    switch (type) {
      case 'inbox':
        this._changeInboxUnReadMail(selectedMailItem);
        break;
      case 'spam':
        this._changeSpamUnReadMail(selectedMailItem);
        break;
      case 'deleted-item':
        this._changeDeletedItemUnReadMail(selectedMailItem);
        break;
      case 'custom-folder':
        this._changeCustomFolderUnReadMail(selectedMailItem);
        break;
    }
  }


  /**
   * @description unread mail is read means set into read 
   * @param selectedMailItem 
   */
  private _changeInboxUnReadMail(selectedMailItem) {
    this._currentInboxList = this._currentInboxList.filter(function (item) {
      if (item.mId == selectedMailItem.mId) {
        item.unread = false;
      }
      return true
    });
    this._countUnreadInboxMail();
  }

  /**
   * @description unread mail is read means set into read 
   * @param selectedMailItem 
   */
  private _changeSpamUnReadMail(selectedMailItem) {
    this._currentSpamList = this._currentSpamList.filter(function (item) {
      if (item.mId == selectedMailItem.mId) {
        item.unread = false;
      }
      return true
    });
    this._countUnreadSpamMail();
  }

  /**
   * @description unread mail is read means set into read 
   * @param selectedMailItem 
   */
  private _changeDeletedItemUnReadMail(selectedMailItem) {
    this._currentDeletedItemList = this._currentDeletedItemList.filter(function (item) {
      if (item.mId == selectedMailItem.mId) {
        item.unread = false;
      }
      return true
    });
    this._countUnreadDeletedItemMail();
  }


  /**
   * @description unread mail is read means set into read 
   * @param selectedMailItem 
   */
  private _changeCustomFolderUnReadMail(selectedMailItem) {
    this._currentCustomFolderList = this._currentCustomFolderList.filter(function (item) {
      if (item.mId == selectedMailItem.mId) {
        item.unread = false;
      }
      return true
    });
    this._countUnreadCustomFolderMail();
  }

/**
 * @description count the unread mail and notify in inbox sidebar
 */

  private _countUnreadInboxMail() {
    let unreadInboxList = this.getInboxList();
    unreadInboxList = unreadInboxList.filter(item => {
      if (item.unread) {
        return true;
      } else {
        return false;
      }
    });

    //this.unreadInboxMailCountChanged.emit(unreadInboxList.length);
    this.notifyUnreadMailCount.next({ "type": 'inbox', "count": unreadInboxList.length })
  }

  /**
 * @description count the unread mail and notify in spam sidebar
 */

  private _countUnreadSpamMail() {
    let unreadSpamList = this.getSpamList();
    unreadSpamList = unreadSpamList.filter(item => {
      if (item.unread) {
        return true;
      } else {
        return false;
      }
    });

    //this.unreadSpamMailCountChanged.emit(unreadSpamList.length);
    this.notifyUnreadMailCount.next({ "type": 'spam', "count": unreadSpamList.length });
  }

  /**
 * @description count the unread mail and notify in deleted item sidebar
 */
  private _countUnreadDeletedItemMail() {
    let unreadDeletedItemList = this.getDeletedItemList();
    unreadDeletedItemList = unreadDeletedItemList.filter(item => {
      if (item.unread) {
        return true;
      } else {
        return false;
      }
    });

    //this.unreadDeletedItemMailCountChanged.emit(unreadDeletedItemList.length);
    this.notifyUnreadMailCount.next({ "type": 'deleted-item', "count": unreadDeletedItemList.length });
  }

  /**
 * @description count the unread mail and notify in custom folder sidebar
 */
  private _countUnreadCustomFolderMail() {
    let unreadCustomFolderList = this.getCustomFolderList();
    unreadCustomFolderList = unreadCustomFolderList.filter(item => {
      if (item.unread) {
        return true;
      } else {
        return false;
      }
    });

    //this.unreadCustomFolderMailCountChanged.emit(unreadCustomFolderList.length);
    this.notifyUnreadMailCount.next({ "type": 'custom-folder', "count": unreadCustomFolderList.length });
  }

  
}