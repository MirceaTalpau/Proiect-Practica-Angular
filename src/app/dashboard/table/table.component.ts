import { TableDataService } from './../../_core/services/table-data-service/table-data.service';
import { Component, Input, OnInit } from '@angular/core';

import { DataItem } from './../../_core/models/TableInterface';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  listOfData: DataItem[];

  listOfColumn = [
    {
      title: 'Title',
      compare: (a: DataItem, b: DataItem) => a.title.localeCompare(b.title),
      priority: false
    },
    
    {
      title: 'Director',
      compare: (a: DataItem, b: DataItem) => a.director.localeCompare(b.director),
      priority: 1
    },

    {
      title: 'Length',
      compare: (a: DataItem, b: DataItem) => a.length - b.length,
      priority: 2
    },
    
    {
      title:'Description',
      compare: (a: DataItem, b: DataItem) => a.description.localeCompare(b.description),
      priority: 1
    },

    {
      title: 'Rating',
      compare: (a: DataItem, b: DataItem) => a.rating - b.rating,
      priority: 3
    }
    
    
  ];

  getMovies(){
    this.tableDataService.getMovies().subscribe((res) => {
      this.listOfData = res;
      console.log(this.listOfData);
  });
  }

   deleteMovie(id:number){
    this.tableDataService.deleteMovie(id).subscribe();
    this.getMovies();
   }

  constructor(private tableDataService:TableDataService) { 
   
  }

  ngOnInit(): void {
    this.tableDataService.getMovies()
      .subscribe(data => this.listOfData = data);
  }

}
