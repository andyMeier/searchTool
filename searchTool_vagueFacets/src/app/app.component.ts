import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {facetJSON, facetJSONvague, facetJSONEASY, facetJSONvagueEASY} from './Facets';
import {filterObject} from './Filters';
import {indexObject} from './indexObject';
import {HttpClient} from '@angular/common/http';
declare var $: any;

export class Facet {
  name: string;
  categorynames: Array<string>;
  categorycounts: Array<number>;
  type = 'prototype';
  borders: Array<[number, number]>;
  values: Array<string>;
  fieldname: string;
  activecategories: Array<boolean>;
  mapping: Array<[number]>;
  mappingnames: Array<string>;
}

export class Log {
  ID = '';
  setting = -1;
  sosciCaseToken = 'xxxxx';
  clicks: Array<any> = [];
  finalresults: any = {};
  finalfacets: Array<any> = [];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  constructor(public http: HttpClient, private router: ActivatedRoute) {
    const queryString = window.location.search;
    console.log('WINDOWS', queryString);
    const urlParams = new URLSearchParams(queryString);
    console.log('caseToken', urlParams.get('caseToken'));
    this.sosciCaseToken = urlParams.get('caseToken');
    console.log('setting', urlParams.get('setting'));
    this.setting = Number.parseInt(urlParams.get('setting'), 10) || 1;
    console.log('facetOrdering', urlParams.get('facetOrdering'));
    if (urlParams.get('facetOrdering')) {
      this.facetOrdering = urlParams.get('facetOrdering');
    } else {
      this.facetOrdering = 'average';
    }
  }

  setting: number = 1;
  DATASET: string = 'amazon';
  TOPK: number = 10;
  deploy: boolean = true;
  serverDown: boolean = false;
  waitingOnServer: boolean = false;
  categoryColors: Array<string> = ['#016c59', '#02818a', '#3690c0']; //['#2c7fb8', '#41b6c4', '#8cc7a0']; //['#abd9e9','#ffffbf','#fdae61'];

  logId: string = "1111";
  logs = new Log();
  logTrials: number = 0;
  loggingInProcess: boolean = false;
  sosciCaseToken: string = ''; // needed for soSci redirect

  results: Array<indexObject> = [];
  resultsNumHits: number = 0;
  resultsFitness: number = -1;
  resultsSatisfaction: number = -1;
  numFilterSelect: number = 0;
  numFilterDeselect: number = 0;
  timestampStart: any;
  timestampEnd: any
  searchDurationInSecs: number = 0;
  finalLaptop: string = '';

  modalLaptop: indexObject;
  modalOpen: boolean = false;
  sortbyLabel: string = 'customer rating (high to low)';
  sortByField: string = 'ratingAvg_filter';
  sortByOrder: string = 'descending';
  searchFinished = false;
  searchStarted = false;

  facets: Array<Facet> = [];
  facetsvague: Array<Facet> = [];
  flaskfilters: Array<filterObject> = [];
  flaskUrlFilter: string = '';
  flaskUrlId: string = '';
  flaskUrlLogs: string = '';
  facetOrdering: string = 'average';

  // ----------------------------------------------------- FLASK

  getLogId(): void {
    /**
     * Request user ID from server
     * ID will be used to send log data to server, will be rejected if ID is not accepted by server.
     */
    console.log(this.flaskUrlId);
    this.http.get<any>(this.flaskUrlId).subscribe({
      next: rData => {
        this.serverDown = false;
        this.logId = JSON.stringify(rData);
        console.log('getid(): SUCCESS got log id:', this.logId);
        this.logs.ID = this.logId;
      },
      error: error => {
        console.error('getid(): ERROR received error response from flask:', error);
        this.serverDown = true;
      }
    });
  }

  logLogs(): void {
    /**
     * Sends log data to server
     */
    this.loggingInProcess = true;
    this.http.post<any>(this.flaskUrlLogs + '?client_id=' + this.sosciCaseToken, this.logs).subscribe({
      next: rData => {
        this.serverDown = false;
        this.loggingInProcess = false;
        console.log('logLogs(): SUCCESS log data accepted by server');
        this.redirect();
      },
      error: error => {
        console.error('logLogs(): ERROR received error response from flask:', error);
        this.logTrials += 1;
        if (this.logTrials <= 3) {
          this.logLogs();
        } else {
          this.redirect();
        }
      }
    });
  }

