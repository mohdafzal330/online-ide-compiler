import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProblemDetail } from 'src/app/models/ProblemDetailMode';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CommonService } from 'src/app/services/common-services/common.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}
@Component({
  selector: 'app-manage-problems',
  templateUrl: './manage-problems.component.html',
  styleUrls: ['./manage-problems.component.scss'],
})
export class ManageProblemsComponent implements OnInit {
  /** Constants used to fill up our data base. */
  FRUITS: string[] = [
    'blueberry',
    'lychee',
    'kiwi',
    'mango',
    'peach',
    'lime',
    'pomegranate',
    'pineapple',
  ];
  NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth',
  ];
  displayedColumns: string[] = ['id', 'title', 'topicName', 'fruit'];
  public dataSource!: MatTableDataSource<ProblemDetail>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private problems: ProblemDetail[] = [];
  constructor(
    private adminService: AdminService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getProblems();
  }

  private getProblems(): void {
    this.adminService.getProblems().subscribe((result) => {
      this.problems = result;
      this.setDataSource();
    });
  }

  private setDataSource() {
    this.dataSource = new MatTableDataSource(this.problems);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public deleteProblem(id: number): void {
    if (!id || id <= 0) {
      return;
    }

    if (confirm('Are you sure ?')) {
      this.adminService.deleteProblem({ id: id }).subscribe((result) => {
        console.log(result.status);
        this.problems = this.problems.filter(
          (problem: ProblemDetail): boolean => problem.id != id
        );
        this.setDataSource();
        this.commonService.showToast('Deleted Successfully');
      });
    }
  }

  /** Builds and returns a new User. */
  createNewUser(id: number): UserData {
    const name =
      this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))] +
      ' ' +
      this.NAMES[Math.round(Math.random() * (this.NAMES.length - 1))].charAt(
        0
      ) +
      '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: this.FRUITS[Math.round(Math.random() * (this.FRUITS.length - 1))],
    };
  }
}
