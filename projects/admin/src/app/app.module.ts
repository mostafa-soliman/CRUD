import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule,
} from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from './core/core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ToastNoAnimationModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserAnimationsModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
