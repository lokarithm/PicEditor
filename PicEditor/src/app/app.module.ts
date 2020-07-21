import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { PopupModalComponent } from './shared/popup-modal/popup-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    PopupModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
