import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CodeModel } from '@ngstack/code-editor';
import { StateService } from '../state.service';

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
  public lastMessage: string;
  public pcComplete: number = 1;
  public lineCount: number;
  public runnerLine: number;
  public msgColor: string = 'medium';
  public model: CodeModel = {
    language: 'text',//'typescript',
    uri: 'main.ts',
    value: '',
  };
  public options = {
    lineNumbers: true,
    contextmenu: true,
    minimap: {
      enabled: true,
    },
  };

  constructor(private stateService: StateService) { }

  onCodeChanged(value) {
    this.codeChange.emit(value);
    localStorage.ionLoggerCode = value;
    this.setLineCount();
  }

  ngOnInit() {
    const code = localStorage.ionLoggerCode;

    this.model = { ...this.model, value: code };

    this.codeChange.emit(this.model.value);
    this.stateService.testResults.subscribe((message: string) => {      
      const tmp = message.split(':');
      if (!message) {
        this.pcComplete = 1;
        this.lastMessage = '';
        return;        
      }
    
      const line = parseInt(tmp[0]);
      this.lastMessage = message.substr(tmp[0].length+1);
      if (line != 0) {
        this.lastMessage += ' at line '+line;
      }
      if (this.lastMessage.startsWith('Failed')) {
        this.msgColor = 'danger';
      } else if (this.lastMessage.includes('Test completed')) { 
        this.msgColor = 'success';
      }
        else {
        this.msgColor = 'medium';
      }
      this.runnerLine = line;
      this.pcComplete = this.runnerLine / this.lineCount;
      if (this.pcComplete == 0) {
        this.pcComplete = 1;
      }
    });
  }

  setLineCount() {
    try {
      this.lineCount = (window as any).monaco.editor.getModels()[0].getLineCount();
    } catch { }
  }

  setPosition(line: number) {
    // TODO: Doesnt work
    let pos = (window as any).monaco.editor.getModels()[0].getPositionAt();

    pos.lineNumber = 4;
    console.log('goto ' + line);
    (window as any).monaco.editor.getModels()[0].modifyPosition(pos);
  }

  loaded() {
    this.setLineCount();

  }
}
