import { embed } from 'gosling.js';

console.log("help")

// var spec = {
//     "arrangement": "vertical",
//     "views": [
//       {
//         "xDomain": {"chromosome": "chr13", "interval": [31500000, 33150000]},
//         "centerRadius": 0.1,
//         "layout": "linear",
//         "spacing": 0,
//         "alignment": "stack",
//         "tracks": [
//           {
//             "alignment": "overlay",
//             "title": "HiGlass",
//             "data": {
//               "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",
//               "type": "beddb",
//               "genomicFields": [
//                 {"index": 1, "name": "start"},
//                 {"index": 2, "name": "end"}
//               ],
//               "valueFields": [
//                 {"index": 5, "name": "strand", "type": "nominal"},
//                 {"index": 3, "name": "name", "type": "nominal"}
//               ],
//               "exonIntervalFields": [
//                 {"index": 12, "name": "start"},
//                 {"index": 13, "name": "end"}
//               ]
//             },
//             "tracks": [
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["+"]}
//                 ],
//                 "mark": "triangleRight",
//                 "x": {"field": "end", "type": "genomic", "axis": "top"},
//                 "size": {"value": 15}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]}
//                 ],
//                 "mark": "text",
//                 "text": {"field": "name", "type": "nominal"},
//                 "x": {"field": "start", "type": "genomic"},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "style": {"dy": -15}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["-"]}
//                 ],
//                 "mark": "triangleLeft",
//                 "x": {"field": "start", "type": "genomic"},
//                 "size": {"value": 15},
//                 "style": {"align": "right"}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["exon"]}
//                 ],
//                 "mark": "rect",
//                 "x": {"field": "start", "type": "genomic"},
//                 "size": {"value": 15},
//                 "xe": {"field": "end", "type": "genomic"}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["+"]}
//                 ],
//                 "mark": "rule",
//                 "x": {"field": "start", "type": "genomic"},
//                 "strokeWidth": {"value": 3},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "style": {"linePattern": {"type": "triangleRight", "size": 5}}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["-"]}
//                 ],
//                 "mark": "rule",
//                 "x": {"field": "start", "type": "genomic"},
//                 "strokeWidth": {"value": 3},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "style": {"linePattern": {"type": "triangleLeft", "size": 5}}
//               }
//             ],
//             "row": {"field": "strand", "type": "nominal", "domain": ["+", "-"]},
//             "color": {
//               "field": "strand",
//               "type": "nominal",
//               "domain": ["+", "-"],
//               "range": ["#7585FF", "#FF8A85"]
//             },
//             "visibility": [
//               {
//                 "operation": "less-than",
//                 "measure": "width",
//                 "threshold": "|xe-x|",
//                 "transitionPadding": 10,
//                 "target": "mark"
//               }
//             ],
//             "opacity": {"value": 0.8},
//             "width": 350,
//             "height": 100
//           },
//           {
//             "alignment": "overlay",
//             "data": {
//               "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=clinvar-beddb",
//               "type": "beddb",
//               "genomicFields": [
//                 {"index": 1, "name": "start"},
//                 {"index": 2, "name": "end"}
//               ],
//               "valueFields": [
//                 {"index": 7, "name": "significance", "type": "nominal"}
//               ]
//             },
//             "tracks": [
//               {
//                 "mark": "bar",
//                 "x": {"field": "start", "type": "genomic"},
//                 "y": {
//                   "field": "significance",
//                   "type": "nominal",
//                   "domain": [
//                     "Pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Likely_pathogenic",
//                     "Uncertain_significance",
//                     "Likely_benign",
//                     "Benign/Likely_benign",
//                     "Benign"
//                   ],
//                   "baseline": "Uncertain_significance",
//                   "range": [150, 20]
//                 },
//                 "size": {"value": 1},
//                 "color": {"value": "lightgray"},
//                 "stroke": {"value": "lightgray"},
//                 "strokeWidth": {"value": 1},
//                 "opacity": {"value": 0.3},
//                 "visibility": [
//                   {
//                     "measure": "zoomLevel",
//                     "target": "mark",
//                     "threshold": 100000,
//                     "operation": "LT",
//                     "transitionPadding": 100000
//                   }
//                 ]
//               },
//               {
//                 "mark": "point",
//                 "x": {"field": "start", "type": "genomic"},
//                 "row": {
//                   "field": "significance",
//                   "type": "nominal",
//                   "domain": [
//                     "Pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Likely_pathogenic",
//                     "Uncertain_significance",
//                     "Likely_benign",
//                     "Benign/Likely_benign",
//                     "Benign"
//                   ]
//                 },
//                 "size": {"value": 7},
//                 "opacity": {"value": 0.8},
//                 "visibility": [
//                   {
//                     "measure": "zoomLevel",
//                     "target": "mark",
//                     "threshold": 1000000,
//                     "operation": "LT",
//                     "transitionPadding": 1000000
//                   }
//                 ]
//               },
//               {
//                 "data": {
//                   "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=clinvar-multivec",
//                   "type": "multivec",
//                   "row": "significance",
//                   "column": "position",
//                   "value": "count",
//                   "categories": [
//                     "Benign",
//                     "Benign/Likely_benign",
//                     "Likely_benign",
//                     "Uncertain_significance",
//                     "Likely_pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Pathogenic"
//                   ],
//                   "binSize": 4
//                 },
//                 "mark": "bar",
//                 "x": {"field": "start", "type": "genomic"},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "y": {"field": "count", "type": "quantitative", "axis": "none"},
//                 "color": {
//                   "field": "significance",
//                   "type": "nominal",
//                   "domain": [
//                     "Pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Likely_pathogenic",
//                     "Uncertain_significance",
//                     "Likely_benign",
//                     "Benign/Likely_benign",
//                     "Benign"
//                   ],
//                   "range": [
//                     "#CB3B8C",
//                     "#CB71A3",
//                     "#CB96B3",
//                     "gray",
//                     "#029F73",
//                     "#5A9F8C",
//                     "#5A9F8C"
//                   ],
//                   "legend": true
//                 },
//                 "visibility": [
//                   {
//                     "measure": "zoomLevel",
//                     "target": "mark",
//                     "threshold": 500000,
//                     "operation": "GT",
//                     "transitionPadding": 500000
//                   }
//                 ]
//               }
//             ],
//             "color": {
//               "field": "significance",
//               "type": "nominal",
//               "domain": [
//                 "Pathogenic",
//                 "Pathogenic/Likely_pathogenic",
//                 "Likely_pathogenic",
//                 "Uncertain_significance",
//                 "Likely_benign",
//                 "Benign/Likely_benign",
//                 "Benign"
//               ],
//               "range": [
//                 "#CB3B8C",
//                 "#CB71A3",
//                 "#CB96B3",
//                 "gray",
//                 "#029F73",
//                 "#5A9F8C",
//                 "#5A9F8C"
//               ]
//             },
//             "width": 800,
//             "height": 150
//           }
//         ]
//       },
//       {
//         "xDomain": {"chromosome": "chr13", "interval": [32000000, 32700000]},
//         "centerRadius": 0.1,
//         "layout": "linear",
//         "spacing": 0,
//         "alignment": "stack",
//         "tracks": [
//           {
//             "alignment": "overlay",
//             "title": "HiGlass",
//             "data": {
//               "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",
//               "type": "beddb",
//               "genomicFields": [
//                 {"index": 1, "name": "start"},
//                 {"index": 2, "name": "end"}
//               ],
//               "valueFields": [
//                 {"index": 5, "name": "strand", "type": "nominal"},
//                 {"index": 3, "name": "name", "type": "nominal"}
//               ],
//               "exonIntervalFields": [
//                 {"index": 12, "name": "start"},
//                 {"index": 13, "name": "end"}
//               ]
//             },
//             "tracks": [
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["+"]}
//                 ],
//                 "mark": "triangleRight",
//                 "x": {"field": "end", "type": "genomic", "axis": "top"},
//                 "size": {"value": 15}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]}
//                 ],
//                 "mark": "text",
//                 "text": {"field": "name", "type": "nominal"},
//                 "x": {"field": "start", "type": "genomic"},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "style": {"dy": -15}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["-"]}
//                 ],
//                 "mark": "triangleLeft",
//                 "x": {"field": "start", "type": "genomic"},
//                 "size": {"value": 15},
//                 "style": {"align": "right"}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["exon"]}
//                 ],
//                 "mark": "rect",
//                 "x": {"field": "start", "type": "genomic"},
//                 "size": {"value": 15},
//                 "xe": {"field": "end", "type": "genomic"}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["+"]}
//                 ],
//                 "mark": "rule",
//                 "x": {"field": "start", "type": "genomic"},
//                 "strokeWidth": {"value": 3},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "style": {"linePattern": {"type": "triangleRight", "size": 5}}
//               },
//               {
//                 "dataTransform": [
//                   {"type": "filter", "field": "type", "oneOf": ["gene"]},
//                   {"type": "filter", "field": "strand", "oneOf": ["-"]}
//                 ],
//                 "mark": "rule",
//                 "x": {"field": "start", "type": "genomic"},
//                 "strokeWidth": {"value": 3},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "style": {"linePattern": {"type": "triangleLeft", "size": 5}}
//               }
//             ],
//             "row": {"field": "strand", "type": "nominal", "domain": ["+", "-"]},
//             "color": {
//               "field": "strand",
//               "type": "nominal",
//               "domain": ["+", "-"],
//               "range": ["#7585FF", "#FF8A85"]
//             },
//             "visibility": [
//               {
//                 "operation": "less-than",
//                 "measure": "width",
//                 "threshold": "|xe-x|",
//                 "transitionPadding": 10,
//                 "target": "mark"
//               }
//             ],
//             "opacity": {"value": 0.8},
//             "width": 350,
//             "height": 100
//           },
//           {
//             "alignment": "overlay",
//             "data": {
//               "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=clinvar-beddb",
//               "type": "beddb",
//               "genomicFields": [
//                 {"index": 1, "name": "start"},
//                 {"index": 2, "name": "end"}
//               ],
//               "valueFields": [
//                 {"index": 7, "name": "significance", "type": "nominal"}
//               ]
//             },
//             "tracks": [
//               {
//                 "mark": "bar",
//                 "x": {"field": "start", "type": "genomic"},
//                 "y": {
//                   "field": "significance",
//                   "type": "nominal",
//                   "domain": [
//                     "Pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Likely_pathogenic",
//                     "Uncertain_significance",
//                     "Likely_benign",
//                     "Benign/Likely_benign",
//                     "Benign"
//                   ],
//                   "baseline": "Uncertain_significance",
//                   "range": [150, 20]
//                 },
//                 "size": {"value": 1},
//                 "color": {"value": "lightgray"},
//                 "stroke": {"value": "lightgray"},
//                 "strokeWidth": {"value": 1},
//                 "opacity": {"value": 0.3},
//                 "visibility": [
//                   {
//                     "measure": "zoomLevel",
//                     "target": "mark",
//                     "threshold": 100000,
//                     "operation": "LT",
//                     "transitionPadding": 100000
//                   }
//                 ]
//               },
//               {
//                 "mark": "point",
//                 "x": {"field": "start", "type": "genomic"},
//                 "row": {
//                   "field": "significance",
//                   "type": "nominal",
//                   "domain": [
//                     "Pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Likely_pathogenic",
//                     "Uncertain_significance",
//                     "Likely_benign",
//                     "Benign/Likely_benign",
//                     "Benign"
//                   ]
//                 },
//                 "size": {"value": 7},
//                 "opacity": {"value": 0.8},
//                 "visibility": [
//                   {
//                     "measure": "zoomLevel",
//                     "target": "mark",
//                     "threshold": 1000000,
//                     "operation": "LT",
//                     "transitionPadding": 1000000
//                   }
//                 ]
//               },
//               {
//                 "data": {
//                   "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=clinvar-multivec",
//                   "type": "multivec",
//                   "row": "significance",
//                   "column": "position",
//                   "value": "count",
//                   "categories": [
//                     "Benign",
//                     "Benign/Likely_benign",
//                     "Likely_benign",
//                     "Uncertain_significance",
//                     "Likely_pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Pathogenic"
//                   ],
//                   "binSize": 4
//                 },
//                 "mark": "bar",
//                 "x": {"field": "start", "type": "genomic"},
//                 "xe": {"field": "end", "type": "genomic"},
//                 "y": {"field": "count", "type": "quantitative", "axis": "none"},
//                 "color": {
//                   "field": "significance",
//                   "type": "nominal",
//                   "domain": [
//                     "Pathogenic",
//                     "Pathogenic/Likely_pathogenic",
//                     "Likely_pathogenic",
//                     "Uncertain_significance",
//                     "Likely_benign",
//                     "Benign/Likely_benign",
//                     "Benign"
//                   ],
//                   "range": [
//                     "#CB3B8C",
//                     "#CB71A3",
//                     "#CB96B3",
//                     "gray",
//                     "#029F73",
//                     "#5A9F8C",
//                     "#5A9F8C"
//                   ],
//                   "legend": true
//                 },
//                 "visibility": [
//                   {
//                     "measure": "zoomLevel",
//                     "target": "mark",
//                     "threshold": 500000,
//                     "operation": "GT",
//                     "transitionPadding": 500000
//                   }
//                 ]
//               }
//             ],
//             "color": {
//               "field": "significance",
//               "type": "nominal",
//               "domain": [
//                 "Pathogenic",
//                 "Pathogenic/Likely_pathogenic",
//                 "Likely_pathogenic",
//                 "Uncertain_significance",
//                 "Likely_benign",
//                 "Benign/Likely_benign",
//                 "Benign"
//               ],
//               "range": [
//                 "#CB3B8C",
//                 "#CB71A3",
//                 "#CB96B3",
//                 "gray",
//                 "#029F73",
//                 "#5A9F8C",
//                 "#5A9F8C"
//               ]
//             },
//             "width": 800,
//             "height": 150
//           }
//         ]
//       }
//     ]
//   } 
  
