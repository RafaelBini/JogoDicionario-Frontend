import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";

// Env
import { environment } from '../environments/environment';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Forms
import { FormsModule } from '@angular/forms';

// HTTP
import { HttpClientModule } from '@angular/common/http'

// Cookie
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RoomPageComponent } from './pages/room-page/room-page.component';
import { EditMeComponent } from './dialogs/edit-me/edit-me.component';
import { InactiveDialogComponent } from './dialogs/inactive-dialog/inactive-dialog.component';
import { RemovedDialogComponent } from './dialogs/removed-dialog/removed-dialog.component';
import { Step1Component } from './steps/step1/step1.component';
import { Step2Component } from './steps/step2/step2.component';
import { Step3Component } from './steps/step3/step3.component';
import { Step0Component } from './steps/step0/step0.component';
import { CorrectDefinitionDialogComponent } from './dialogs/correct-definition-dialog/correct-definition-dialog.component';

const MATERIAL_MODULES = [MatDialogModule, MatSnackBarModule]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    RoomPageComponent,
    EditMeComponent,
    InactiveDialogComponent,
    RemovedDialogComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step0Component,
    CorrectDefinitionDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ...MATERIAL_MODULES
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
