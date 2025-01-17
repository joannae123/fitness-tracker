import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubscribtion!: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(): void {
    this.exerciseSubscribtion = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if(exercise){
          this.ongoingTraining = true;
        }
        else{
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if(this.exerciseSubscribtion){
      this.exerciseSubscribtion.unsubscribe();
    }
  }

}
