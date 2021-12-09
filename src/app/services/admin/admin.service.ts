import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ListModel } from 'src/app/models/ListModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { Response } from 'src/app/models/ResponseModel';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';

@Injectable()
export class AdminService {
  constructor(private client: HttpClient, private router: Router) {}

  public validateAdmin(): void {
    const pwd = prompt('Enter credentials');
    if (!pwd || pwd === '') {
      this.redirectToHome();
      return;
    }
    this.client
      .post<boolean>(baseApiRootUrl + 'admin/validateAdmin', { name: pwd })
      .pipe(
        catchError((error: any): any => {
          this.redirectToHome();
        })
      )
      .subscribe((result) => {
        if (!result || result == undefined) {
          this.redirectToHome();
        }
      });
  }

  private redirectToHome(): void {
    this.router.navigate(['']);
  }

  public deleteProblem(problem: any): Observable<Response> {
    this.validateAdmin();
    return this.client.post<Response>(
      baseApiRootUrl + 'admin/deleteProblem',
      problem
    );
  }

  public getProblems(): Observable<ProblemDetail[]> {
    this.validateAdmin();
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
    this.validateAdmin();
    return this.client.post<Response>(
      baseApiRootUrl + 'admin/saveProblem',
      problemDetail
    );
  }
}