  logClick(_action: string) {
    /**
     * Adds a log entry for a click action
     */
    const currTime = new Date(Date.now());
    this.logs.clicks.push({'TIMESTAMP': currTime, 'ACTION': _action});
    // console.log('updated logs:', this.logs);
  }

  logResultRefresh(_numhits: number) {
    /**
     * Adds a log entry for refreshing results list
     */
    const currTime = new Date(Date.now());
    this.logs.clicks.push({'TIMESTAMP': currTime, 'ACTION': 'UPDATED RESULTS - ' + _numhits.toString() + ' results shown'});
    // console.log('updated logs:', this.logs);
  }

  updateFlaskFilters(_ff: Array<Facet>): void {
    /**
     * retrieves facet selection
     * and translates into a format that the server can read
     */
    console.log('start retrieving flask filters:', _ff);
    this.flaskfilters = [];
    for (const f of _ff) {
      if (f.activecategories.some((x) => !!x)) {
        const addfiltervalues = [];
        for (const i in f.activecategories) {
          if (f.activecategories[i]) {
            if (f.type == 'interval') {
              addfiltervalues.push(f.borders[i]);
            } else if (f.type == 'categorical') {
              addfiltervalues.push(f.values[i]);
            }
          }
        }
        const addfilter = new filterObject(f.fieldname, f.type, addfiltervalues, false);
        this.flaskfilters.push(addfilter);
        console.log('new filter added:', addfilter);
      }
    }
  }

  requestFilteredResults(): void {
    /**
     * Sends a request to the flask database service,
     * asking for all products that fit the filter criteria specified in this.flaskfilters
     */
    if (this.searchFinished) {
      return; // no more requests once the user has clicked on "finish search" button
    }
    console.log('requestFilteredResults(): request results for filters:', this.flaskfilters);
    // get current facets
    const ff = [];
    if (this.facetOrdering === 'easy') {
      if (this.setting === 2) {
        facetJSONvagueEASY.forEach(element => {
          ff.push(<Facet>element);
        });
      } else {
        facetJSONEASY.forEach(element => {
          ff.push(<Facet>element);
        });
      }
    } else {
      if (this.setting === 2) {
        facetJSONvague.forEach(element => {
          ff.push(<Facet>element);
        });
      } else {
        facetJSON.forEach(element => {
          ff.push(<Facet>element);
        });
      }
    }
    // send request to server
    this.waitingOnServer = true;
    this.http.post<any>(this.flaskUrlFilter, {
      'dataset': this.DATASET,
      'filter': this.flaskfilters,
      'facets': ff,
      'sort_by': this.sortByField,
      'sort_by_order': this.sortByOrder,
      'top_k': this.TOPK
    }).subscribe({
      next: rData => {
        this.waitingOnServer = false;
        this.serverDown = false;
        console.log('Flask response:', rData);
        // console.log('Flask hits:', rData['hits']);

        this.results = rData['hits'];
        this.resultsNumHits = rData['num_hits'];
        this.logResultRefresh(this.resultsNumHits);

        // extract and transfer facet counts
        if (this.setting === 2) {
          for (const _i in this.facetsvague) {
            for (const _ii in this.facetsvague[_i]['categorycounts']) {
              this.facetsvague[_i]['categorycounts'][_ii] = rData['facets'][_i]['categorycounts'][_ii];//rData['facets'][this.facetsvague[_i]['name']][_ii];
              //console.log("transferred categorycounts:", this.facetsvague[_i]['name'], this.facetsvague[_i]['categorynames'][_ii], this.facetsvague[_i]['categorycounts'][_ii]);
            }
          }
          // console.log('updated facet JSON', this.facetsvague);
        } else {
          for (const _i in this.facets) {
            for (const _ii in this.facets[_i]['categorycounts']) {
              this.facets[_i]['categorycounts'][_ii] = rData['facets'][_i]['categorycounts'][_ii];
            }
          }
          // console.log('updated facet JSON', this.facets);
        }
      },
      error: error => {
        this.waitingOnServer = false;
        this.serverDown = true;
      }
    });
  }


  // ------------------------------------------------------ APP
  ngOnInit(): void {

    $(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
    })

