import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    MaterialModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class DashboardModule {}
