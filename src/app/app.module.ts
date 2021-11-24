import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProblemStatementComponent } from './components/add-problem-statement/add-problem-statement.component';
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
    RouterModule.forRoot([
      {
        path: 'add-problem-statement',
        component: AddProblemStatementComponent,
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
        path: '',
        component: IdeEnvironmentComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [IdeService, AdminService, CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
