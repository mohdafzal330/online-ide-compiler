import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ListModel } from 'src/app/models/ListModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CommonService } from 'src/app/services/common-services/common.service';
import { DefaultLanguageCodes } from 'src/app/shared/constants/ide-constants';
@Component({
  selector: 'app-add-problem-statement',
  templateUrl: './add-problem-statement.component.html',
  styleUrls: ['./add-problem-statement.component.scss'],
})
export class AddProblemStatementComponent implements OnInit {
  public content: string = `<h1 class="mt-1">69 - 2-D Array Demo | Introduction</h1> <div> <p>You are given a number N representing number of rows and a number M representing number of columns of the matrix and you are also a given a digit d.</p> <p>You are also given N*M numbers representing the elements of matrix.</p> <p>You are required to display the contents of 2d (matrix) array as shown in output format below.</p> <h3><img src="https://he-s3.s3.amazonaws.com/media/uploads/873c255.png" alt="2-D array demo" width="360" height="332" /></h3> <h3><strong>Input format</strong></h3> <p>First line will contain two numbers N and M (see sample test case)</p> <p>Next N line will contain M numbers each (see sample test case)</p> <h3><strong>Output format</strong></h3> <p>N rows, each row will contain M elements seprated by space.</p> <h3>&nbsp;</h3> <h3><strong>Contraints:</strong></h3> <p>1 &lt;= N &lt;= 100</p> <p>1 &lt;= M &lt;= 100</p> <p>0 &lt;= elements &lt;= 10^5</p> <h3>&nbsp;</h3> <h3><strong>Sample Input 1</strong></h3> <p>2 4</p> <p>11 12 13 14</p> <p>21 22 23 24</p> <h3><strong>Sample Output 1</strong></h3> <p>11 12 13 14</p> <p>21 22 23 24</p> <p>&nbsp;</p> <h3><strong>Sample Input 2</strong></h3> <p>3 3</p> <p>1 2 3</p> <p>4 5 6</p> <p>7 8 9</p> <h3><strong>Sample Output 2</strong></h3> <p>1 2 3</p> <p>4 5 6</p> <p>7 8 9</p> <p>&nbsp;</p> <p>&nbsp;</p> <p><em><strong>Explanation</strong>: Watch solution video in solution tab.</em></p> </div>`;
  public selectedModule!: ListModel;
  public modules: ListModel[] = [];
  public selectedTopic!: ListModel;
  public topics: ListModel[] = [];
  public isLoading: boolean = false;
  public sampleOutput: string = '';
  public problemId: number = 0;
  public sampleTestCaseId: number = 0;
  public selectedTopicId: number = 0;
  public defaultScript: string = DefaultLanguageCodes.java;

  @ViewChild('sampleInputControl') public sampleInputControl!: ElementRef;
  @ViewChild('sampleOutputControl') public sampleOutputControl!: ElementRef;
  @ViewChild('titleControl') public titleControl!: ElementRef;
  @ViewChild('solutionVideoControl') public solutionVideoControl!: ElementRef;
  public editorValueNotifier$: BehaviorSubject<string> = new BehaviorSubject(
    ''
  );
  constructor(
    private _adminService: AdminService,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.getModules();

    this.route.params.subscribe((params) => {
      this.problemId = parseInt(params?.id ?? 0);

      this.commonService.getProblemDetail(params?.id).subscribe((result) => {
        this.content = result.problemContent;
        this.defaultScript = result.defaultScript ?? DefaultLanguageCodes.java;
        this.sampleTestCaseId = result.sampleTestCase.id ?? 0;
        this.selecteTopic(result.topic);
        this.sampleInputControl.nativeElement.value =
          result.sampleTestCase.input;
        this.sampleOutputControl.nativeElement.value =
          result.sampleTestCase.expectedOutput;
        this.titleControl.nativeElement.value = result.title;
        this.solutionVideoControl.nativeElement.value =
          result.solutionVideoLink;
      });
    });
  }

  private selecteTopic(id: number): void {
    this.selectedTopic =
      this.topics.find((t: ListModel): boolean => t.id == id) ??
      this.selectedTopic;
    this.selectedTopicId = id;
  }

  public save(): void {
    const payLoad: ProblemDetail = {
      id: this.problemId,
      module: this.selectedModule?.id,
      topic:
        this.selectedTopicId > 0
          ? this.selectedTopicId
          : this.selectedTopic?.id,
      title: this.titleControl.nativeElement?.value,
      problemContent: this.content,
      sampleTestCase: {
        id: this.sampleTestCaseId,
        input: this.sampleInputControl.nativeElement?.value,
        expectedOutput: this.sampleOutputControl.nativeElement?.value,
      },
      solutionVideoLink: this.solutionVideoControl?.nativeElement?.value,
      defaultScript: this.editorValueNotifier$.value,
    };
    this._adminService.saveProblem(payLoad).subscribe((result) => {
      this.commonService.openSnackBar(
        'Problem Saved successfully. Status: ' + result.status
      );
    });
  }
  public onModuleChange(event: MatSelectChange) {
    this.getTopics(event?.value?.id);
  }
  public onTopicChange(event: MatSelectChange) {
    // this.getTopics(event?.value?.id);
    this.selectedTopicId = event?.value?.id;
  }

  private getModules(): void {
    this._adminService.getModules().subscribe(
      (result) => {
        if (!result || result.length == 0) {
          return;
        }
        this.modules = result;
        this.selectedModule = this.modules[0];
        this.getTopics(this.selectedModule.id);
      },
      (error: any) => {
        const blankModule = { id: 0, name: 'No topic found' };
        this.modules = [blankModule];
        this.selectedModule = blankModule;
      }
    );
  }
  private getTopics(moduleId: number): void {
    this._adminService.getTopics(moduleId).subscribe(
      (result) => {
        if (!result) {
          return;
        }
        this.topics = result;
        if (!this.selectedTopicId) {
          this.selectedTopic = this.topics[0];
          this.selectedTopicId = this.selectedTopic.id;
        }
      },
      (error: any) => {
        const blankTopic = { id: 0, name: 'No module found' };
        this.topics = [blankTopic];
        this.selectedTopic = blankTopic;
      }
    );
  }
}
