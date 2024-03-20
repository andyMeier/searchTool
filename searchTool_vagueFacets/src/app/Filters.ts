export class filterObject {
  filterfield: string;
  filtertype: string;
  values: Array<string | number>;
  negation: boolean;

  constructor (filterfield: string = "", 
               filtertype: string = "", 
               values: Array<string | number> =[], 
               negation: boolean= false) {
    this.filterfield = filterfield;
    this.filtertype = filtertype;
    this.values = values;
    this.negation = negation;
  }
  
  isEmpty(): boolean {
    if (this.values.length <= 0) {
      return true
    }
    return false
  }

  isInterval(): boolean {
    if (this.filtertype === "interval") {
      return true
    }
    return false
  }

  isCategorical(): boolean {
    if (this.filtertype === "categorical") {
      return true
    }
    return false
  }

  toFlaskFormat() {
    return {
      "filterfield": this.filterfield,
      "filtertype": this.filtertype,
      "values": this.values,
      "negation": this.negation,
    }
  }

}