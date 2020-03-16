import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InboxComponent } from './modules/components/inbox/inbox.component';
import { SpamComponent } from './modules/components/spam/spam.component';
import { CustomFolderComponent } from './modules/components/custom-folder/custom-folder.component';
import { DeletedItemsComponent } from './modules/components/deleted-items/deleted-items.component';


const routes: Routes = [
  { path: 'inbox', component: InboxComponent },
  { path: 'spam', component: SpamComponent },
  { path: 'custom-folder', component: CustomFolderComponent },
  { path: 'deleted-item', component: DeletedItemsComponent },
  { path: '', redirectTo: 'inbox', pathMatch: 'full'  }
];

@NgModule({
  declarations: [],  
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
