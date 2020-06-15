import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import { MessageComponent } from './message.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [MessageComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'messages',
        component: MessageComponent,
        outlet: 'popup'
      }
    ])
  ]
})
export class MessageModule { }
