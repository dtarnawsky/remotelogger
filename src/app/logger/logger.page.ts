import { Component, EventEmitter, OnInit } from '@angular/core';
import { Device } from '../entities/device';
import { LogAction } from '../loglist/logaction';
import { StateService } from '../state.service';

interface LoggerViewModel {
  device: Device;
  actions: EventEmitter<LogAction>;
  showTests: boolean
}

@Component({
  selector: 'app-logger',
  templateUrl: './logger.page.html',
  styleUrls: ['./logger.page.scss'],
})
export class LoggerPage {
  public vm: LoggerViewModel = {
    device: undefined,
    actions: new EventEmitter<LogAction>(),
    showTests: false
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

  segmentChanged(event) {
    this.vm.showTests = event.detail.value === 'tests';
  }
}