// var spec = {
//     "title": "Gremlin (O'Brien et al. 2010)",
//     "style": {"linkStyle": "elliptical"},
//     "views": [
//       {
//         "linkingId": "view1",
//         "xDomain": {"chromosome": "chr5", "interval": [0, 80000000]},
//         "tracks": [
//           {
//             "alignment": "overlay",
//             "title": "Chromosome 5",
//             "data": {
//               "url": "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
//               "type": "csv",
//               "chromosomeField": "Chromosome",
//               "genomicFields": ["chromStart", "chromEnd"]
//             },
//             "tracks": [
//               {
//                 "mark": "rect",
//                 "dataTransform": [
//                   {
//                     "type": "filter",
//                     "field": "Stain",
//                     "oneOf": ["acen"],
//                     "not": true
//                   }
//                 ],
//                 "color": {
//                   "field": "Stain",
//                   "type": "nominal",
//                   "domain": [
//                     "gneg",
//                     "gpos25",
//                     "gpos50",
//                     "gpos75",
//                     "gpos100",
//                     "gvar"
//                   ],
//                   "range": [
//                     "#C0C0C0",
//                     "#808080",
//                     "#404040",
//                     "black",
//                     "black",
//                     "black"
//                   ]
//                 },
//                 "size": {"value": 20}
//               },
//               {
//                 "mark": "rect",
//                 "dataTransform": [
//                   {"type": "filter", "field": "Stain", "oneOf": ["acen"]}
//                 ],
//                 "size": {"value": 10},
//                 "color": {"value": "#B74780"}
//               },
//               {
//                 "mark": "text",
//                 "dataTransform": [
//                   {
//                     "type": "filter",
//                     "field": "Stain",
//                     "oneOf": ["gpos25", "gpos50", "gpos100"]
//                   }
//                 ],
//                 "text": {"field": "Name", "type": "nominal"},
//                 "visibility": [
//                   {
//                     "operation": "less-than",
//                     "measure": "width",
//                     "threshold": "|xe-x|",
//                     "transitionPadding": 10,
//                     "target": "mark"
//                   }
//                 ],
//                 "size": {"value": 6},
//                 "style": {"dy": 16, "outline": "white"}
//               },
//               {
//                 "mark": "text",
//                 "dataTransform": [
//                   {
//                     "type": "filter",
//                     "field": "Stain",
//                     "oneOf": ["gneg", "gpos75", "gvar"]
//                   }
//                 ],
//                 "text": {"field": "Name", "type": "nominal"},
//                 "visibility": [
//                   {
//                     "operation": "less-than",
//                     "measure": "width",
//                     "threshold": "|xe-x|",
//                     "transitionPadding": 10,
//                     "target": "mark"
//                   }
//                 ],
//                 "size": {"value": 6},
//                 "style": {"dy": -16, "outline": "white"}
//               },
//               {
//                 "mark": "brush",
//                 "x": {"linkingId": "view2"},
//                 "strokeWidth": {"value": 0}
//               }
//             ],
//             "x": {"field": "chromStart", "type": "genomic"},
//             "xe": {"field": "chromEnd", "type": "genomic"},
//             "color": {"value": "black"},
//             "stroke": {"value": "white"},
//             "strokeWidth": {"value": 1},
//             "style": {"outline": "white"},
//             "width": 800,
//             "height": 60
//           },
//           {
//             "alignment": "overlay",
//             "data": {
//               "url": "https://raw.githubusercontent.com/vigsterkr/circos/master/data/5/segdup.txt",
//               "type": "csv",
//               "headerNames": ["id", "chr", "p1", "p2"],
//               "chromosomePrefix": "hs",
//               "chromosomeField": "chr",
//               "genomicFields": ["p1", "p2"],
//               "separator": " ",
//               "longToWideId": "id",
//               "sampleLength": 2000
//             },
//             "dataTransform": [
//               {"type": "filter", "field": "chr", "oneOf": ["hs5", "hs4", "hs6"]},
//               {"type": "filter", "field": "chr_2", "oneOf": ["hs5", "hs4", "hs6"]}
//             ],
//             "tracks": [
//               {"mark": "rect"},
//               {
//                 "mark": "brush",
//                 "x": {"linkingId": "view2"},
//                 "strokeWidth": {"value": 0}
//               }
//             ],
//             "x": {"field": "p1", "type": "genomic"},
//             "xe": {"field": "p2", "type": "genomic"},
//             "row": {
//               "field": "chr_2",
//               "type": "nominal",
//               "domain": ["hs5", "hs4", "hs6"]
//             },
//             "color": {
//               "field": "chr_2",
//               "type": "nominal",
//               "domain": ["hs5", "hs4", "hs6"],
//               "range": ["#62AAD7", "#D1A74F", "#6CB74C"]
//             },
//             "stroke": {
//               "field": "chr_2",
//               "type": "nominal",
//               "domain": ["hs5", "hs4", "hs6"],
//               "range": ["#62AAD7", "#D1A74F", "#6CB74C"]
//             },
//             "strokeWidth": {"value": 2},
//             "opacity": {"value": 0.4},
//             "style": {"outline": "black", "outlineWidth": 1},
//             "width": 800,
//             "height": 80
//           },
//           {
//             "alignment": "overlay",
//             "data": {
//               "url": "https://raw.githubusercontent.com/vigsterkr/circos/master/data/5/segdup.txt",
//               "type": "csv",
//               "headerNames": ["id", "chr", "p1", "p2"],
//               "chromosomePrefix": "hs",
//               "chromosomeField": "chr",
//               "genomicFields": ["p1", "p2"],
//               "separator": " ",
//               "longToWideId": "id",
//               "sampleLength": 1000
//             },
//             "dataTransform": [
//               {"type": "filter", "field": "chr", "oneOf": ["hs5"]},
//               {"type": "filter", "field": "chr_2", "oneOf": ["hs5"]}
//             ],
//             "tracks": [
//               {"mark": "withinLink"},
//               {
//                 "mark": "brush",
//                 "x": {"linkingId": "view2"},
//                 "strokeWidth": {"value": 0}
//               }
//             ],
//             "x": {"field": "p1", "type": "genomic", "linkingId": "view1"},
//             "xe": {"field": "p1_2", "type": "genomic"},
//             "x1": {"field": "p2", "type": "genomic"},
//             "x1e": {"field": "P2_2", "type": "genomic"},
//             "stroke": {"value": "#6CB74C"},
//             "strokeWidth": {"value": 1},
//             "opacity": {"value": 0.4},
//             "style": {"outline": "white"},
//             "width": 800,
//             "height": 220
//           }
//         ]
//       },
//       {
//         "views": [
//           {
//             "tracks": [
//               {
//                 "title": "Region of Interest",
//                 "data": {
//                   "url": "https://raw.githubusercontent.com/vigsterkr/circos/master/data/5/segdup.txt",
//                   "type": "csv",
//                   "headerNames": ["id", "chr", "p1", "p2"],
//                   "chromosomePrefix": "hs",
//                   "chromosomeField": "chr",
//                   "genomicFields": ["p1", "p2"],
//                   "separator": " ",
//                   "longToWideId": "id",
//                   "sampleLength": 1000
//                 },
//                 "dataTransform": [
//                   {
//                     "type": "filter",
//                     "field": "chr",
//                     "oneOf": ["hs5", "hs4", "hs6"]
//                   },
//                   {
//                     "type": "filter",
//                     "field": "chr_2",
//                     "oneOf": ["hs5", "hs4", "hs6"]
//                   }
//                 ],
//                 "mark": "withinLink",
//                 "x": {
//                   "field": "p1",
//                   "type": "genomic",
//                   "linkingId": "view2",
//                   "axis": "bottom",
//                   "domain": {
//                     "chromosome": "chr5",
//                     "interval": [68000000, 71000000]
//                   }
//                 },
//                 "xe": {"field": "p2", "type": "genomic"},
//                 "row": {
//                   "field": "chr_2",
//                   "type": "nominal",
//                   "domain": ["hs5", "hs4", "hs6", "empty"]
//                 },
//                 "color": {"value": "none"},
//                 "stroke": {
//                   "field": "chr_2",
//                   "type": "nominal",
//                   "domain": ["hs5", "hs4", "hs6"],
//                   "range": ["#62AAD7", "#D1A74F", "#6CB74C"]
//                 },
//                 "strokeWidth": {"value": 2},
//                 "opacity": {"value": 0.4},
//                 "style": {
//                   "outline": "lightgray",
//                   "outlineWidth": 3,
//                   "background": "#F8F8F8"
//                 },
//                 "width": 800,
//                 "height": 200
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   } 

