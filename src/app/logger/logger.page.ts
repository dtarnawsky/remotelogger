import { Component, EventEmitter, OnInit } from '@angular/core';
import { Device } from '../entities/device';
import { LogAction } from '../loglist/logaction';
import { StateService } from '../state.service';

interface LoggerViewModel {
  device: Device;
  deviceIdentifier: string;
  actions: EventEmitter<LogAction>;
}

@Component({
  selector: 'app-logger',
  templateUrl: './logger.page.html',
  styleUrls: ['./logger.page.scss'],
})
export class LoggerPage {
  public vm: LoggerViewModel = {
    device: undefined,
    deviceIdentifier: 'mydevice',
    actions: new EventEmitter<LogAction>(),
  };

  constructor(private stateService: StateService) {}

  ionViewWillEnter() {
    this.vm.device = this.stateService.device;
  }

  clear() {
    this.vm.actions.emit(LogAction.clear);
  }

  refresh() {
    this.vm.actions.emit(LogAction.refresh);
  }
}
