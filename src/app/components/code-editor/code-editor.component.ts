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
  @Input() theme: string = 'ace/theme/dracula';
  @Input() fontSize: string = '17';

  public aceEditor: any;
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  constructor() {}

  ngOnInit(): void {}
  ngOnChanges(): void {
    this.setEditorMode(this.editorMode);
    this.setCodeInEditor(this.script);
    this.setEditorTheme(this.theme);
    this.setEditorFont(+this.fontSize);
  }
  public ngAfterViewInit(): void {
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme(this.theme);
    this.aceEditor.setOptions({
      fontSize: +this.fontSize,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: false,
    });

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
  private setEditorFont(fontSize: number | undefined) {
    this.aceEditor?.setOptions({
      fontSize: fontSize ?? 15,
    });
  }
  private setEditorMode(modeName: string | undefined) {
    this.aceEditor?.session?.setMode(modeName);
  }
  private setEditorTheme(theme: string | undefined) {
    this.aceEditor?.setTheme(this.theme);
  }
}
