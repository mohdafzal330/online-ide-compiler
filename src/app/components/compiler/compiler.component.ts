import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Language } from 'src/app/models/LanguageModel';
import { ListModel } from 'src/app/models/ListModel';
import { Theme } from 'src/app/models/ThemeModel';
import { CommonService } from 'src/app/services/common-services/common.service';
import { IdeService } from 'src/app/services/ide-services/ide.service';

@Component({
  selector: 'app-compiler',
  templateUrl: './compiler.component.html',
  styleUrls: ['./compiler.component.scss'],
})
export class CompilerComponent implements OnInit {
  public languages: Language[] = [];
  public selectedLanguage!: Language;
  public editorchangeNotifier: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public themes: Theme[] = [];
  public selectedTheme!: Theme;
  public fonts: ListModel[] = [];
  public selectedFont!: ListModel;
  public isExecuting: boolean = false;
  public input: string = '';
  public output: string = '';
  public status: string = '';
  public statusCode: number = -1;
  constructor(
    private _ideService: IdeService,
    private _commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.languages = this._ideService.getAllLanguages();
    this.selectedLanguage = this.languages[0];
    this.themes = this._ideService.getAllThemes();
    this.selectedTheme = this.themes[0];
    this.fonts = this._ideService.getAllFonts();
    this.selectedFont = this.fonts[3];
  }

  public run() {
    this._commonService.showLoading();
    this.isExecuting = true;
    this.execute();
  }

  private execute() {
    const data = {
      script: this.editorchangeNotifier.value,
      language: this.selectedLanguage.languageCode,
      isCompile: true,
      stdin: this.input,
      testCase: {
        input: '-786TheCodePlanet',
        expectedOutPut: '-786TheCodePlanet',
      },
    };
    this._ideService
      .run(data)
      .pipe(finalize(() => this._commonService.hideLoading()))
      .subscribe(
        (result: any) => {
          this.isExecuting = false;
          this.setStatus(result?.status);
          this.setStatusCode(result?.statusCode);
          this.setOutput(result?.output ?? result?.error);
        },
        (error: any): void => {
          this.isExecuting = false;
          this.output = 'Internal Server Error';
          this._commonService.openSnackBar(this.output);
        }
      );
  }
  private setStatus(status: string) {
    this.status = status;
  }
  private setStatusCode(statusCode: number) {
    this.statusCode = statusCode;
  }
  private setOutput(status: string) {
    this.output = status;
  }
}
