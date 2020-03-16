import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-deleted-items',
  templateUrl: './deleted-items.component.html',
  styleUrls: ['./deleted-items.component.css']
})
export class DeletedItemsComponent implements OnInit {

  public mailDetailList: any;
  public type:string = "deleted-item";
  
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.mailDetailList = this._sharedService.getDeletedItemList();
    // if(!this.mailDetailList){
    //   this._sharedService.getInboxDetails().subscribe((response) => {
    //     this._sharedService.setInboxList(response);
    //     this.mailDetailList = response;
    //     return response;
    //   });
    // }    
  }

}
