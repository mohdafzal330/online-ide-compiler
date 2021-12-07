import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProblemStatementComponent } from './components/add-problem-statement/add-problem-statement.component';
import { CodeEditorComponent } from './components/code-editor/code-editor.component';
import { CompilerComponent } from './components/compiler/compiler.component';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { ManageProblemsComponent } from './components/manage-problems/manage-problems.component';
import { NavTreeComponent } from './components/nav-tree/nav-tree.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { IdeEnvironmentComponent } from './IDE/ide-environment/ide-environment.component';
import { AdminService } from './services/admin/admin.service';
import { CommonService } from './services/common-services/common.service';
import { IdeService } from './services/ide-services/ide.service';
@NgModule({
  declarations: [
    AppComponent,
    IdeEnvironmentComponent,
    NavbarComponent,
    AddProblemStatementComponent,
    NavTreeComponent,
    NotFoundComponent,
    ManageProblemsComponent,
    LoadingBarComponent,
    CodeEditorComponent,
    CompilerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTabsModule,
    EditorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    MatTreeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatProgressBarModule,
    RouterModule.forRoot([
      {
        path: 'admin/add-problem/:id',
        component: AddProblemStatementComponent,
      },
      {
        path: 'admin/add-problem',
        component: AddProblemStatementComponent,
      },
      {
        path: 'admin',
        component: ManageProblemsComponent,
      },
      {
        path: 'problems/:id',
        component: IdeEnvironmentComponent,
      },
      {
        path: 'problems',
        component: IdeEnvironmentComponent,
      },
      {
        path: 'compiler',
        component: CompilerComponent,
      },
      {
        path: '',
        component: IdeEnvironmentComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    IdeService,
    AdminService,
    CommonService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
