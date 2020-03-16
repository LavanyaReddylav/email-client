import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { MailListComponent } from './shared/mail-list/mail-list.component';
import { MailContentComponent } from './shared/mail-content/mail-content.component';
import { InboxComponent } from './modules/components/inbox/inbox.component';
import { SpamComponent } from './modules/components/spam/spam.component';
import { DeletedItemsComponent } from './modules/components/deleted-items/deleted-items.component';
import { CustomFolderComponent } from './modules/components/custom-folder/custom-folder.component';
import { NavigationBarComponent } from './shared/components/navigation-bar/navigation-bar.component';
import { HeaderBarComponent } from './shared/components/header-bar/header-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MailListComponent,
    MailContentComponent,
    InboxComponent,
    SpamComponent,
    DeletedItemsComponent,
    CustomFolderComponent,
    NavigationBarComponent,
    HeaderBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
