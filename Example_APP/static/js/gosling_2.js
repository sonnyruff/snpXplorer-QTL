import { embed } from 'gosling.js';

const width = 1500,
    bandHeight = 16,
    linkHeight = 100;

const data = {
    type: 'csv',
    url: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/circos-segdup-edited.txt',
    chromosomeField: 'c2',
    genomicFields: ['s1', 'e1', 's2', 'e2']
};

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

const genomeTrack = {
    width,
    height: 70,
    data: {
      // url: "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
      url: "/data/cytoband?chr=chr22",
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
    x: {
      field: "chromStart",
      type: "genomic",
      domain: { "chromosome": "chr22" },
      axis: "top"
    },
    xe: { "field": "chromEnd", "type": "genomic" },
    size: { "value": 20 },
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

/**
 * @param {string} x
 * @param {string} xe
 * @returns {Track}
 */
const getRectTrack = (x, xe) => {
    return {
        data,
        mark: 'rect',
        x: { field: x, type: 'genomic' },
        xe: { field: xe, type: 'genomic' },
        stroke: { value: '#4C6629' },
        strokeWidth: { value: 0.8 },
        tooltip: [
            { field: x, type: 'genomic', alt: '<b style="color:green">Start Position</b>' },
            { field: xe, type: 'genomic', alt: '<b style="color:green">End Position</b>' }
        ],
        opacity: { value: 0.15 },
        color: { value: '#85B348' },
        width,
        height: bandHeight
    };
};

/**
 * @param {string} x
 * @param {string} xe
 * @param {string} x1
 * @param {string} x1e
 * @returns {Track}
 */
const getBetweenLinkTrack = (x, xe, x1, x1e) => {
    return {
        data,
        mark: 'betweenLink',
        x: { field: x, type: 'genomic' },
        xe: { field: xe, type: 'genomic' },
        x1: { field: x1, type: 'genomic' },
        x1e: { field: x1e, type: 'genomic' },
        stroke: { value: '#4C6629' },
        strokeWidth: { value: 0.8 },
        opacity: { value: 0.15 },
        color: { value: '#85B348' },
        style: { outlineWidth: 0 },
        width,
        height: linkHeight
    };
};


/**
 * @returns {GoslingSpec}
 */
const spec = {
  title: "Visual Encoding",
  subtitle: "Gosling provides diverse visual encoding methods",
  layout: "linear",
  arrangement: "vertical",
  views: [
    {
      tracks: [genomeTrack]
    },
    {tracks: [geneTrack]},
    {
      layout: 'linear',
      // xDomain: { chromosome: 'chr1', interval: [103900000, 104100000] },
      spacing: 0,
      tracks: [
          getRectTrack('s1', 'e1'),
          getBetweenLinkTrack('s1', 'e1', 's2', 'e2'),
          getRectTrack('s2', 'e2')
      ]
    }
  ]
};

embed(document.getElementById('gosling-container'), spec);