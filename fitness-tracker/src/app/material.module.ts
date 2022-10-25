import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [
      BrowserAnimationsModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule
    ],
    exports: [
      BrowserAnimationsModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule
    ]
  })

export class MaterialModule { }