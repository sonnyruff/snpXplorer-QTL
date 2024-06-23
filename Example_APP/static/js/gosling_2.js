import { embed } from 'gosling.js';

// import React, { useRef, useEffect } from "react";
// import { GoslingComponent} from 'gosling.js';

var data = $('#my-data').data();

// const chrom = 2,
//   locus = 24700000,
//   range = 300000,
//   p_val = 0.000000001,
//   start = locus-range,
//   end = locus+range,
//   // tissues = ["Whole_Blood", "Stomach"];
//   tissues = ["Whole_Blood"];

var chrom = parseInt(data.chrom),
  locus = parseInt(data.locus),
  start = parseInt(data.start),
  end = parseInt(data.end),
  p_val = parseFloat(data.p_val),
  tissues = data.tissues,
  geneTrackB = data.genetrack, // attributes are for some reason converted to lowercase and CAN'T be accessed otherwise !!!!!!
  tissueBetweenTrack = data.tissuebetweentrack,
  tissueTrack = data.tissuetrack,
  snppValTrack = data.snppvaltrack,
  snpsvBetweenTrack = data.snpsvbetweentrack,
  svTrack = data.svtrack;

tissues = tissues.replace(/\s/g, "").replace(/\[|\]/g, "").replace(/\'/g, "").split(",")

const width = 1500,
    bandHeight = 30,
    linkHeight = 100;

////////////////////////////////////////////////////////////////////////////////

const snp_sv_data = {
  "url": "/data/data_snp_sv?chr="+chrom+"&p="+p_val+"&start="+start+"&end="+end,
  "type": "csv",
  "chromosomeField": "#CHROM",
  "genomicFields": ["POS", "svStart", "svEnd"],
  "separator": ","
};


////////////////////////////////////////////////////////////////////////////////

// todo doesn't work
// const getTissueTrack = {
//   for (var i = 0; i < tissues.length; i++) {
//     var t = tissues[i];
//   }
// }

////////////////////////////////////////////////////////////////////////////////

const genomeTrack = {
  title: 'G-bands',
  width,
  height: bandHeight,
  data: {
    url: "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
    type: "csv",
    chromosomeField: "Chromosome",
    genomicFields: ["chromStart", "chromEnd"]
  },
  // dataTransform: [{type: "filter", field: "Chromosome", oneOf: ["chr22"], not: false}],
  //***** move the rect track to overlaid tracks
  //      "dataTransform": [{"type":"filter", "field": "Stain", "oneOf": ["acen"], "not": true}],
  //      "mark": "rect",
  //      "color": {
  //          "field": "Stain", 
  //          "type": "nominal",
  //          "domain": ["gpos25", "gpos50", "gpos75", "gpos100"],
  //          "range": ["#D9D9D9","#979797","#636363", "black"]
  //      },
  //***  
  x: { field: "chromStart", type: "genomic" },
  xe: { "field": "chromEnd", "type": "genomic" },
  size: { "value": bandHeight },
  stroke: { "value": "gray" },
  strokeWidth: { "value": 0.5 },

  //****** overlay three tracks
  //****** the above visual properties are shared by the three tracks 
  alignment: "overlay",
  tracks: [
    //*** the first rect track
    {
      mark: "rect",
      dataTransform: [{ "type": "filter", "field": "Stain", "oneOf": ["acen"], "not": true }],
      color: {
        field: "Stain",
        type: "nominal",
        domain: ["gneg", "gpos25", "gpos50", "gpos75", "gpos100", "gvar"],
        range: ["white", "#D9D9D9", "#979797", "#636363", "yellow", "#A0A0F2"]
      }
    },
    //*** the second right triangle track 
    {
      mark: "triangleRight",
      dataTransform: [
        { type: "filter", field: "Stain", oneOf: ["acen"] },
        { type: "filter", field: "Name", include: "q" }
      ],
      color: { "value": "#B70101" }
    },
    //*** the thrid left triangle track
    {
      mark: "triangleLeft",
      dataTransform: [
        { type: "filter", field: "Stain", oneOf: ["acen"] },
        { type: "filter", field: "Name", include: "p" }
      ],
      color: { "value": "#B70101" }
    }
  ]
}

////////////////////////////////////////////////////////////////////////////////

const geneTrackNew = {
  title: "Genes",
  data: {
    url: "/data/genes",
    type: "csv",
    chromosomeField: "chrom",
    genomicFields: [ "txStart", "txEnd", "cdsStart", "cdsEnd", "exonCount", "exonStarts", "exonEnds" ],
  },
  style: {outline: "#20102F"},
  // tracks: [
    // {
    //   "dataTransform": [
    //     {"type": "filter", "field": "strand", "oneOf": ["+"]}
    //   ],
    //   "mark": "text",
    //   "text": {"field": "name", "type": "nominal"},
    //   "x": {"field": "txStart", "type": "genomic"},
    //   "xe": {"field": "txEnd", "type": "genomic"},
    //   "size": {"value": 8},
    //   "style": {"textFontSize": 8, "dy": -12}
    // },
    // {
    //   "dataTransform": [
    //     {"type": "filter", "field": "strand", "oneOf": ["-"]}
    //   ],
    //   "mark": "text",
    //   "text": {"field": "name", "type": "nominal"},
    //   "x": {"field": "txStart", "type": "genomic"},
    //   "xe": {"field": "txEnd", "type": "genomic"},
    //   "size": {"value": 8},
    //   "style": {"textFontSize": 8, "dy": 10}
    // },
    // {
    //   "dataTransform": [
    //     {"type": "filter", "field": "strand", "oneOf": ["+"]}
    //   ],
    //   "mark": "rect",
    //   "x": {"field": "txEnd", "type": "genomic"},
    //   "size": {"value": 7}
    // },
    // {
    //   "dataTransform": [
    //     {"type": "filter", "field": "strand", "oneOf": ["-"]}
    //   ],
    //   "mark": "rect",
    //   "x": {"field": "txStart", "type": "genomic"},
    //   "size": {"value": 7}
    // },
    // {
    //   "mark": "rule",
    //   "x": {"field": "txStart", "type": "genomic"},
    //   "xe": {"field": "txEnd", "type": "genomic"},
    //   "strokeWidth": {"value": 3}
    // }
  // ],
  "mark": "rect",
  "x": {"field": "txStart", "type": "genomic"},
  "xe": {"field": "txEnd", "type": "genomic"},
  row: {field: "strand", type: "nominal", domain: ["+", "-"]},
  // color: {field: "strand", type: "nominal", domain: ["+", "-"], range: ["#012DB8", "#BE1E2C"]},
  color: {field: "color", type: "nominal"},
  // visibility: [
  //   {
  //     "operation": "less-than",
  //     "measure": "width",
  //     "threshold": "|xe-x|",
  //     "transitionPadding": 10,
  //     "target": "mark"
  //   }
  // ],
  width,
  height: 80,
  "tooltip": [
    {"field": "#geneName", "type": "nominal", "alt": "#geneName"},
    {"field": "txStart", "type": "genomic", "alt": "txStart"},
    {"field": "txEnd", "type": "genomic", "alt": "txEnd"}
  ]
}

const geneTrack = {
  alignment: "overlay",
  title: "Genes",
  data: {
    url: "https://server.gosling-lang.org/api/v1/tileset_info/?d=gene-annotation",
    type: "beddb",
    genomicFields: [
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
  style: {outline: "#20102F"},
  tracks: [
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
  row: {field: "strand", type: "nominal", domain: ["+", "-"]},
  color: {field: "strand", type: "nominal", domain: ["+", "-"], range: ["#012DB8", "#BE1E2C"]},
  visibility: [
    {
      "operation": "less-than",
      "measure": "width",
      "threshold": "|xe-x|",
      "transitionPadding": 10,
      "target": "mark"
    }
  ],
  width,
  height: 80
}

////////////////////////////////////////////////////////////////////////////////

// Crashes the site when zooming in and out too fast

const baseTrack = { // ===== Bases =====
  "layout": "linear",
  "alignment": "overlay",
  "data": {
    "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=sequence-multivec",
    "type": "multivec",
    "row": "base",
    "column": "position",
    "value": "count",
    "categories": ["A", "T", "G", "C"],
    "start": "start",
    "end": "end"
  },
  "tracks": [
    {
      "mark": "bar",
      "y": {"field": "count", "type": "quantitative", "axis": "none"}
    },
    {
      "dataTransform": [
        {"type": "filter", "field": "count", "oneOf": [0], "not": true}
      ],
      "mark": "text",
      "x": {"field": "start", "type": "genomic"},
      "xe": {"field": "end", "type": "genomic"},
      "size": {"value": 12},
      "color": {"value": "white"},
      "visibility": [
        {
          "operation": "less-than",
          "measure": "width",
          "threshold": "|xe-x|",
          "transitionPadding": 30,
          "target": "mark"
        },
        {
          "operation": "LT",
          "measure": "zoomLevel",
          "threshold": 40,
          "target": "track"
        }
      ]
    }
  ],
  "x": {"field": "position", "type": "genomic"},
  "color": {
    "field": "base",
    "type": "nominal",
    "domain": ["A", "T", "G", "C"],
    "legend": true
  },
  "text": {"field": "base", "type": "nominal"},
  "style": {"textFontWeight": "bold"},
  "width": width,
  "height": bandHeight
}

////////////////////////////////////////////////////////////////////////////////

const get_tissue_track = (chrom, tissue, start, end) => {
  return {
    title: tissue + "-SNP P-values",
    data: {
      url: "/data/summary_eqtls?chr="+chrom+"&tissue="+tissue+"&start="+start+"&end="+end+"&p="+p_val,
      type: "csv",
      chromosomeField: '#CHROM',
      genomicFields: ["POS"],
      separator: ","
    },
    mark: "point",
    x: {field: "POS", type: "genomic"},
    y: {field: "P", type: "quantitative"},
    color: {field: "gene", type: "nominal"},
    width,
    height: 60,
    "tooltip": [
      {"field": "POS", "type": "genomic", "alt": "Locus"},
      {"field": "P", "type": "nominal", "alt": "P"},
      {"field": "val", "type": "nominal", "alt": "val"},
      {"field": "gene", "type": "nominal", "alt": "Gene"},
      {"field": "ref", "type": "nominal", "alt": "Ref"},
      {"field": "alt", "type": "nominal", "alt": "Alt"}
    ]
  }
}

const get_tissue_between_track = (chrom, tissue, start, end) => {
  return { // ===== LinkBetweens =====
    data: {
      url: "/data/summary_eqtls?chr="+chrom+"&tissue="+tissue+"&start="+start+"&end="+end+"&p="+p_val,
      type: "csv",
      chromosomeField: '#CHROM',
      genomicFields: ["POS", "txStart"],
      separator: ","
    },
    mark: 'betweenLink',
    x: { field: 'txStart', type: 'genomic' },
    x1: { field: 'POS', type: 'genomic' },
    stroke: { value: '#4C6629' },
    strokeWidth: { value: 0.8 },
    // opacity: {"field": "P", "type": "quantitative"},
    color: { value: '#85B348' },
    style: { linkConnectionType: 'curve'},
    // eventStyle: { strokeWidth: 2 },
    width,
    height: linkHeight,
    tooltip: [
      {"field": "txStart", "type": "genomic", "alt": "txStart"},
      {"field": "txEnd", "type": "genomic", "alt": "txEnd"},
      {"field": "POS", "type": "genomic", "alt": "SNP"},
    ]
  }
}

const get_SNP_P = () => {
  return { // ===== SNP P-values =====
    title: "SNP-SV P-values",
    data: snp_sv_data,
    mark: "point",
    x: {"field": "POS", "type": "genomic"},
    y: {"field": "P", "type": "quantitative"},
    color: {"field": "svStart", "type": "nominal"},
    width,
    height: 60,
    "tooltip": [
      {"field": "POS", "type": "genomic", "alt": "Locus"},
      {"field": "P", "type": "nominal", "alt": "P"},
      {"field": "svStart", "type": "genomic", "alt": "svStart"}
    ]
  }
}

const get_SNPs = () => {
  return { // ===== SNPs =====
    data: snp_sv_data,
    mark: "rect",
    "x": {"field": "POS", "type": "genomic"},
    // "y": {"field": "P", "type": "quantitative"},
    "color": {"value": "grey"},
    "width": width,
    "height": bandHeight,
    "tooltip": [
      {"field": "POS", "type": "genomic", "alt": "Locus"}
    ]
  }
}

const get_SNP_SV_links = () => {
  return { // ===== LinkBetweens =====
    data: snp_sv_data,
    mark: 'betweenLink',
    x: { field: 'POS', type: 'genomic' },
    // xe: { field: 'POS', type: 'genomic' }, // These break it
    x1: { field: 'svStart', type: 'genomic' },
    // x1e: { field: 'svEnd', type: 'genomic' }, // These break it
    stroke: { value: '#4C6629' },
    strokeWidth: { value: 0.8 },
    opacity: {"field": "P", "type": "quantitative"},
    color: { value: '#85B348' },
    style: { linkConnectionType: 'curve' },
    width,
    height: linkHeight,
    tooltip: [
      {"field": "POS", "type": "genomic", "alt": "SNP"},
      {"field": "svStart", "type": "genomic", "alt": "svStart"},
      {"field": "svEnd", "type": "genomic", "alt": "svEnd"}
    ]
  }
}

const get_SVs = () => {
  return { // ===== SVs =====
    title: "Structural Variants",
    "data": snp_sv_data,
    "mark": "rect",
    "x": {"field": "svStart", "type": "genomic"},
    "xe": {"field": "svEnd", "type": "genomic"},
    "color": {"value": "grey"},
    "width": width,
    "height": bandHeight,
    "tooltip": [
      {"field": "svStart", "type": "genomic", "alt": "svStart"},
      {"field": "svEnd", "type": "genomic", "alt": "svEnd"}
    ]
  }
}

//==================================================================

const SNP_marker = () => {
  return {
    title: "Locus " + locus,
    width,
    height: 20,
    "style": {"dashed": [3, 3]},
    "data": {
      "type": "json",
      "values": [
        {"c": "chr"+chrom, "p": locus}
      ],
      "chromosomeField": "c",
      "genomicFields": ["p"]
    },
    "mark": "rule",
    "x": {"field": "p", "type": "genomic"},
    "strokeWidth": {"value": 2},
    "color": {"value": "blue"}
  }
}

//==================================================================

const get_main_view = () => {
  const view = {
    "layout": "linear",
    "xDomain": {"chromosome": "chr"+chrom, "interval": [start, end]},
    "spacing": 0,
    "tracks": [
      // genomeTrack,
      get_SNP_P(),
      // baseTrack,
      // get_SNPs(),
      get_SNP_SV_links(),
      get_SVs(),
      geneTrack,
    ]
  };

  // This might've just been able to be put under the spec object below
  for(let i = 0; i < tissues.length; i++){
    view["tracks"].push(get_tissue_between_track(chrom, tissues[i], start, end))
    view["tracks"].push(get_tissue_track(chrom, tissues[i], start, end))
  }

  return view;
};

const get_main_view_2 = () => {
  const view = {
    "layout": "linear",
    "xDomain": {"chromosome": "chr"+chrom, "interval": [start, end]},
    "spacing": 0,
    "tracks": []
  };

  if (geneTrackB == "True") view["tracks"].push(geneTrack)

  // This might've just been able to be put under the spec object below
  for(let i = 0; i < tissues.length; i++){
    if (tissueBetweenTrack == "True") view["tracks"].push(get_tissue_between_track(chrom, tissues[i], start, end))
    if (tissueTrack == "True") view["tracks"].push(get_tissue_track(chrom, tissues[i], start, end))
  }

  view["tracks"].push(SNP_marker())

  if (snppValTrack == "True") view["tracks"].push(get_SNP_P())
  if (snpsvBetweenTrack == "True") view["tracks"].push(get_SNP_SV_links())
  if (svTrack == "True") view["tracks"].push(get_SVs())

  return view;
};


/**
 * @returns {GoslingSpec}
 */
const spec = {
  // title: "Visual Encoding",
  // subtitle: "Gosling provides diverse visual encoding methods",
  layout: "linear",
  arrangement: "vertical",
  assembly: "hg38",
  xDomain: { chromosome: "chr"+chrom, "interval": [start, end] },
  views: [
    {
      static: true,
      xDomain: { chromosome: "chr"+chrom},
      tracks: [
        genomeTrack
      ]
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    get_main_view_2()
  ]
};


embed(document.getElementById('gosling-container'), spec);



// const gosRef = useRef(null)

// <GoslingComponent
//        ref = {gosRef}
//        spec = {/**your gosling spec**/}
// />

// if (gosRef.current) {
//    // then you can use any Gosling API you want
//    gosRef.current.api.exportPdf();
//  }

// gosRef.current.subscribe(eventName:string, callback: (msg:string, eventData)=>void)




// var sessionValue = '<%=Session["chrom"]%>';
// console.log(sessionValue)