import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {

  private jobDetail :any = null;
  private error :any = ''
  private errorMessage :string = '';

  constructor(private jobService :JobService, private activatedRoute :ActivatedRoute) { 

  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.jobService.getJobByID(id)
                    .subscribe(
                      (data) => {
                        console.log(data)
                        this.handleServerResponse(data)
                      },
                      (error) => {
                        this.handleError(error);
                      }
                    );
  }

  handleServerResponse(data :any) {
    if (data.success){
      this.jobDetail = data.data;
    }else{
      this.errorMessage = data.data
    }
  }

  handleError(error){
    console.log('handleError',error.message);
    this.error = error;
  }

}
