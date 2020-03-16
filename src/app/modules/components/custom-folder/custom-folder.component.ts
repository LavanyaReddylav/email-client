import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-custom-folder',
  templateUrl: './custom-folder.component.html',
  styleUrls: ['./custom-folder.component.css']
})
export class CustomFolderComponent implements OnInit {

  public mailDetailList: any;
  public type:string = "custom-folder";
  
  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.mailDetailList = this._sharedService.getCustomFolderList();
    // if(!this.mailDetailList){
    //   this._sharedService.getCustomFolderList().subscribe((response) => {
    //     this._sharedService.setCustomFolderList(response);
    //     this.mailDetailList = response;
    //     return response;
    //   });
    // }    
  }
}
