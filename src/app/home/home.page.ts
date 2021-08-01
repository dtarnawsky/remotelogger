import { Component, EventEmitter } from '@angular/core';
import { LogAction } from '../loglist/logaction';

interface HomeViewModel {
  deviceIdentifier: string;
  actions: EventEmitter<LogAction>;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public vm: HomeViewModel = {
    deviceIdentifier: 'mydevice',
    actions: new EventEmitter<LogAction>(),
  };

  constructor() {
  }

  clear() {
    this.vm.actions.emit(LogAction.clear);
  }

  refresh() {
    this.vm.actions.emit(LogAction.refresh);
  }
}
