import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParamForQuery } from 'app/model/search/paramForQuery';
import { SimpleQuery } from 'app/model/search/simpleQuery';
import { SearchService } from 'app/service/search.service';
import { Paper } from 'app/model/paper/paper';
import { saveAs } from 'file-saver';
import { PaperService } from 'app/service/paper.service';

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
              private searchService: SearchService,
              private paperService: PaperService) { 
    this.paramForQueries = [];
    const newParamForQuery = new ParamForQuery();
    this.paramForQueries.push(newParamForQuery);
  }

  ngOnInit() {

  }

  // toggleVisibility(e){
  //   this.marked= e.target.checked;
  // }

  // kupi(){
  // }


  // search() {
  //   //this.paramForQueries.push(this.newParamForQuery);
  //   console.log(this.paramForQueries);
  //   this.paramForQueries.forEach(paramForQuery => {
  //     if (paramForQuery.value.indexOf('"') !== -1) {
  //       paramForQuery.phraseQuery = true;
  //     } else {
  //       paramForQuery.phraseQuery = false;
  //     }

  //     if (paramForQuery.keys[0] ===  'Naziv časopisa') {
  //       paramForQuery.key = 'journal';
  //     } else if (paramForQuery.keys[0] ===  'Naslov rada') {
  //       paramForQuery.key = 'title';
  //     } else if (paramForQuery.keys[0] ===  'Ime i prezime autora') {
  //       paramForQuery.key = 'author';
  //     } else if (paramForQuery.keys[0] ===  'Ključni pojmovi') {
  //       paramForQuery.key = 'keyTerms';
  //     } else if (paramForQuery.keys[0] ===  'Naučne oblasti') {
  //       paramForQuery.key = 'scientificAreaForPaper';
  //     } else if (paramForQuery.keys[0] ===  'Sadržaj') {
  //       paramForQuery.key = 'text';
  //     }

  //     if (paramForQuery.paramTypes != null && paramForQuery.paramTypes.length > 0){
  //       paramForQuery.paramType = paramForQuery.paramTypes[0];
  //     }
    
  //   })
  //   this.simpleQuey = new SimpleQuery();
  //   this.simpleQuey.params = this.paramForQueries;
  //   this.simpleQuey.wildcardQuery = this.theCheckbox;
  //   console.log(this.simpleQuey);

  //   this.searchService.search(this.simpleQuey)
  //       .subscribe(res => {
  //         console.log(res);
  //         if (res != null) {
  //           this.papers = res.content;
  //         } else {
  //           this.papers = [];
  //         }
  //       });


  // }



  // download(id: number, title: string){
  //   this.paperService.download(id).subscribe(
  //     (res: any) => {
  //       console.log(res)
  //       var filename = title +'.pdf';
  //       saveAs(res, filename);
  //     },
  //     (error: any) => {
  //       alert('Greska!')
  //     }
  //   )
  // }

}
