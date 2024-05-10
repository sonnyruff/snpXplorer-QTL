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
  


embed(document.getElementById('gosling-container'), spec);