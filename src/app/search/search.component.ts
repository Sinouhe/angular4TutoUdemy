import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private jobs = []

  constructor(private jobService: JobService) { }

  ngOnInit() {
  }

  searchJobs(searchData){
    this.jobService.searchJob(searchData)
                  .subscribe(
                    (data: any) => this.jobs = data,
                    error => console.log(error)
                  );
  }

}
