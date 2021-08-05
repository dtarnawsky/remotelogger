import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Device } from '../entities/device';
import { LogAction } from '../loglist/logaction';
import { StateService } from '../state.service';

interface LoggerViewModel {
  device: Device;
  actions: EventEmitter<LogAction>;
  showTests: boolean;
  code: string;
  busy: boolean;
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
    showTests: false,
    code: undefined,
    busy: false,
  };

  constructor(
    private stateService: StateService,
    private apiService: ApiService
  ) {}

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
    if (this.vm.showTests) {
      this.vm.code = 'click';
    }
  }

  codeChange(code: string) {
    this.vm.code = code;
  }

  async runTest() {
    try {
      this.vm.busy = true;
      await this.apiService.setActions(this.vm.device.id, [
        { code: this.vm.code },
      ]);
    } finally {
      this.vm.busy = false;
    }
  }
}
