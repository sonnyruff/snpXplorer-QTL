import { embed } from 'gosling.js';


const chrom = 2,
  // locus = 13900000,
  // range = 100000,
  locus = 24700000,
  range = 300000,
  p_val = 0.000000001,
  start = locus-range,
  end = locus+range,
  tissues = ["Whole_Blood", "Stomach"];
  // tissues = ["Whole_Blood"];
  // tissue = "Whole_Blood"


const width = 1500,
    bandHeight = 30,
    linkHeight = 100;

//==================================================================

const snp_sv_data = {
  "url": "/data/data_snp_sv?chr="+chrom+"&p="+p_val+"&start="+start+"&end="+end,
  "type": "csv",
  "chromosomeField": "#CHROM",
  "genomicFields": ["POS", "svStart", "svEnd"],
  "separator": ","
};


//==================================================================

// todo doesn't work
// const getTissueTrack = {
//   for (var i = 0; i < tissues.length; i++) {
//     var t = tissues[i];
//   }
// }

//==================================================================

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
        range: ["white", "#D9D9D9", "#979797", "#636363", "black", "#A0A0F2"]
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

//==================================================================

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
  width,
  "height": 80
}

//==================================================================

const get_tissue_track = (chrom, tissue, start, end) => {
  return {
    title: tissue,
    data: {
      url: "/data/summary_eqtls?chr="+chrom+"&tissue="+tissue+"&start="+start+"&end="+end+"&p="+p_val,
      type: "csv",
      chromosomeField: '#CHROM',
      genomicFields: ["POS"],
      separator: ","
    },
    mark: "point",
    x: {"field": "POS", "type": "genomic"},
    y: {"field": "P", "type": "quantitative"},
    // color: {"field": "val", "type": "quantitative"},
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
    opacity: {"field": "P", "type": "quantitative"},
    color: { value: '#85B348' },
    style: { outlineWidth: 0, linkConnectionType: 'curve' },
    width,
    height: linkHeight
  }
}

const get_main_view = () => {
  const view = {
    "layout": "linear",
    "xDomain": {"chromosome": "chr"+chrom, "interval": [start, end]},
    "spacing": 0,
    "tracks": [
      genomeTrack,
      { // ===== SNP P-values =====
        data: snp_sv_data,
        mark: "bar",
        x: {"field": "POS", "type": "genomic"},
        y: {"field": "P", "type": "quantitative"},
        // color: {"field": "sample", "type": "nominal"},
        color: {value: "grey"},
        width,
        height: 60
      },
      { // ===== Bases =====
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
      },
      { // ===== SNPs =====
        data: snp_sv_data,
        mark: "rect",
        "x": {"field": "POS", "type": "genomic"},
        // "y": {"field": "P", "type": "quantitative"},
        "color": {"value": "grey"},
        "width": width,
        "height": bandHeight
      },
      { // ===== LinkBetweens =====
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
        style: { outlineWidth: 0, linkConnectionType: 'curve' },
        width,
        height: linkHeight
      },
      { // ===== SVs =====
        "data": snp_sv_data,
        "mark": "rect",
        "x": {"field": "svStart", "type": "genomic"},
        "xe": {"field": "svEnd", "type": "genomic"},
        "color": {"value": "grey"},
        "width": width,
        "height": bandHeight
      },
      geneTrack
    ]
  };

  // This might've just been able to be put under the spec object below
  for(let i = 0; i < tissues.length; i++){
    view["tracks"].push(get_tissue_between_track(chrom, tissues[i], start, end))
    view["tracks"].push(get_tissue_track(chrom, tissues[i], start, end))
  }

  return view;
};


/**
 * @returns {GoslingSpec}
 */
const spec = {
  title: "Visual Encoding",
  subtitle: "Gosling provides diverse visual encoding methods",
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
    get_main_view()
  ]
};



// var e = document.getElementById("chromosome");
// console.log(e.value);
// console.log(tissues.forEach(console.log))

embed(document.getElementById('gosling-container'), spec);