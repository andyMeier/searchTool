﻿
export var facetJSON = [
  {"name": "Screen Size",
    "categorynames": ["under 12in", "12in - 12.9in", "13in - 13.9in", "14in - 14.9in", "15in - 15.9in", "over 16in"],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0,12.0], [12.0, 13.0], [13.0,14.0], [14.0,15.0], [15.0,16.0], [16.0, 30.0]],
    "values": [],
    "fieldname": "screenSize_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [[0], [1,2,3,4], [5]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Brand",
    "categorynames": ['Acer', 'Alienware', 'Apple', 'Dell', 'Google', 'HP', 'LG', 'Lenovo', 'MSI', 'Microsoft', 'Razer', 'Samsung', 'other'],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['acer', 'alienware', 'apple', 'dell', 'google', 'hp', 'lg', 'lenovo', 'msi', 'microsoft', 'razer', 'samsung', 'other'],
    "fieldname": "brand_filter",
    "activecategories": [false, false, false, false, false, false, false, false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": ["low reputation","reputable","high reputation"]},

  {"name": "Storage Size",
    "categorynames": ["under 255GB", "256GB - 499GB", "500GB - 999GB", "1TB", "over 1TB"],
    "categorycounts": [-1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 256], [256, 500], [500, 1000], [1000, 1001], [1001, 100000]],
    "values": [],
    "fieldname": "totalStorageCapacity_filter",
    "activecategories": [false, false, false, false, false],
    "mapping": [[0,1], [2,3], [4]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Weight",
    "categorynames": ["under 2 pounds", "2 - 3 pounds", "3 - 4 pounds", "4 - 5 pounds", "5 - 6 pounds", "6 - 7 pounds", "over 7 pounds"],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0, 2.0], [2.0, 3.0], [3.0, 4.0], [4.0, 5.0], [5.0, 6.0], [6.0, 7.0], [7.0, 100.0]],
    "values": [],
    "fieldname": "productWeight_filter",
    "activecategories": [false, false, false, false, false, false, false],
    "mapping": [[0,1],[2,3,4,5],[6]],
    "mappingnames": ["light","medium","heavy"]},

  {"name": "RAM Size",
    "categorynames": ["under 4GB", "6GB", "8GB", "12GB", "16GB", "over 16GB"],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 4], [6,8], [8, 12], [12,16], [16,17], [17, 500]],
    "values": [],
    "fieldname": "systemMemoryRam_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [[0,1], [2,3,4], [5]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Processor Cores",
    "categorynames": ["1", "2", "3", "4", "6", "over 6"],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 2], [2, 3], [3, 4], [4, 6], [6, 7], [7, 100]],
    "values": [],
    "fieldname": "processorCores_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": []},

  {"name": "Processor Speed",
    "categorynames": ["under 2", "2.0 - 2.9", "3.0 - 3.9", "4.0 - 4.9", "over 5.0"],
    "categorycounts": [-1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0, 2.0], [2.0, 3.0], [3.0, 4.0], [4.0, 5.0], [5.0, 10.0]],
    "values": [],
    "fieldname": "processorSpeedBase_filter",
    "activecategories": [false, false, false, false, false],
    "mapping": [],
    "mappingnames": []},

  {"name": "Price",
    "categorynames": ["under 200£", "200£ - 399£", "400£ - 599£", "600£ - 799£", "800£ - 999£", "1000£ - 1399£", "1400£ - 1999£", "over 2000£"],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 200], [200, 400], [400, 600], [600, 800], [800, 1000], [1000, 1400], [1400, 2000], [2000, 100000]],
    "values": [],
    "fieldname": "price_filter",
    "activecategories": [false, false, false, false, false, false, false, false],
    "mapping": [[0,1], [2,3], [4,5,6,7]],
    "mappingnames": ["cheap","average","expensive"]},

  {"name": "Battery Life",
    "categorynames": ["under 5h", "5h-7h", "8h-10h", "11h-15h", "over 15h"],
    "categorycounts": [-1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0, 5.0], [5.0, 8.0], [8.0, 11.0], [11.0, 16.0], [16.0, 100.0]],
    "values": [],
    "fieldname": "batteryLife_filter",
    "activecategories": [false, false, false, false, false],
    "mapping": [[0], [1], [2,3]],
    "mappingnames": ["short","medium","long"]},

  {"name": "Operating System",
    "categorynames": ['Windows 11', 'Windows 10', 'Windows 7', 'Mac OS X', 'Chrome OS', 'other'],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['windows 11', 'windows 10', 'windows 7', 'mac os x', 'chrome os', 'other'],
    "fieldname": "operatingSystem_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": []},

];


