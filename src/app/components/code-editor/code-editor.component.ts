import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as ace from 'ace-builds';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
})
export class CodeEditorComponent implements OnInit {
  @Input() editorMode: string = 'ace/mode/java';
  @Input() script: string = 'sc';
  @Input() changeNotifier: BehaviorSubject<string> = new BehaviorSubject('');

  public aceEditor: any;
  public theme: string = 'ace/theme/tomorrow_night';
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.setEditorMode(this.editorMode);
    this.setCodeInEditor(this.script);
  }
  public ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme(this.theme);
    this.aceEditor.setOptions({ fontSize: 17 });

    this.setEditorMode(this.editorMode);
    this.setCodeInEditor(this.script);

    this.aceEditor.on('change', (e: any) => {
      this.changeNotifier.next(this.getCodeFromEditor());
    });
    this.changeNotifier.next(this.script);
  }

  private getCodeFromEditor() {
    return this.aceEditor?.session?.getValue() ?? '';
  }
  private setCodeInEditor(code: string | undefined) {
    this.aceEditor?.session?.setValue(code);
  }
  private setEditorMode(modeName: string | undefined) {
    this.aceEditor?.session?.setMode(modeName);
  }
}
