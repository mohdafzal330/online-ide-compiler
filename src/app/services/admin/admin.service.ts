import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListModel } from 'src/app/models/ListModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { Response } from 'src/app/models/ResponseModel';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';

@Injectable()
export class AdminService {
  constructor(private client: HttpClient) {}
  public deleteProblem(problem: any): Observable<Response> {
    return this.client.post<Response>(
      baseApiRootUrl + 'admin/deleteProblem',
      problem
    );
  }

  public getProblems(): Observable<ProblemDetail[]> {
    return this.client.get<ProblemDetail[]>(
      baseApiRootUrl + 'admin/getProblems'
    );
  }

  public getModules(): Observable<ListModel[]> {
    return this.client.get<ListModel[]>(baseApiRootUrl + 'admin/getModules');
  }
  public getTopics(moduleId: number): Observable<ListModel[]> {
    return this.client.get<ListModel[]>(
      baseApiRootUrl + 'admin/getTopics/' + moduleId
    );
  }

  public saveProblem(problemDetail: ProblemDetail): Observable<Response> {
    return this.client.post<Response>(
      baseApiRootUrl + 'admin/saveProblem',
      problemDetail
    );
  }
}
