import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';
import { JobService } from '../services/job.service'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  private jobs = []
 
  constructor(private jobService: JobService) { 

  }

  ngOnInit() {
    this.jobService.getJobs()
                    .subscribe(
                      (data) => this.jobs = data,
                      (error) => {
                        console.log(error);
                      }
    );
    
    //this.jobService.getJobsSubject.subscribe
    this.jobService
        .jobsSubject
        .subscribe((data) => {
          this.jobs = [data, ...this.jobs];
          //console.log("class job list, service add this.jobs");
        },
        (error) => {
          console.log(error);
        })
  }

}
