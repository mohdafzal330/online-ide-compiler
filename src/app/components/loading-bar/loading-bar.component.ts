import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common-services/common.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  public showLoadingBar: boolean = false;
  constructor(private _commonService: CommonService) {}

  ngOnInit(): void {
    this._commonService.loadingIndicator$.subscribe((showLoading) => {
      this.showLoadingBar = showLoading;
    });
  }
}
