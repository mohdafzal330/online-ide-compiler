import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ListModel } from 'src/app/models/ListModel';
import { CommonService } from 'src/app/services/common-services/common.service';

@Component({
  selector: 'app-nav-tree',
  templateUrl: './nav-tree.component.html',
  styleUrls: ['./nav-tree.component.scss'],
})
export class NavTreeComponent implements OnInit {
  public treeControl = new NestedTreeControl<ListModel>(
    (node) => node.childLists
  );
  public dataSource = new MatTreeNestedDataSource<ListModel>();
  constructor(private _commonService: CommonService) {
    this.getNavDetails(1);
  }
  ngOnInit(): void {}

  private getNavDetails(moduleId: number) {
    this._commonService.getNavDetails(moduleId).subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  hasChild = (_: number, node: ListModel) =>
    !!node.childLists && node.childLists?.length > 0;
}
