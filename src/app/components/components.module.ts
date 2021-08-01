import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoglistComponent } from '../loglist/loglist.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [LoglistComponent],
  exports: [LoglistComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