    // adapt to current context: productive system (deploy) or experimental (local)
    if (this.deploy) {
      this.flaskUrlFilter = 'https://multiweb.gesis.org/vacos2/filter';
      this.flaskUrlId = 'https://multiweb.gesis.org/vacos2/id';
      this.flaskUrlLogs = 'https://multiweb.gesis.org/vacos2/log';
    } else {
      this.flaskUrlFilter = 'http://127.0.0.1:3334/filter';
      this.flaskUrlId = 'http://127.0.0.1:3334/id';
      this.flaskUrlLogs = 'http://127.0.0.1:3334/log';
    }

    // Reset variables
    this.searchStarted = false;
    this.searchFinished = false;
    this.logs = new Log();
    this.results = [];
    this.resultsFitness = -1;
    this.resultsSatisfaction = -1;
    this.serverDown = false;
    this.waitingOnServer = false;

    // Request log ID
    //this.getLogId();

    // Reset facets
    this.resetFacets(false, true);
  }

  startSearch() {
    this.searchStarted = true;
    const currTime = new Date(Date.now());
    this.logs.clicks.push({'TIMESTAMP': currTime, 'ACTION': 'STARTED SEARCH'});
    this.timestampStart = currTime;

  }

  resetFacets(clicked: boolean, resultUpdate: boolean) {
    if (clicked) {
      this.logClick('RESET FACETS');
    }
    // Load facets: precise (setting 1) and vague (setting 2)
    if (this.facetOrdering === 'easy') { // EASY facets, based on preferences of LOW DK people
      this.facets = [];
      facetJSONEASY.forEach(element => {
        this.facets.push(<Facet>element);
      });
      for (const _i in this.facets) {
        for (const _ii in this.facets[_i].activecategories) {
          this.facets[_i].activecategories[_ii] = false;
        }
      }
      this.facetsvague = [];
      facetJSONvagueEASY.forEach(element => {
        this.facetsvague.push(<Facet>element);
      });
      for (const _i in this.facetsvague) {
        for (const _ii in this.facetsvague[_i].activecategories) {
          this.facetsvague[_i].activecategories[_ii] = false;
        }
      }
    } else { // AVERAGE facets, based on preferences of ALL people
      this.facets = [];
      facetJSON.forEach(element => {
        this.facets.push(<Facet>element);
      });
      for (const _i in this.facets) {
        for (const _ii in this.facets[_i].activecategories) {
          this.facets[_i].activecategories[_ii] = false;
        }
      }
      this.facetsvague = [];
      facetJSONvague.forEach(element => {
        this.facetsvague.push(<Facet>element);
      });
      for (const _i in this.facetsvague) {
        for (const _ii in this.facetsvague[_i].activecategories) {
          this.facetsvague[_i].activecategories[_ii] = false;
        }
      }
    }
    console.log('facets loaded:', this.facets, this.facetsvague);

    // reset result list
    this.updateFlaskFilters([]);
    if (resultUpdate) {
      this.requestFilteredResults();
    }
  }

  clickfacetoption(_i: number, _ii: number) {
    this.TOPK = 10;
    if (this.setting === 2) {
      this.facetsvague[_i].activecategories[_ii] = !this.facetsvague[_i].activecategories[_ii];
      this.updateFlaskFilters(this.facetsvague);
      // LOGGING
      if (this.facetsvague[_i].activecategories[_ii]) {
        this.logClick('SELECTED FACET on facet ' + this.facetsvague[_i].name + ' ' + this.facetsvague[_i].categorynames[_ii]);
        this.numFilterSelect += 1;
      } else {
        this.logClick('DESELECTED FACET on facet ' + this.facetsvague[_i].name + ' ' + this.facetsvague[_i].categorynames[_ii]);
        this.numFilterDeselect += 1;
      }
    } else {
      this.facets[_i].activecategories[_ii] = !this.facets[_i].activecategories[_ii];
      this.updateFlaskFilters(this.facets);
      // LOGGING
      if (this.facets[_i].activecategories[_ii]) {
        this.logClick('SELECTED FACET on facet ' + this.facets[_i].name + ' ' + this.facets[_i].categorynames[_ii]);
        this.numFilterSelect += 1;
      } else {
        this.logClick('DESELECTED FACET on facet ' + this.facets[_i].name + ' ' + this.facets[_i].categorynames[_ii]);
        this.numFilterDeselect += 1;
      }
    }
    this.requestFilteredResults();
  }

  scrollTop(): void {
    window.scrollTo(0, 0);
  }

  extendResultList() {
    this.TOPK += 10;
    this.requestFilteredResults();
    this.logClick('EXTEND RESULT LIST to show top ' + this.TOPK.toString());
  }

  setModalLaptop(r) {
    if (!this.modalOpen) {
      this.modalLaptop = r;
      // console.log('set laptop in modal', this.modalLaptop);
      this.openModal();
    }
  }

  closeModal(_position: string) {
    this.modalOpen = false;
    // console.log('CLOSE MODAL');
    this.logClick('CLOSE ' + _position + ' MODAL on laptop ' + this.modalLaptop.sku_original);
  }

  openModal() {
    this.modalOpen = true;
    // console.log('OPEN MODAL');
    this.logClick('OPEN MODAL on laptop ' + this.modalLaptop.sku_original);
  }

  setSetting(_i: number): void {
    this.setting = _i;
    this.ngOnInit();
  }

  finishSearch(_sku) {
    this.searchFinished = true;
    this.logClick('FINISHED SEARCH with laptop ' + _sku);
    this.finalLaptop = _sku;
    const currTime = new Date(Date.now());
    this.timestampEnd = currTime;
    this.searchDurationInSecs = Math.round(Math.abs(this.timestampStart - this.timestampEnd) / 1000);
  }

  submit() {
    const resultList = [];
    this.results.forEach(element => {
      resultList.push(element.sku_original);
    });
    this.logs.finalresults = {'laptops': resultList, 'final laptop': this.finalLaptop, 'fitting needs': this.resultsFitness, 'satisfaction': this.resultsSatisfaction, 'duration': this.searchDurationInSecs, 'selects': this.numFilterSelect, 'deselects': this.numFilterDeselect};
    this.logs.setting = this.setting;
    this.logs.sosciCaseToken = this.sosciCaseToken;
    if (this.setting === 2) {
      this.logs.finalfacets = this.facetsvague;
    } else {
      this.logs.finalfacets = this.facets;
    }
    //console.log(this.logs);
    this.logLogs();
  }

  redirect() {
    window.location.href = 'https://www.soscisurvey.de/vage2022/?q=qnr3&i=' + this.sosciCaseToken + '&iid=' + this.logId + '&fitness=' + this.resultsFitness + '&satisfaction=' + this.resultsSatisfaction + '&selects=' + this.numFilterSelect + '&deselects=' + this.numFilterDeselect + '&duration=' + this.searchDurationInSecs;
  }

  backToSearch() {
    this.resultsFitness = -1;
    this.resultsSatisfaction = -1;
    this.searchFinished = false;
    this.logClick('GO BACK TO SEARCH');
  }

  setFitness(_i) {
    this.resultsFitness = _i;
  }

  setSatisfaction(_i) {
    this.resultsSatisfaction = _i;
  }

  updateSortBy(_sortByLabel: string) {
    this.logClick('ADJUST SORTING to ' + _sortByLabel);
    this.sortbyLabel = _sortByLabel;
    switch (_sortByLabel) {
      case 'customer rating (high to low)':
        this.sortByField = 'ratingAvg_filter';
        this.sortByOrder = 'descending';
        break;
      case 'price (low to high)':
        this.sortByField = 'price_filter';
        this.sortByOrder = 'ascending';
        break;
      case 'screen size (high to low)':
        this.sortByField = 'screenSize_filter';
        this.sortByOrder = 'descending';
        break;
      case 'storage size (high to low)':
        this.sortByField = 'totalStorageCapacity_filter';
        this.sortByOrder = 'descending';
        break;
      case 'RAM size (high to low)':
        this.sortByField = 'systemMemoryRam_filter';
        this.sortByOrder = 'descending';
        break;
      case 'weight (light to heavy)':
        this.sortByField = 'productWeight_filter';
        this.sortByOrder = 'ascending';
        break;
      case 'battery life (long to short)':
        this.sortByField = 'batteryLife_filter';
        this.sortByOrder = 'descending';
        break;
      default:
        this.sortByField = 'ratingAvg_filter';
        this.sortByOrder = 'descending';
        break;
    }
    this.requestFilteredResults();
  }

}
