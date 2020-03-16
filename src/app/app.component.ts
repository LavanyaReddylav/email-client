import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';// import Jquery here    
import { SharedService } from '../app/shared/shared.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Email-Client';

  constructor(private _sharedService: SharedService){}
  ngOnInit(){
    this._sharedService.getInboxDetails().subscribe((response) => {
      this._sharedService.setInboxList(response,true);               
    });
    this._sharedService.getSpamDetails().subscribe((response) => {
      this._sharedService.setSpamList(response, true);               
    });
  }
}
