# Libraries
from flask import Flask, request, render_template, send_file, session, make_response, redirect, url_for, jsonify, Response

from io import BytesIO
import base64
import json
import numpy as np
import math

import pandas as pd
import csv

# Graphing
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import plotly
from plotly.utils import PlotlyJSONEncoder
import plotly.io as pio
import plotly.graph_objs as go

# Other scripts
from matplotlib_tests import *
from app_functions import *

######################################################################
######################################################################

# Set path to data
data_path = '/Data'

# Initialize the App
app = Flask(__name__)

# Function to generate plot
def generate_plot():
    # Sample data
    x_values = [1, 2, 3, 4, 5]
    y_values = [2, 4, 6, 8, 10]
    # Create plot
    # plt.plot(x_values, y_values)
    
    split_plot()
    # pie_plot()
    # stacked_plot()

    plt.title("Sample Plot")
    plt.xlabel("X-axis")
    plt.ylabel("Y-axis")
    # Save plot to a BytesIO object
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    # Encode plot image to base64
    plot_base64 = base64.b64encode(buffer.getvalue()).decode()
    return plot_base64

# Function to generate plotly plot
def plotly_plot():
    # Sample data
    x_values = [1, 2, 3, 4, 5]
    y_values = [2, 4, 6, 8, 10]
    # Create a Plotly trace
    trace = go.Scatter(x=x_values, y=y_values, mode='lines', name='Data')
    # Create a Plotly layout
    layout = go.Layout(title='Sample Plot', xaxis=dict(title='X-axis'), yaxis=dict(title='Y-axis'))
    # Create a Plotly figure
    fig = go.Figure(data=[trace], layout=layout)
    # Convert Plotly figure to JSON using PlotlyJSONEncoder
    plot_json = pio.to_json(fig)
    return plot_json

