import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Subject, Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private availableExercises: Exercise[] = [];
  private runningExercise!: Exercise | null;
  private fbSubst: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  getAvailableExercises(){
    this.fbSubst.push(this.db
      .collection<Exercise>('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data()['name'],
              duration: doc.payload.doc.data()['duration'],
              calories: doc.payload.doc.data()['calories']
            };
          });
        })
      )

      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }
      ));

  }

  startExcercise(selectedId: string){
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)!;
    this.exerciseChanged.next({...this.runningExercise});
  }

  completeExercise(){
    this.addDataToDb({...this.runningExercise!, date: new Date, state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number){
    this.addDataToDb({
      ...this.runningExercise!,
      duration: this.runningExercise!.duration * (progress /100),
      calories: this.runningExercise!.calories * (progress /100),
      date: new Date, state: 'cancelled'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  getRunningExercise(){
    return {...this.runningExercise};
  }

  getAllExercises(){
    this.fbSubst.push(this.db
      .collection<Exercise>('finishedExercises')
      .valueChanges()      
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises);
      }));
  }

  cancelSubscriptions(){
    this.fbSubst.forEach(sub => sub.unsubscribe());
  }

  private addDataToDb(exercise: Exercise){
    this.db.collection<Exercise>('finishedExercises').add(exercise);
  }
}