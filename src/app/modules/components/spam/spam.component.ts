import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-spam',
  templateUrl: './spam.component.html',
  styleUrls: ['./spam.component.css']
})
export class SpamComponent implements OnInit {
  private mailDetailList:any;
  public type:string = "spam";

  constructor(private _sharedService: SharedService) { }

  ngOnInit() {
    this.mailDetailList = this._sharedService.getSpamList();
    if(!this.mailDetailList){
      this._sharedService.getSpamDetails().subscribe((response) => {
        this._sharedService.setSpamList(response,true);
        this.mailDetailList = response;
        //return response;
      });
    }    
  }
}


