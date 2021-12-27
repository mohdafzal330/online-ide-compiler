import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Language } from 'src/app/models/LanguageModel';
import { ListModel } from 'src/app/models/ListModel';
import { Theme } from 'src/app/models/ThemeModel';
import { CommonService } from 'src/app/services/common-services/common.service';
import { IdeService } from 'src/app/services/ide-services/ide.service';
import { DefaultLanguageCodes } from 'src/app/shared/constants/ide-constants';
import { ConfimComponent } from '../confim/confim.component';

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
  public defaultScript: string = '';
  constructor(
    private _ideService: IdeService,
    private _commonService: CommonService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.languages = this._ideService.getAllLanguages();
    this.themes = this._ideService.getAllThemes();
    this.fonts = this._ideService.getAllFonts();
    this.setLanguage();
    this.setTheme();
    this.setFontSize();
    this.loadDefaultScript();
    this.editorchangeNotifier.subscribe((code) => {
      if (this.selectedLanguage.languageCode === 'java'){
        this._commonService.setInLocalStorage('compiler_code', code);
      }
    });
  }

  public onLaguageChange(e: any): void {
    if (!e || !e.value) {
      return;
    }
    this._commonService.setInLocalStorage(
      'codePlanetLanguage',
      this.selectedLanguage.languageCode
    );
    this.loadDefaultScript();
    this.setOutput('');
    this.setStatus('');
    this.setStatusCode(-1);
  }

  public counter: number = 0; //TODO: search for another aporach

  public loadDefaultScript(): void {
    const cacheCode = this._commonService.getFromLocalStorage(
      'compiler_code'
    );
    if (cacheCode && this.selectedLanguage.languageCode==='java') {
      this.defaultScript = cacheCode;
    }else if (this.selectedLanguage.defaultScript) {
      this.defaultScript = this.selectedLanguage.defaultScript;
    } else {
      this.defaultScript = DefaultLanguageCodes.java;
    }

    //this code is just for to make a change in default script
    // so that angular can detect changes with ' '
    if (this.counter % 2 == 1) {
      this.defaultScript += ' ';
      this.counter = 0;
    } else {
      this.counter = 1;
    }
  }

  public run() {
    this._commonService.showLoading();
    this.isExecuting = true;
    this.execute();
  }
  public resetEditorCode(): void {
    const dialogRef = this._dialog.open(ConfimComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        //this code is just for to make a change in default script
        // so that angular can detect changes with ' '
        if (this.counter % 2 == 0) {
          this.selectedLanguage.defaultScript += ' ';
          this.counter = 1;
        } else {
          this.selectedLanguage.defaultScript =
            this.selectedLanguage.defaultScript?.trim();
          this.counter = 0;
        }
      }
    });
  }
  goFullScreen() {
    const element = document.getElementById('editor') as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (element?.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      /* Safari */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      /* IE11 */
      element.msRequestFullscreen();
    }
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
          this._commonService.showToast(this.output);
        }
      );
  }
  private setLanguage(): void {
    const langCode =
      this._commonService.getFromLocalStorage('codePlanetLanguage');

    this.selectedLanguage =
      this.languages.find(
        (lang: Language): boolean => lang.languageCode == langCode
      ) ?? this.languages[0];
  }

  private setTheme(): void {
    const themeCode = this._commonService.getFromLocalStorage(
      'codePlanetEditorTheme'
    );

    this.selectedTheme =
      this.themes.find((lang: Theme): boolean => lang.code == themeCode) ??
      this.themes[0];
  }
  private setFontSize(): void {
    const fontSize = this._commonService.getFromLocalStorage(
      'codePlanetEditorFontSize'
    );

    this.selectedFont =
      this.fonts.find((lang: ListModel): boolean => lang.name == fontSize) ??
      this.fonts[0];
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
