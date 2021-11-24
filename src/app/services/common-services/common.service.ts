import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListModel } from 'src/app/models/ListModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';

@Injectable()
export class CommonService {
  constructor(private client: HttpClient) {}

  public getNavDetails(moduleId: number): Observable<ListModel[]> {
    return this.client.get<ListModel[]>(
      baseApiRootUrl + 'problems/navdetails/' + moduleId
    );
  }
  public getProblemDetail(problemId: number): Observable<ProblemDetail> {
    return this.client.get<ProblemDetail>(
      baseApiRootUrl + 'problems/detail/' + problemId
    );
  }
}
