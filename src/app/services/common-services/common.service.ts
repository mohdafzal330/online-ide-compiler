import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListModel } from 'src/app/models/ListModel';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { baseApiRootUrl } from 'src/app/shared/constants/http-config';

@Injectable()
export class CommonService {
  constructor(private client: HttpClient, private _snackBar: MatSnackBar) {}
  public loadingIndicator$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
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

  public showLoading(): void {
    this.loadingIndicator$.next(true);
  }
  public hideLoading(): void {
    this.loadingIndicator$.next(false);
  }

  showToast(msg: string = 'Nice '): void {
    this._snackBar.open(msg, ' x ', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
  setInLocalStorage(key: string, value: any): void {
    localStorage.setItem(key, value);
  }
  getFromLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }
}
