import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as ace from 'ace-builds';
import { Language } from 'src/app/models/LanguageModel';
import { IdeService } from 'src/app/services/ide-services/ide.service';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';
@Component({
  selector: 'app-ide-environment',
  templateUrl: './ide-environment.component.html',
  styleUrls: ['./ide-environment.component.scss'],
})
export class IdeEnvironmentComponent implements OnInit, AfterViewInit {
  public code: string = ``;
  public input: string = ``;
  public output: any = '';
  public status: number = 1;
  public languages: Language[] = [];
  public selectedLanguage: number = 0;
  public showIOContainer: boolean = false;
  public isExecuting: boolean = false;
  public aceEditor: any;
  public langMode: string = 'ace/mode/java';
  public theme: string = 'ace/theme/tomorrow_night';
  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;
  constructor(
    private httpCleint: HttpClient,
    private _ideService: IdeService
  ) {}

  public ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme(this.theme);
    this.aceEditor.session.setMode(this.langMode);
    this.aceEditor.setOptions({ fontSize: 17 });
    this.aceEditor.session.setValue(this.code);
  }
  ngOnInit(): void {
    this.languages = this._ideService.getAllLanguages();
    this.selectedLanguage = this.languages[0]?.id;
    this.code = this._ideService.getLanguageDefaultCode(this.selectedLanguage);
  }

  public run(e: Event) {
    this.showIOContainer = true;
    this.isExecuting = true;
    this.code = this.aceEditor.session.getValue();
    this.execute(this.code);
  }

  public onLaguageChange(e: any): void {
    if (!e || !e.value) {
      return;
    }
    this.code = this._ideService.getLanguageDefaultCode(e.value);
    this.aceEditor?.session?.setValue(this.code);
  }
  public toggleIOContainer(): void {
    this.showIOContainer = !this.showIOContainer;
  }

  public execute(code: string) {
    const data = {
      script: code,
      language: this._ideService.getLanguageCode(this.selectedLanguage),
      stdin: this.input,
      versionIndex: 3,
    };
    this.httpCleint.post(baseApiRootUrl + 'execute', data).subscribe(
      (result: any) => {
        this.isExecuting = false;
        this.output = result?.output;
      },
      (error: any): void => {
        this.isExecuting = false;
        this.output = 'Internal Server Error';
      }
    );
  }
}
