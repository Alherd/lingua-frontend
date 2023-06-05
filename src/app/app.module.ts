import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LessonComponent } from './lesson/lesson.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LessonsListComponent } from './lessons-list/lessons-list.component';

const APP_ROUTES: Routes = [
  { path: 'lessons', component: LessonsListComponent },
  { path: 'lessons/:id', component: LessonComponent },
  { path: 'about', component: LessonComponent },
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LessonComponent,
    LoginComponent,
    LessonsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
