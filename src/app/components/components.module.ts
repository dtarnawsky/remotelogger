import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoglistComponent } from '../loglist/loglist.component';
import { IonicModule } from '@ionic/angular';
import { TestEditorComponent } from '../test-editor/test-editor.component';

@NgModule({
  declarations: [LoglistComponent, TestEditorComponent],
  exports: [LoglistComponent, TestEditorComponent],
  imports: [CommonModule, IonicModule],
})
export class ComponentsModule {}
