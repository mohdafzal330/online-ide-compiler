import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfimComponent } from 'src/app/components/confim/confim.component';
import { Language } from 'src/app/models/LanguageModel';
import { ListModel } from 'src/app/models/ListModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { Theme } from 'src/app/models/ThemeModel';
import { CommonService } from 'src/app/services/common-services/common.service';
import { IdeService } from 'src/app/services/ide-services/ide.service';
import { DefaultLanguageCodes } from 'src/app/shared/constants/ide-constants';
@Component({
  selector: 'app-ide-environment',
  templateUrl: './ide-environment.component.html',
  styleUrls: ['./ide-environment.component.scss'],
})
export class IdeEnvironmentComponent implements OnInit {
  public originalinput: string = ``;
  public output: any = '';
  public statusCode: number = -1;
  public status: string = '';
  public languages: Language[] = [];
  public fonts: ListModel[] = [];
  public themes: Theme[] = [];
  public selectedLanguage!: Language;
  public selectedFont!: ListModel;
  public selectedTheme!: Theme;
  public showIOContainer: boolean = false;
  public isExecuting: boolean = false;
  public selectedIOContainerTab: number = 0;
  public problem!: ProblemDetail;
  public editorchangeNotifier: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  public defaultScript: string = '';

  constructor(
    private _ideService: IdeService,
    private _commonService: CommonService,
    private _activatedRoute: ActivatedRoute,
    private _dialog: MatDialog,
    private _senitizer: DomSanitizer
  ) {}

  public src!: SafeUrl;
  ngOnInit(): void {
    this.languages = this._ideService.getAllLanguages();
    this.themes = this._ideService.getAllThemes();
    this.fonts = this._ideService.getAllFonts();
    this.setLanguage();
    this.setTheme();
    this.setFontSize();

    this._activatedRoute.params.subscribe((params) => {
      const problemId = params?.id ?? 11;
      this.getProblemDetail(problemId);
    });
  }

  goFullScreen() {
    const element = document.getElementById('editor') as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (element?.requestFullscreen) {
      // chrome
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      // Safari
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      // IE11
      element.msRequestFullscreen();
    }
  }

  private getProblemDetail(problemId: number): void {
    if (!problemId || problemId <= 0) {
      return;
    }
    this._commonService.showLoading();
    this._commonService
      .getProblemDetail(problemId)
      .pipe(finalize(() => this._commonService.hideLoading()))
      .subscribe(
        (result) => {
          this.problem = result;
          this.originalinput = this.problem?.sampleTestCase?.input;
          this.setBrowserTitle(this.problem?.title);

          this.loadDefaultScript();

          this.src = this._senitizer.bypassSecurityTrustResourceUrl(
            this.problem?.solutionVideoLink ?? ''
          ) as string;
        },
        (error: any): any => {
          this._commonService.showToast('Something went wrong!');
        }
      );
  }
  private setBrowserTitle(title: string) {
    if (!title) {
      return;
    }
    document.title = title;
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
    this.toggleIOContainer(true);
  }
  public counter: number = 0; //TODO: search for another aporach
  public loadDefaultScript(): void {
    const t = this.defaultScript;
    this.defaultScript =
      (this.selectedLanguage.languageCode == 'java'
        ? this.problem.defaultScript
        : this.selectedLanguage.defaultScript ?? '') ??
      DefaultLanguageCodes.java;

    //this code is just for to make a change in default script
    // so that angular can detect changes with ' '
    if (this.counter % 2 == 0) {
      this.defaultScript += ' ';
      this.counter = 1;
    } else {
      this.counter = 0;
    }
  }

  public resetEditorCode(): void {
    const dialogRef = this._dialog.open(ConfimComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadDefaultScript();
      }
    });
  }

  public toggleIOContainer(close: boolean = false): void {
    if (close) {
      this.showIOContainer = false;
    } else {
      this.showIOContainer = !this.showIOContainer;
    }
  }
  public run(isCompile: boolean = true) {
    this._commonService.showLoading();
    this.showIOContainer = true;
    this.selectedIOContainerTab = 1;
    this.isExecuting = true;
    this.execute(isCompile);
  }

  private execute(isCompile: boolean) {
    const data = {
      script: this.editorchangeNotifier.value,
      language: this.selectedLanguage.languageCode,
      isCompile: isCompile,
      stdin: this.problem.sampleTestCase.input,
      testCase: {
        input: this.originalinput,
        expectedOutPut: this.problem.sampleTestCase.expectedOutput,
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
