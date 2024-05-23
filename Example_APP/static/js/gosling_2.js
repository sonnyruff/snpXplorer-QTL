import { embed } from 'gosling.js';


const chrom = 2,
  locus = 15000000,
  range = 1000000,
  p_val = 0.000000001,
  start = locus-range,
  end = locus+range,
  // tissues = ["Whole_Blood", "Stomach"];
  tissue = "Whole_Blood"


const width = 1500,
    bandHeight = 16,
    linkHeight = 100;

const data = {
    type: 'csv',
    url: 'https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/circos-segdup-edited.txt',
    chromosomeField: 'c2',
    genomicFields: ['s1', 'e1', 's2', 'e2']
};


const snps = {
  width,
  height: 70,
  data: {
    // url: "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
    url: "/data/cytoband?chr=chr"+chrom,
    type: "csv",
    chromosomeField: "Chromosome",
    genomicFields: ["chromStart", "chromEnd"]
  },
}

//==================================================================

// todo doesn't work
// const getTissueTrack = {
//   for (var i = 0; i < tissues.length; i++) {
//     var t = tissues[i];
//   }
// }

//==================================================================

const genomeTrack = {
  width,
  height: 70,
  data: {
    // url: "https://raw.githubusercontent.com/sehilyi/gemini-datasets/master/data/UCSC.HG38.Human.CytoBandIdeogram.csv",
    url: "/data/cytoband?chr=chr"+chrom,
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

//==================================================================

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
      tracks: [
        // getTissueTrack,
        {
          title: tissue,
          data: {
            url: "/data/summary_eqtls?chr="+chrom+"&tissue="+tissue+"&start="+start+"&end="+end,
            type: "csv",
            chromosomeField: 'chrom',
            genomicFields: ["POS"],
            separator: ","
          },
          mark: "point",
          x: {"field": "POS", "type": "genomic"},
          y: {"field": "val", "type": "quantitative"},
          color: {value: "grey"},
          width,
          height: 60
        },
        {
          data: {
            // url: "/data/data_snp_sv/chr?chr="+chrom+"&p="+p_val+"&size=1000",
            url: "/data/data_snp_sv/chr?chr="+chrom+"&p="+p_val+"&start="+start+"&end="+end,
            type: "csv",
            chromosomeField: "#CHROM",
            genomicFields: ["POS"],
            separator: ","
          },
          mark: "point",
          x: {"field": "POS", "type": "genomic"},
          y: {"field": "P", "type": "quantitative"},
          // color: {"field": "sample", "type": "nominal"},
          color: {value: "grey"},
          width,
          height: 60
        },
        {
          "data": {
            "url": "https://server.gosling-lang.org/api/v1/tileset_info/?d=cistrome-multivec",
            "type": "multivec",
            "row": "sample",
            "column": "position",
            "value": "peak",
            "categories": ["sample 1", "sample 2", "sample 3", "sample 4"]
          },
          "mark": "area",
          "x": {"field": "position", "type": "genomic"},
          "y": {"field": "peak", "type": "quantitative"},
          "color": {"field": "sample", "type": "nominal"},
          width,
          height: 30
        },
        {
          "alignment": "overlay",
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
              "mark": "text",
              "dataTransform": [
                {
                  "type": "filter",
                  "field": "Stain",
                  "oneOf": ["acen-1", "acen-2"],
                  "not": true
                }
              ],
              "text": {"field": "Band", "type": "nominal"},
              "color": {"value": "black"},
              "visibility": [
                {
                  "operation": "less-than",
                  "measure": "width",
                  "threshold": "|xe-x|",
                  "transitionPadding": 10,
                  "target": "mark"
                }
              ]
            },
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
              }
            },
            {
              "mark": "rect",
              "dataTransform": [
                {"type": "filter", "field": "Stain", "oneOf": ["gvar"]}
              ],
              "color": {"value": "#A0A0F2"}
            },
            {
              "mark": "triangleRight",
              "dataTransform": [
                {"type": "filter", "field": "Stain", "oneOf": ["acen-1"]}
              ],
              "color": {"value": "#B40101"}
            },
            {
              "mark": "triangleLeft",
              "dataTransform": [
                {"type": "filter", "field": "Stain", "oneOf": ["acen-2"]}
              ],
              "color": {"value": "#B40101"}
            }
          ],
          "x": {"field": "Basepair_start", "type": "genomic"},
          "xe": {"field": "Basepair_stop", "type": "genomic"},
          "stroke": {"value": "gray"},
          "strokeWidth": {"value": 0.5},
          width,
          height: 20
        }
      ]
    },
    {
      static: true,
      xDomain: { chromosome: "chr"+chrom},
      tracks: [
        genomeTrack
      ]
    },
    {tracks: [geneTrack]},
    {
      layout: 'linear',
      spacing: 0,
      tracks: [
          getRectTrack('s1', 'e1'),
          getBetweenLinkTrack('s1', 'e1', 's2', 'e2'),
          getRectTrack('s2', 'e2')
      ]
    }
  ]
};


// var e = document.getElementById("chromosome");
// console.log(e.value);
// console.log(tissues.forEach(console.log))

embed(document.getElementById('gosling-container'), spec);