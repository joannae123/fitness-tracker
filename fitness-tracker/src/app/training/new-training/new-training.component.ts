import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TrainingService } from '../training.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = true;
  

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {
   }

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => {
        this.exercises = exercises;
        this.isLoading = false;
      }
    );
    this.fetchExercises();
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExcercise(form.value.exercise);
  }

  fetchExercises(){
    this.trainingService.getAvailableExercises();
  }

  ngOnDestroy(){
    this.exerciseSubscription.unsubscribe();
  }

}