# Define a route for one page
@app.route('/', methods=["GET", "POST"])
def example():
    if request.method == "POST":
        refGen = request.form["refGenome"]
        browse = request.form["browse"]
        gwas = request.form.getlist('gwas_data')
        window = int(request.form["window"])
        selected_sv_source = request.form.getlist("sv_source")
        recomb = request.form["recomb"]
        exons = request.form["exons"]
        plotype = request.form["plotype"]
        qtl_tissues = request.form.getlist('QTLtissuesExplo')

        # gather data for the plot
        # chromosome and positions based on the browsing option
        # chrom, start_pos, end_pos, browse_type = readBrowseOption(data_path, browse, window, refGen)
        # df = get_data_plot(data_path = data_path, gwas = gwas, chrom = chrom, start_pos = start_pos, end_pos = end_pos, refGen = refGen)
        # genes = extract_genes(data_path, chrom, start_pos, end_pos, refGen)
        # svs, svs_df = extract_sv(data_path, chrom, start_pos, end_pos, selected_sv_source, refGen)
        # recomb_data = extract_recomb(data_path, chrom, start_pos, end_pos, refGen) if recomb == 'Yes' else "None"
        # gtex_df = get_gtex(data_path, genes, refGen)

        # img = scatterplot(df = df, chrom = chrom, start_pos = start_pos, end_pos = end_pos, gwas = gwas, genes = genes, svs = svs, browse_type = browse_type, refGen = refGen, recomb_data = recomb_data, exons = exons, browse = browse, plotype = plotype)
        # plot_url = base64.b64encode(img.getvalue()).decode()
        # img_gtex = gtex_heatmap(gtex_df)
        # plot_gtex = base64.b64encode(img_gtex.getvalue()).decode()
        
        # Tables
        # prepare the table of SNP associations: sort, subset of columns, add locus and alleles columns, and round Pvalue
        # df_sorted = df.sort_values(by='Pvalue', ascending=False)
        # df_sorted['Locus'] = df_sorted.apply(lambda x: str(x['Chrom']) + ':' + str(x['Position']), axis=1)
        # df_sorted['Alleles'] = df_sorted.apply(lambda x: str(x['Ref']) + '/' + str(x['Alt']), axis=1)
        # df_sorted = df_sorted[['Locus', 'Rsid', 'Gwas', 'Alleles', 'Pvalue']]
        # df_sorted['Pvalue'] = df_sorted['Pvalue'].round(2)
        # snps_table = df_sorted.to_dict(orient='records')
        # # prepare the table of the SVs
        # svs_df['Region'] = svs_df.apply(lambda x: str(x['chrom']) + ':' + str(x['start']) + '-' + str(x['end']), axis=1)
        # svs_df = svs_df[['Region', 'diff', 'type']]
        # svs_table = svs_df.to_dict(orient='records')
        # # get the table of the gwas catalog
        # gwas_table, gwascat_df = extract_gwascatalog(data_path, chrom, start_pos, end_pos, refGen)

        # Store data to enable download of the tables
        # session['gtex_df'] = gtex_df.to_csv(index=False)
        # session['df'] = df.to_csv(index=False)
        # session['svs_df'] = svs_df.to_csv(index=False)
        # session['gwascat_df'] = gwascat_df.to_csv(index=False)
        session['chrom'] = chrom
        session['start_pos'] = start_pos
        session['end_pos'] = end_pos
        session['gwas'] = gwas
        session['genes'] = genes
        session['svs'] = svs
        session['browse_type'] = browse_type
        session['refGen'] = refGen
        session['recomb_data'] = recomb_data.to_csv(index=False) if recomb == "Yes" else "None"
        session['exons'] = exons
        session['browse'] = browse
        session['plotype'] = plotype

        # return the html template and the url to the plot
        # return render_template("exploration.html", plot_url=plot_url, plot_gtex=plot_gtex, table_snps=snps_table, table_svs=svs_table, table_gwas=gwas_table, browse_value=browse, gwas=gwas)
        return render_template("exploration.html")
    elif 'df' in session:
        chrom = session['chrom']
        start_pos = session['start_pos']
        end_pos = session['end_pos']
        gwas = session['gwas']
        genes = session['genes']
        svs = session['svs']
        browse_type = session['browse_type']
        refGen = session['refGen']
        recomb_data = session['recomb_data']
        exons = session['exons']
        browse = session['browse']
        plotype = session['plotype']
        # df = pd.read_csv(StringIO(session.get('df')))
        # gtex_df = pd.read_csv(StringIO(session.get('gtex_df')))
        # svs_df = pd.read_csv(StringIO(session.get('svs_df')))
        # gwascat = pd.read_csv(StringIO(session.get('gwascat_df')))

        # Set up tables
        # df_sorted = df.sort_values(by='Pvalue', ascending=False)
        # df_sorted['Locus'] = df_sorted.apply(lambda x: str(x['Chrom']) + ':' + str(x['Position']), axis=1)
        # df_sorted['Alleles'] = df_sorted.apply(lambda x: str(x['Ref']) + '/' + str(x['Alt']), axis=1)
        # df_sorted = df_sorted[['Locus', 'Rsid', 'Gwas', 'Alleles', 'Pvalue']]
        # df_sorted['Pvalue'] = df_sorted['Pvalue'].round(2)
        # snps_table = df_sorted.to_dict(orient='records')
        # svs_table = svs_df.to_dict(orient='records')
        # gwas_table = gwascat.to_dict(orient='records')

        # Plot
        # img = scatterplot(df = df, chrom = chrom, start_pos = start_pos, end_pos = end_pos, gwas = gwas, genes = genes, svs = svs, browse_type = browse_type, refGen = refGen, recomb_data = recomb_data, exons = exons, browse = browse, plotype = plotype)
        # # set the plot url for showing on the application
        # plot_url = base64.b64encode(img.getvalue()).decode()
        # # then generate the GTEx plot
        # img_gtex = gtex_heatmap(gtex_df)
        # # set the plot url for showing on the application
        # plot_gtex = base64.b64encode(img_gtex.getvalue()).decode()

        # return the html template and the url to the plot
        # return render_template("exploration.html", plot_url=plot_url, plot_gtex=plot_gtex, table_snps=snps_table, table_svs=svs_table, table_gwas=gwas_table, browse_value=browse, gwas=gwas)
        return render_template("exploration.html")
    else:
        gwas = []
        # plot data
        plot_base64 = generate_plot()
        # Check if there are new inputs or it is still the previous run
        return render_template("example.html", plot_url=plot_base64)


