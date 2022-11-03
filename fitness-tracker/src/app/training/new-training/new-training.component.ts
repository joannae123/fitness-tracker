import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  exercises: Observable<any>;
  

  constructor(private trainingService: TrainingService, private db: AngularFirestore) {
   }

  ngOnInit(): void {
    //this.exercises = this.trainingService.getAvailableExercises();
    this. exercises = this.db.collection('availableExercises')
    .snapshotChanges()
    .pipe(
      map(docArray =>{
       return docArray.map(doc =>{
          return {
            id: doc.payload.doc.id,
            value : doc.payload.doc.data()
          }
        });
      })
    )
/*     .subscribe(result => {
      console.log(result);
    }); */
  }

  onStartTraining(form: NgForm){
    this.trainingService.startExcercise(form.value.exercise);
    console.log(form.value)
  }

}
