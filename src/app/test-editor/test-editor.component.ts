import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
} from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';

@Component({
  selector: 'app-test-editor',
  templateUrl: './test-editor.component.html',
  styleUrls: ['./test-editor.component.scss'],
})
export class TestEditorComponent implements OnInit {
  @Input() set code(code: string) {
    setTimeout(() => {
      this.model.value = code;
    }, 0);
  }

  get code(): string {
    return this.model.value;
  }

  @Output() codeChange = new EventEmitter<string>();
  public theme = 'vs-dark';
  public model: CodeModel = {
    language: 'typescript',
    uri: 'main.ts',
    value: '',
  };
  public options = {
    lineNumbers: false,
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor(private ngZone: NgZone) {}

  onCodeChanged(value) {
    this.codeChange.emit(value);
  }

  ngOnInit() {
    this.model = { ...this.model, value: 'click(\'login\')' };
    this.codeChange.emit(this.model.value);
  }
}