@app.route('/plotly/', methods=["GET", "POST"])
def plotly():
    # fetch data
    # ...
    # plot data
    plot_plotly = plotly_plot()
    # Check if there are new inputs or it is still the previous run
    return render_template("plotly.html", plot_plotly=plot_plotly)


# http://127.0.0.1:5000/data/data_snp_sv/chr?chr=22&start=14000000&end=16000000&p=0.00000001
@app.route('/data/data_snp_sv/chr')
def chr():
    chrom = request.args.get('chr')
    p_val = float(request.args.get('p'))
    # size = int(request.args.get('size'))
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))

    df = pd.read_csv('./data/data_snp_sv/chr'+chrom+'.allQTLs.NEWSET.JOIN_size.txt', sep='\t')
    # df = df[(df['P'] < p_val) & (df['P'] > 0)].head(size)
    df = df[(df['P'] < p_val) & (df['P'] > 0)]
    df = df[(df['POS'] >= start) & (df['POS'] <= end)]
    df['P'] = df['P'].apply(lambda x: -math.log10(x))
    return Response(df.to_csv(index=False), mimetype="text/plain")


    # chunk = ""
    # row_count = 0
    # with open('./data/data_snp_sv/chr'+chrom+'.allQTLs.TE.tsv', 'r') as file:
    # with open('./data/data_snp_sv/chr'+chrom+'.allQTLs.NEWSET.JOIN_size.tsv', 'r') as file:
    #     reader = csv.reader(file)
    #     chunk += reader.__next__()[0]+'\n'
    #     for row in reader:
    #         if row_count >= start + size:
    #             break
    #         if row_count >= start:
    #             chunk += row[0]+'\n'
    #         row_count += 1

    # return Response(chunk, mimetype="text/plain")



    # df = pd.read_csv('./data/data_snp_sv/chr'+chrom+'.allQTLs.TE.tsv', sep='\t', skiprows=start, chunksize=size)
    # return Response(df, mimetype="text/plain")

    # with open("./data/data_snp_sv/chr22.allQTLs.TEcopy.tsv", "r") as f:
    #     content = f.read()
    # return Response(content, mimetype="text/plain")


# http://127.0.0.1:5000/data/summary_eqtls?chr=2&tissue=Whole_Blood&start=14000000&end=16000000
@app.route('/data/summary_eqtls')
def summary_eqtls():
    chrom = request.args.get('chr')
    tissue = request.args.get('tissue')
    start = int(request.args.get('start'))
    end = int(request.args.get('end'))
    df = pd.read_csv('./data/summary_eqtls/chr'+chrom+'tissues.csv', sep=',', names=['chrom', 'tissue', 'POS', 'val'])
    df = df[df['tissue'] == tissue]
    df = df[(df['POS'] >= start) & (df['POS'] <= end)]
    return Response(df.to_csv(index=False), mimetype="text/plain")


# http://127.0.0.1:5000/data/cytoband?chr=chr22
@app.route('/data/cytoband')
def cytoband():
    df = pd.read_csv('./data/CytobandIdeogram.csv', sep=',')
    chrom = request.args.get('chr')
    df = df[df['Chromosome'] == chrom]
    return Response(df.to_csv(index=False), mimetype="text/plain")

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
