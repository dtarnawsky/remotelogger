import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoggerPageRoutingModule } from './logger-routing.module';

import { LoggerPage } from './logger.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoggerPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [LoggerPage],
})
export class LoggerPageModule {}
