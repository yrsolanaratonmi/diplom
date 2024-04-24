import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiThemeNightModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { NoteViewComponent } from './note-view/note-view.component';
import {
  TuiActionModule,
  TuiInputComponent,
  TuiInputFilesModule,
  TuiInputModule,
  TuiIslandModule,
  TuiMarkerIconModule,
  TuiTagModule,
  TuiTextAreaModule,
} from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';
import { NoteNewComponent } from './note-new/note-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { NotesState } from './store/notes.state';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NoteEditComponent } from './note-edit/note-edit.component';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { DarkModeState } from './store/darkMode.state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    NoteViewComponent,
    NoteNewComponent,
    NoteEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiActionModule,
    TuiLetModule,
    TuiIslandModule,
    FormsModule,
    ReactiveFormsModule,
    TuiTextAreaModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiInputFilesModule,
    TuiDialogModule,
    TuiThemeNightModule,
    TuiMarkerIconModule,
    TuiTagModule,
    NgxsModule.forRoot([NotesState, DarkModeState]),
    NgxsStoragePluginModule.forRoot({
      key: [NotesState, DarkModeState],
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
