import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { map, tap } from 'rxjs/operators';
import { Observable, Subject, of } from 'rxjs';
import { AuthService } from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private initialJobs= [];
  private jobs = [];
  jobsSubject = new Subject();
  searchResultSubjet = new Subject();

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private urlApi: string = "http://localhost:4201/api/";



  constructor(private http: HttpClient, private athService : AuthService) {

  }

  getJobsSubject(){
    return this.jobsSubject;
  }

  getJobs() :Observable<any> {
  /*
    // on a à la fois des données de jobs.json + des données ajoutées par notre formulaire
    if(this.jobs.length > 0 && this.initialJobs.length > 0){
      //console.log("this.jobs.length > 0 && this.initialJobs.length > 0")
      return of([...this.jobs, ...this.initialJobs]);

    //on a pas encore récupéré de données depuis jobs.json
    }else if(this.jobs.length > 0 && this.initialJobs.length === 0){
      //console.log("this.jobs.length > 0 && this.initialJobs.length === 0")
      this.http.get(this.urlApi+'jobs')
                      .pipe(map((response: any) => {
                        if (response.success === true) {
                          return response.data;
                        } else{
                          return undefined;
                        } 
                      }),tap((data: any) => {
                        console.log(data);
                        this.initialJobs = data;
                        this.jobs = [...this.jobs, ...this.initialJobs]
                      }));

    }else if(this.jobs.length === 0 && this.initialJobs.length > 0){
      //console.log("this.jobs.length === 0 && this.initialJobs.length > 0")
      //console.log(this.initialJobs)
      return of([...this.jobs, ...this.initialJobs]);

    // on a des jobs récupérré de jobs.json
    }else{
      console.log("else")
      return this.http.get(this.urlApi+'jobs')
                      .pipe(map((response: any) => {
                        //console.log(this.jobs.length + " - " + this.initialJobs.length);
                        if (response.success === true) {
                          return response.data;
                        } else{
                          return undefined;
                        }                        
                      }),tap((data) => {
                        console.log(data);
                        //console.log(this.jobs.length + " - " + this.initialJobs.length);
                        this.initialJobs = data;
                        //console.log(this.jobs.length + " - " + this.initialJobs.length);
                      }));
    }    
    */
    return this.http.get(this.urlApi+'jobs')
                        .pipe(map((response: any) => {
                          //console.log(this.jobs.length + " - " + this.initialJobs.length);
                          if (response.success === true) {
                            return response.data;
                          } else{
                            return undefined;
                          }                        
                        }),tap((data) => {
                          //console.log(data);
                          //console.log(this.jobs.length + " - " + this.initialJobs.length);
                          this.initialJobs = data;
                          //console.log(this.jobs.length + " - " + this.initialJobs.length);
                        }));
  }

  addJob(jobData,token){
    jobData.id = Date.now();
    /*this.jobs = [jobData, ...this.jobs];
    //console.log('add jobs' + this.jobs.length + " - " + this.initialJobs.length);
    return this.jobsSubject.next(jobData);
    */


    //console.log(jobData);
    const requestOptions = this.athService.addAuthorizationHeader(token);
    return this.http.post(this.urlApi+'jobs', jobData, requestOptions)
                    .pipe(map((res) => {
                      //console.log('test passe ici');
                      //console.log(res);
                      this.jobsSubject.next(jobData);
                    }));
  }

  getJobByID(id){
    //console.log(this.urlApi+'jobs/'+id);
    return this.http.get(this.urlApi+'jobs/'+id)
                    .pipe(map((res) => {
                      //console.log('test passe ici');
                      //console.log(res);
                      return res;
                    }));
  }

  searchJob(criteria) {
    //console.log(criteria);
    return this.http.get(this.urlApi+'search/'+criteria.term+"/"+criteria.place,)
                    .pipe(map((res) => {
                      //console.log(res);
                      return res;
                    }),tap((data) => {
                      //console.log(data);
                      this.searchResultSubjet.next(data);

                    }));
  }

}