export var facetJSONvague = [

  {"name": "Screen Size",
    "categorynames": ['small: under 12in','medium: 12in-18in','large: over 16in'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['small','medium','large'],
    "fieldname": "screenSize_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0], [1,2], [3]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Brand",
    "categorynames": ['Acer', 'Alienware', 'Apple', 'Dell', 'Google', 'HP', 'LG', 'Lenovo', 'MSI', 'Microsoft', 'Razer', 'Samsung', 'other'],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['acer', 'alienware', 'apple', 'dell', 'google', 'hp', 'lg', 'lenovo', 'msi', 'microsoft', 'razer', 'samsung', 'other'],
    "fieldname": "brand_filter",
    "activecategories": [false, false, false, false, false, false, false, false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": ["low reputation","reputable","high reputation"]},

  {"name": "Storage Size",
    "categorynames": ['small: under 500GB','medium: 500GB-1024GB','large: over 1024GB'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['small','medium','large'],
    "fieldname": "totalStorageCapacity_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1], [2,3], [4]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Weight",
    "categorynames": ['light: under 3 pounds','medium: 3 - 7 pounds','heavy: over 7 pounds'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['light','medium','heavy'],
    "fieldname": "productWeight_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1],[2,3,4,5],[6]],
    "mappingnames": ["light","medium","heavy"]},

  {"name": "RAM Size",
    "categorynames": ['small: under 8GB','medium: 8GB-16GB','large: over 16GB'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['small','medium','large'],
    "fieldname": "systemMemoryRam_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1], [2,3,4], [5]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Processor Cores",
    "categorynames": ["few: under 4", "medium: 4-8", "many: over 8"],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['few','medium','many'],
    "fieldname": "processorCores_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [],
    "mappingnames": []},

  {"name": "Processor Speed",
    "categorynames": ["slow: under 3.0", "medium: 3.0-3.9", "fast: over 4.0"],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['slow','medium','fast'],
    "fieldname": "processorSpeedBase_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [],
    "mappingnames": []},

  {"name": "Price",
    "categorynames": ['low: under 400£','medium: 400£-800£','high: over 800£'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['low','medium','high'],
    "fieldname": "price_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1], [2,3], [4,5,6,7]],
    "mappingnames": ["low","average","high"]},

  {"name": "Battery Life",
    "categorynames": ['short: under 5h','medium: 5h-10h','long: over 11h'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['short','medium','long'],
    "fieldname": "batteryLife_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [],
    "mappingnames": ["short","medium","long"]},

  {"name": "Operating System",
    "categorynames": ['Windows 11', 'Windows 10', 'Windows 7', 'Mac OS X', 'Chrome OS', 'other'],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['windows 11', 'windows 10', 'windows 7', 'mac os x', 'chrome os', 'other'],
    "fieldname": "operatingSystem_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": []},

];




export var facetJSONEASY = [
  {"name": "Screen Size",
    "categorynames": ["under 12in", "12in - 12.9in", "13in - 13.9in", "14in - 14.9in", "15in - 15.9in", "over 16in"],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0,12.0], [12.0, 13.0], [13.0,14.0], [14.0,15.0], [15.0,16.0], [16.0, 30.0]],
    "values": [],
    "fieldname": "screenSize_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [[0], [1,2,3,4], [5]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Weight",
    "categorynames": ["under 2 pounds", "2 - 3 pounds", "3 - 4 pounds", "4 - 5 pounds", "5 - 6 pounds", "6 - 7 pounds", "over 7 pounds"],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0, 2.0], [2.0, 3.0], [3.0, 4.0], [4.0, 5.0], [5.0, 6.0], [6.0, 7.0], [7.0, 100.0]],
    "values": [],
    "fieldname": "productWeight_filter",
    "activecategories": [false, false, false, false, false, false, false],
    "mapping": [[0,1],[2,3,4,5],[6]],
    "mappingnames": ["light","medium","heavy"]},

  {"name": "Brand",
    "categorynames": ['Acer', 'Alienware', 'Apple', 'Dell', 'Google', 'HP', 'LG', 'Lenovo', 'MSI', 'Microsoft', 'Razer', 'Samsung', 'other'],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['acer', 'alienware', 'apple', 'dell', 'google', 'hp', 'lg', 'lenovo', 'msi', 'microsoft', 'razer', 'samsung', 'other'],
    "fieldname": "brand_filter",
    "activecategories": [false, false, false, false, false, false, false, false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": ["low reputation","reputable","high reputation"]},

  {"name": "Price",
    "categorynames": ["under 200£", "200£ - 399£", "400£ - 599£", "600£ - 799£", "800£ - 999£", "1000£ - 1399£", "1400£ - 1999£", "over 2000£"],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 200], [200, 400], [400, 600], [600, 800], [800, 1000], [1000, 1400], [1400, 2000], [2000, 100000]],
    "values": [],
    "fieldname": "price_filter",
    "activecategories": [false, false, false, false, false, false, false, false],
    "mapping": [[0,1], [2,3], [4,5,6,7]],
    "mappingnames": ["cheap","average","expensive"]},

  {"name": "RAM Size",
    "categorynames": ["under 4GB", "6GB", "8GB", "12GB", "16GB", "over 16GB"],
    "categorycounts": [-1, -1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 4], [6,8], [8, 12], [12,16], [16,17], [17, 500]],
    "values": [],
    "fieldname": "systemMemoryRam_filter",
    "activecategories": [false, false, false, false, false, false],
    "mapping": [[0,1], [2,3,4], [5]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Storage Size",
    "categorynames": ["under 255GB", "256GB - 499GB", "500GB - 999GB", "1TB", "over 1TB"],
    "categorycounts": [-1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0, 256], [256, 500], [500, 1000], [1000, 1001], [1001, 100000]],
    "values": [],
    "fieldname": "totalStorageCapacity_filter",
    "activecategories": [false, false, false, false, false],
    "mapping": [[0,1], [2,3], [4]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Battery Life",
    "categorynames": ["under 5h", "5h-7h", "8h-10h", "11h-15h", "over 15h"],
    "categorycounts": [-1, -1, -1, -1, -1],
    "type": "interval",
    "borders": [[0.0, 5.0], [5.0, 8.0], [8.0, 11.0], [11.0, 16.0], [16.0, 100.0]],
    "values": [],
    "fieldname": "batteryLife_filter",
    "activecategories": [false, false, false, false, false],
    "mapping": [[0], [1], [2,3]],
    "mappingnames": ["short","medium","long"]},

];


export var facetJSONvagueEASY = [

  {"name": "Screen Size",
    "categorynames": ['small: under 12in','medium: 12in-18in','large: over 16in'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['small','medium','large'],
    "fieldname": "screenSize_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0], [1,2], [3]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Weight",
    "categorynames": ['light: under 3 pounds','medium: 3 - 7 pounds','heavy: over 7 pounds'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['light','medium','heavy'],
    "fieldname": "productWeight_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1],[2,3,4,5],[6]],
    "mappingnames": ["light","medium","heavy"]},

  {"name": "Brand",
    "categorynames": ['Acer', 'Alienware', 'Apple', 'Dell', 'Google', 'HP', 'LG', 'Lenovo', 'MSI', 'Microsoft', 'Razer', 'Samsung', 'other'],
    "categorycounts": [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['acer', 'alienware', 'apple', 'dell', 'google', 'hp', 'lg', 'lenovo', 'msi', 'microsoft', 'razer', 'samsung', 'other'],
    "fieldname": "brand_filter",
    "activecategories": [false, false, false, false, false, false, false, false, false, false, false, false, false],
    "mapping": [],
    "mappingnames": ["low reputation","reputable","high reputation"]},

  {"name": "Price",
    "categorynames": ['low: under 400£','medium: 400£-800£','high: over 800£'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['low','medium','high'],
    "fieldname": "price_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1], [2,3], [4,5,6,7]],
    "mappingnames": ["low","average","high"]},

  {"name": "RAM Size",
    "categorynames": ['small: under 8GB','medium: 8GB-16GB','large: over 16GB'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['small','medium','large'],
    "fieldname": "systemMemoryRam_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1], [2,3,4], [5]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Storage Size",
    "categorynames": ['small: under 500GB','medium: 500GB-1024GB','large: over 1024GB'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['small','medium','large'],
    "fieldname": "totalStorageCapacity_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [[0,1], [2,3], [4]],
    "mappingnames": ["small","medium","large"]},

  {"name": "Battery Life",
    "categorynames": ['short: under 5h','medium: 5h-10h','long: over 11h'],
    "categorycounts": [-1, -1, -1],
    "type": "categorical",
    "borders": [],
    "values": ['short','medium','long'],
    "fieldname": "batteryLife_vagueFront",
    "activecategories": [false, false, false],
    "mapping": [],
    "mappingnames": ["short","medium","long"]},

];
