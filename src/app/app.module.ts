import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppComponent } from './app.component';
import { CarouselModule } from 'primeng/carousel';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { questionReducer } from './store/reducers/question.reducers';
import { QuestionEffects } from './store/effects/question.effects';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    CarouselModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('questions', questionReducer),
    EffectsModule.forRoot([QuestionEffects])
    //EffectsModule.forRoot([])


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
