import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedRoutingModule,
    TranslateModule.forChild({
      extend: true,
    }),
  ],
  exports: [TranslateModule],
})
export class SharedModule {}
