import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamForQuery } from 'app/model/search/paramForQuery';
import { SimpleQuery } from 'app/model/search/simpleQuery';
import { SearchService } from 'app/service/search.service';
import { Paper } from 'app/model/paper/paper';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  operators = ['AND', 'OR'];
  keys = ['Naziv časopisa', 'Naslov rada', 'Ime i prezime autora', 'Ključni pojmovi', 'Sadržaj', 'Naučne oblasti'];
  paramForQueries: ParamForQuery[];
  simpleQuey: SimpleQuery;
  papers: Paper[] = [];
  theCheckbox = false;
  marked = false;
  //newParamForQuery: ParamForQuery;
  dropdownSettings = {
    singleSelection: true,
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    allowSearchFilter: true,
    closeDropDownOnSelection: true
  };

  constructor(
              private router: Router,
              private searchService: SearchService
              ) { 
    this.paramForQueries = [];
    const newParamForQuery = new ParamForQuery();
    this.paramForQueries.push(newParamForQuery);
  }

  ngOnInit() {

  }

  // toggleVisibility(e){
  //   this.marked= e.target.checked;
  // }


}
