import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
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
    private _senitizer: DomSanitizer
  ) {}

  public src!: SafeUrl;
  ngOnInit(): void {
    this.languages = this._ideService.getAllLanguages();
    this.selectedLanguage = this.languages[0];
    this.themes = this._ideService.getAllThemes();
    this.selectedTheme = this.themes[0];
    this.fonts = this._ideService.getAllFonts();
    this.selectedFont = this.fonts[5];

    this._activatedRoute.params.subscribe((params) => {
      const problemId = params?.id ?? 11;
      this.getProblemDetail(problemId);
    });
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
          this._commonService.openSnackBar('Something went wrong!');
        }
      );
  }
  private setBrowserTitle(title: string) {
    if (!title) {
      return;
    }
    document.title = title;
  }

  public onLaguageChange(e: any): void {
    if (!e || !e.value) {
      return;
    }

    this.loadDefaultScript();
    this.setOutput('');
    this.setStatus('');
    this.setStatusCode(-1);
    this.toggleIOContainer(true);
  }
  private loadDefaultScript(): void {
    this.defaultScript =
      (this.selectedLanguage.languageCode == 'java'
        ? this.problem.defaultScript
        : this.selectedLanguage.defaultScript ?? '') ??
      DefaultLanguageCodes.java;
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