var spec = {
    // "title": "Single-cell Epigenomic Analysis",
    // "subtitle": "Corces et al. 2020",
    "layout": "linear",
    "arrangement": "vertical",
    "views": [
      {
        "layout": "linear",
        "xDomain": {"chromosome": "chr3"},
        "centerRadius": 0.8,
        "tracks": [
            {
            "type": "dummy-track",
            "title": "Placeholder",
            "id": "my_track",
            "height": 200,
            "width": 300,
            "style": {"background": "#e6e6e6", "textFontSize": 8, "textFontWeight": "normal"}
          },
          {
            "alignment": "overlay",
            "title": "chr3",
            "data": {
              "url": "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/cytogenetic_band.csv",
              "type": "csv",
              "chromosomeField": "Chr.",
              "genomicFields": [
                "ISCN_start",
                "ISCN_stop",
                "Basepair_start",
                "Basepair_stop"
              ]
            },
            "tracks": [
              {
                "mark": "rect",
                "dataTransform": [
                  {
                    "type": "filter",
                    "field": "Stain",
                    "oneOf": ["acen-1", "acen-2"],
                    "not": true
                  }
                ],
                "color": {
                  "field": "Density",
                  "type": "nominal",
                  "domain": ["", "25", "50", "75", "100"],
                  "range": ["white", "#D9D9D9", "#979797", "#636363", "black"]
                },
                "size": {"value": 20}
              },
              {
                "mark": "rect",
                "dataTransform": [
                  {"type": "filter", "field": "Stain", "oneOf": ["gvar"]}
                ],
                "color": {"value": "#A0A0F2"},
                "size": {"value": 20}
              },
              {
                "mark": "triangleRight",
                "dataTransform": [
                  {"type": "filter", "field": "Stain", "oneOf": ["acen-1"]}
                ],
                "color": {"value": "#B40101"},
                "size": {"value": 20}
              },
              {
                "mark": "triangleLeft",
                "dataTransform": [
                  {"type": "filter", "field": "Stain", "oneOf": ["acen-2"]}
                ],
                "color": {"value": "#B40101"},
                "size": {"value": 20}
              },
              {
                "mark": "brush",
                "x": {"linkingId": "detail"},
                "color": {"value": "red"},
                "opacity": {"value": 0.3},
                "strokeWidth": {"value": 1},
                "stroke": {"value": "red"}
              }
            ],
            "x": {"field": "Basepair_start", "type": "genomic", "axis": "none"},
            "xe": {"field": "Basepair_stop", "type": "genomic"},
            "stroke": {"value": "black"},
            "strokeWidth": {"value": 1},
            "style": {"outlineWidth": 0},
            "width": 400,
            "height": 25
          }
        ]
      },
      {
        "xDomain": {"chromosome": "chr3", "interval": [52168000, 52890000]},
        "linkingId": "detail",
        "x": {"field": "position", "type": "genomic"},
        "y": {"field": "peak", "type": "quantitative", "axis": "right"},
        "style": {"outline": "#20102F"},
        "width": 400,
        "height": 40,
        "tracks": [
          {
            "data": {
              "url": "https://s3.amazonaws.com/gosling-lang.org/data/InhibitoryNeurons-insertions_bin100_RIPnorm.bw",
              "type": "bigwig",
              "column": "position",
              "value": "peak"
            },
            "title": "Inhibitory neurons",
            "mark": "bar",
            "color": {"value": "#3DC491"}
          },
          {
            "data": {
              "url": "https://s3.amazonaws.com/gosling-lang.org/data/OPCs-insertions_bin100_RIPnorm.bw",
              "type": "bigwig",
              "column": "position",
              "value": "peak"
            },
            "title": "OPCs",
            "mark": "bar",
            "color": {"value": "#E38ADC"}
          },
          {
            "alignment": "overlay",
            "title": "Genes",
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",
              "type": "beddb",
              "genomicFields": [
                {"index": 1, "name": "start"},
                {"index": 2, "name": "end"}
              ],
              "valueFields": [
                {"index": 5, "name": "strand", "type": "nominal"},
                {"index": 3, "name": "name", "type": "nominal"}
              ],
              "exonIntervalFields": [
                {"index": 12, "name": "start"},
                {"index": 13, "name": "end"}
              ]
            },
            "style": {"outline": "#20102F"},
            "tracks": [
              {
                "dataTransform": [
                  {"type": "filter", "field": "type", "oneOf": ["gene"]},
                  {"type": "filter", "field": "strand", "oneOf": ["+"]}
                ],
                "mark": "text",
                "text": {"field": "name", "type": "nominal"},
                "x": {"field": "start", "type": "genomic"},
                "size": {"value": 8},
                "xe": {"field": "end", "type": "genomic"},
                "style": {"textFontSize": 8, "dy": -12}
              },
              {
                "dataTransform": [
                  {"type": "filter", "field": "type", "oneOf": ["gene"]},
                  {"type": "filter", "field": "strand", "oneOf": ["-"]}
                ],
                "mark": "text",
                "text": {"field": "name", "type": "nominal"},
                "x": {"field": "start", "type": "genomic"},
                "xe": {"field": "end", "type": "genomic"},
                "size": {"value": 8},
                "style": {"textFontSize": 8, "dy": 10}
              },
              {
                "dataTransform": [
                  {"type": "filter", "field": "type", "oneOf": ["gene"]},
                  {"type": "filter", "field": "strand", "oneOf": ["+"]}
                ],
                "mark": "rect",
                "x": {"field": "end", "type": "genomic"},
                "size": {"value": 7}
              },
              {
                "dataTransform": [
                  {"type": "filter", "field": "type", "oneOf": ["gene"]},
                  {"type": "filter", "field": "strand", "oneOf": ["-"]}
                ],
                "mark": "rect",
                "x": {"field": "start", "type": "genomic"},
                "size": {"value": 7}
              },
              {
                "dataTransform": [
                  {"type": "filter", "field": "type", "oneOf": ["exon"]}
                ],
                "mark": "rect",
                "x": {"field": "start", "type": "genomic"},
                "xe": {"field": "end", "type": "genomic"},
                "size": {"value": 14}
              },
              {
                "dataTransform": [
                  {"type": "filter", "field": "type", "oneOf": ["gene"]}
                ],
                "mark": "rule",
                "x": {"field": "start", "type": "genomic"},
                "xe": {"field": "end", "type": "genomic"},
                "strokeWidth": {"value": 3}
              }
            ],
            "row": {"field": "strand", "type": "nominal", "domain": ["+", "-"]},
            "color": {
              "field": "strand",
              "type": "nominal",
              "domain": ["+", "-"],
              "range": ["#012DB8", "#BE1E2C"]
            },
            "visibility": [
              {
                "operation": "less-than",
                "measure": "width",
                "threshold": "|xe-x|",
                "transitionPadding": 10,
                "target": "mark"
              }
            ],
            "width": 400,
            "height": 80
          },
          {
            "title": "PLAC-seq (H3K4me3) Nott et al.",
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=oligodendrocyte-plac-seq-bedpe",
              "type": "beddb",
              "genomicFields": [
                {"name": "start", "index": 1},
                {"name": "end", "index": 2}
              ]
            },
            "mark": "withinLink",
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "y": {"flip": true},
            "strokeWidth": {"value": 1},
            "color": {"value": "none"},
            "stroke": {"value": "#F97E2A"},
            "opacity": {"value": 0.1},
            "overlayOnPreviousTrack": false,
            "width": 400,
            "height": 60
          },
          {
            "title": "",
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=microglia-plac-seq-bedpe",
              "type": "beddb",
              "genomicFields": [
                {"name": "start", "index": 1},
                {"name": "end", "index": 2}
              ]
            },
            "mark": "withinLink",
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "y": {"flip": true},
            "strokeWidth": {"value": 1},
            "color": {"value": "none"},
            "stroke": {"value": "#50ADF9"},
            "opacity": {"value": 0.1},
            "overlayOnPreviousTrack": true,
            "width": 400,
            "height": 60
          },
          {
            "title": "",
            "data": {
              "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=neuron-plac-seq-bedpe",
              "type": "beddb",
              "genomicFields": [
                {"name": "start", "index": 1},
                {"name": "end", "index": 2}
              ]
            },
            "mark": "withinLink",
            "x": {"field": "start", "type": "genomic"},
            "xe": {"field": "end", "type": "genomic"},
            "y": {"flip": true},
            "strokeWidth": {"value": 1},
            "color": {"value": "none"},
            "stroke": {"value": "#7B0EDC"},
            "opacity": {"value": 0.1},
            "overlayOnPreviousTrack": true,
            "width": 400,
            "height": 60
          }
        ]
      }
    ]
  }

embed(document.getElementById('gosling-container'), spec);