import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service'

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  private jobs = []

  constructor(private jobService: JobService) { }

  ngOnInit() {
    this.jobService.searchResultSubjet.subscribe(
        (data) => this.handleSearchResult(data),
        error => console.log(error)
    )
  }

  handleSearchResult(data) {
    //console.log(JSON.stringify(data));
    this.jobs = data.jobs;
  }

}
