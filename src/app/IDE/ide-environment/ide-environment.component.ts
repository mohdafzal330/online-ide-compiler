import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ace from 'ace-builds';
import { Language } from 'src/app/models/LanguageModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { CommonService } from 'src/app/services/common-services/common.service';
import { IdeService } from 'src/app/services/ide-services/ide.service';
@Component({
  selector: 'app-ide-environment',
  templateUrl: './ide-environment.component.html',
  styleUrls: ['./ide-environment.component.scss'],
})
export class IdeEnvironmentComponent implements OnInit, AfterViewInit {
  public originalinput: string = ``;
  public output: any = '';
  public statusCode: number = -1;
  public status: string = '';
  public languages: Language[] = [];
  public selectedLanguage!: Language;
  public showIOContainer: boolean = false;
  public isExecuting: boolean = false;
  public aceEditor: any;
  public selectedIOContainerTab: number = 0;
  public problem!: ProblemDetail;
  public theme: string = 'ace/theme/tomorrow_night';

  @ViewChild('editor') private editor!: ElementRef<HTMLElement>;

  constructor(
    private _ideService: IdeService,
    private _commonService: CommonService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.languages = this._ideService.getAllLanguages();
    this.selectedLanguage = this.languages[0];

    this._activatedRoute.params.subscribe((params) => {
      const problemId = params?.id ?? 11;
      this.getProblemDetail(problemId);
    });
  }

  public ngAfterViewInit(): void {
    ace.config.set('fontSize', '14px');
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme(this.theme);
    this.aceEditor.setOptions({ fontSize: 17 });

    this.setEditorMode(this.selectedLanguage.modeName);
    this.setCodeInEditor(this.selectedLanguage.defaultScript);
  }

  private getProblemDetail(problemId: number): void {
    if (!problemId || problemId <= 0) {
      return;
    }
    this._commonService.getProblemDetail(problemId).subscribe((result) => {
      this.problem = result;
      this.originalinput = this.problem?.sampleTestCase?.input;
      this.setBrowserTitle(this.problem?.title);
    });
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
    this.setCodeInEditor(e.value?.defaultScript);
    this.setEditorMode(e.value?.modeName);
  }
  public toggleIOContainer(): void {
    this.showIOContainer = !this.showIOContainer;
  }
  public run(isCompile: boolean = true) {
    this.showIOContainer = true;
    this.selectedIOContainerTab = 1;
    this.isExecuting = true;
    this.execute(isCompile);
  }

  private execute(isCompile: boolean) {
    const data = {
      script: this.getCodeFromEditor(),
      language: this.selectedLanguage.languageCode,
      isCompile: isCompile,
      stdin: this.problem.sampleTestCase.input,
      testCase: {
        input: this.originalinput,
        expectedOutPut: this.problem.sampleTestCase.expectedOutput,
      },
    };
    this._ideService.run(data).subscribe(
      (result: any) => {
        this.isExecuting = false;
        this.setStatus(result.status);
        this.setStatusCode(result.statusCode);
        this.setOutput(result?.output ?? result?.error);
      },
      (error: any): void => {
        this.isExecuting = false;
        this.output = 'Internal Server Error';
      }
    );
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
