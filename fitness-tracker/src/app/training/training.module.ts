import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './training-routing.module';


@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    TrainingRoutingModule
  ],
  providers: [],
  bootstrap: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule { }
