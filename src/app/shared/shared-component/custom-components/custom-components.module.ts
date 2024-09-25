import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../shared-module/material/material.module';
import { GenericSearchableDropdownComponent } from './generic-searchable-dropdown/generic-searchable-dropdown.component';




@NgModule({
  declarations: [
    GenericSearchableDropdownComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    GenericSearchableDropdownComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomComponentsModule { }





