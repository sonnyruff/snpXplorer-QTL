""" 
Flask app for snpXplorer QTLs

To run the script:
    ./.venv/Scripts/activate
    flask run
"""

# Misc
from io import BytesIO
from io import StringIO
import base64
import math
import numpy as np
import sys

# Flask
from flask import Flask, request, render_template, session, Response

# Data
import pandas as pd

# Graphing
import matplotlib
import matplotlib.pyplot as plt
import plotly.io as pio
import plotly.graph_objs as go

# Other scripts
from matplotlib_tests import *
from app_functions import *

######################################################################
######################################################################

matplotlib.use('Agg')

# Set path to data
data_path = '/Data'

# Initialize the App
app = Flask(__name__)
app.secret_key = 'mysecretkey'
# Add configuration for the Session to save to redis
# app.config['SESSION_TYPE'] = 'redis'
# app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')
# app.config['SESSION_USE_SIGNER'] = True
# app.config['SECRET_KEY'] = 'secret'
# Session(app)

# --- Failed storing data ---
# route_args = []
# stored_df = pd.DataFrame([])

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
def example_page():
    if request.method == "POST":
        print("POST")
        # chrom = request.form["chrom"]
        browse = request.form["browse"]
        range = int(request.form["window"])
        p_val = float(request.form["p_val"])
        tissues = request.form.getlist('tissue')
 
        geneTrack = request.form.get("geneTrack") is not None
        tissueBetweenTrack = request.form.get("tissueBetweenTrack") is not None
        tissueTrack = request.form.get("tissueTrack") is not None
        snppValTrack = request.form.get("snppValTrack") is not None
        snpsvBetweenTrack = request.form.get("snpsvBetweenTrack") is not None
        svTrack = request.form.get("svTrack") is not None
 
        chrom, locus, start, end, browse_type = readBrowseOption(browse, range)

        print(request.form)
        print(session)

        session['chrom'] = chrom
        session['start_pos'] = start
        session['end_pos'] = end

        return render_template(
            "example.html",
            chrom=chrom,
            locus=locus,
            start=start,
            end=end,
            p_val=p_val,
            tissues=tissues,
            geneTrack=geneTrack,
            tissueBetweenTrack=tissueBetweenTrack,
            tissueTrack=tissueTrack,
            snppValTrack=snppValTrack,
            snpsvBetweenTrack=snpsvBetweenTrack,
            svTrack=svTrack
        )
    
    elif 'df' in session:
        print("df")
        chrom = session['chrom']
        start_pos = session['start_pos']
        end_pos = session['end_pos']
        browse = session['browse']
        
        return render_template("example.html")
    
    else:
        print("else")
        return render_template("example.html")

# http://127.0.0.1:5000/plotly
@app.route('/plotly/', methods=["GET", "POST"])
def plotly_page():
    # fetch data
    # ...
    # plot data
    plot_plotly = plotly_plot()
    # Check if there are new inputs or it is still the previous run
    return render_template("plotly.html", plot_plotly=plot_plotly)


# http://127.0.0.1:5000/data/data_snp_sv?chr=22&start=14000000&end=16000000&p=0.00000001
@app.route('/data/data_snp_sv')
def get_chromosome_data():
    chrom = request.args.get('chr')
    p_val = float(request.args.get('p'))
    # size = int(request.args.get('size'))
    start = int(float(request.args.get('start')))
    end = int(float(request.args.get('end')))

    #region --- Failed storing data ---
    # global route_args
    # global stored_df

    # if(route_args == [chrom, p_val, start, end]):
    #     print(datetime.datetime.now())
    #     print("Returning previous df")
    #     print(stored_df.head())
    #     return Response(stored_df.to_csv(index=False), mimetype="text/plain")
    # else:
    #     print(datetime.datetime.now())
    #     print("Returning newly filtered df")
    #     route_args = [chrom, p_val, start, end]
    #endregion --- Failed storing data ---

    df = pd.read_csv('./data/data_snp_sv/chr'+chrom+'.allQTLs.NEWSET.JOIN_size.txt', sep='\t')
    df = df.filter(['POS', 'P', 'SV_ID'], axis=1)
    # df = df.reindex(columns=['POS', 'P'])


    # https://medium.com/@thomas-jewson/faster-pandas-what-is-the-most-performant-filtering-method-a5dbb8f694dc
    # https://pandas.pydata.org/docs/user_guide/advanced.html
    # https://stackoverflow.com/questions/14916358/reshaping-dataframes-in-pandas-based-on-column-labels
    # df = df[(df['P'] < p_val) & (df['P'] > 0)]
    df = df.loc[np.where((df["P"] < p_val) & (df["P"] > 0))]

    # df = df[(df['POS'] >= start) & (df['POS'] <= end)]
    df = df[(df['POS'].values >= start) & (df['POS'].values <= end)]
    # df = df.loc[np.where((df['POS'] >= start) & (df['POS'] <= end))]


    df['svStart'] = df['SV_ID'].apply(lambda x: x.split(':')[1].split('-')[0])
    df['svEnd'] = df['SV_ID'].apply(lambda x: x.split('-')[1].split('_')[0])
    df['P'] = df['P'].apply(lambda x: -math.log10(x))
    df.drop(columns=['SV_ID'], inplace=True)
    df['#CHROM'] = chrom

    return Response(df.to_csv(index=False), mimetype="text/plain")


# http://127.0.0.1:5000/data/summary_eqtls?chr=2&tissue=Whole_Blood&start=24400000&end=25000000&p=0.00000001
@app.route('/data/summary_eqtls')
def summary_eqtls():
    chrom = request.args.get('chr')
    tissue = request.args.get('tissue')
    start = int(float(request.args.get('start')))
    end = int(float(request.args.get('end')))
    p_val = float(request.args.get('p'))

    # Read from pre-gen file
    # df = pd.read_csv('./data/summary_eqtls/chr'+chrom+'tissues.csv', sep=',', names=['#CHROM', 'tissue', 'gene', 'POS', 'ref', 'alt', 'val', 'P'])
    # df = df[df['tissue'] == tissue]
    # df = df[(df['POS'].values >= start) & (df['POS'].values <= end)]
    # df['P'] = df['P'].apply(lambda x: -math.log10(x))

    # Load datasets and join during query
    # SVs
    print("Loading data_snp_sv chromosome" + str(chrom))
    df_snp = pd.read_csv('./data/data_snp_sv/chr'+str(chrom)+'.allQTLs.NEWSET.JOIN_size.txt', sep='\t')
    # df_snp = pd.read_csv('./data/data_snp_sv/chr'+str(chrom)+'.allQTLs.TE.txt', sep='\t')
    # print("df_snp : %s" % str(df_snp.shape))
    df_snp = df_snp.filter(['POS', 'P', 'SV_ID'], axis=1)
    df_snp['svStart'] = df_snp['SV_ID'].apply(lambda x: x.split(':')[1].split('-')[0])
    df_snp['svEnd'] = df_snp['SV_ID'].apply(lambda x: x.split('-')[1].split('_')[0])
    df_snp.drop(columns=['SV_ID'], inplace=True)
    df_snp = df_snp[(df_snp['POS'].values >= start) & (df_snp['POS'].values <= end)]
    # QTLs
    print("Loading summary_eqtls chromosome" + str(chrom))
    df_eqtl = pd.read_csv('./data/summary_eqtls/chr'+str(chrom)+'_summary_eqtls.txt', sep='\t', names=['a', 'b'])
    # print("df_eqtl : %s" % str(df_eqtl.shape))
    df_eqtl[['chr', 'locus', 'ref', 'alt', 'assembly']] = df_eqtl['a'].str.split('_', n=4, expand=True) # Split initial columns into usable ones
    df_eqtl['locus'] = df_eqtl['locus'].astype(int)
    df_eqtl['tissues'] = df_eqtl['b'].str.split(';') # Fucks up because there is a ; at the end
    df_eqtl['tissues'] = df_eqtl['tissues'].apply(lambda x: x[:-1]) # Remove last empty element
    df_eqtl['tissues'] = df_eqtl['tissues'].apply(lambda x: stringlist_to_listlist(x))
    df_eqtl.drop(columns=['a', 'b'], inplace=True)
    df_eqtl.drop(columns=['chr', 'assembly'], inplace=True)
    # Join on POS/locus
    print("Joining")
    df_snp_eqtl = df_snp.set_index('POS').join(df_eqtl.set_index('locus'), how='inner')

    print("Transforming")
    # list = ["#CHROM,tissue,gene,POS,ref,alt,val,P\n"]
    transformed_tissues = []
    for index, row in df_snp_eqtl.iterrows():
        for trow in row['tissues']:
            # Add values in array after tissue name, index = POS
            if str(trow[0]) == tissue and float(trow[3]) < p_val:
                p_new = -math.log10(float(trow[3]))
                transformed_tissues.append(str(chrom)+","+str(trow[0])+","+str(trow[1])+","+str(index)+","+row['ref']+","+row['alt']+","+str(trow[2])+","+str(p_new)+"\n")
    
    # list to df
    print("Converting")
    df = pd.read_csv(StringIO(''.join(transformed_tissues)), sep=',', names=['#CHROM', 'tissue', 'ens', 'POS', 'ref', 'alt', 'val', 'P'])
    # print("df : %s" % str(df.shape))

    # Ensemble to GeneName
    print("Loading Ensemble_to_GeneName")
    df_ens2gene = pd.read_csv('./data/Ensemble_to_GeneName.txt', sep='\t', names=['ens', 'gene'])
    # print("df_ens2gene : %s" % str(df_ens2gene.shape))
    df = df.set_index('ens').join(df_ens2gene.set_index('ens'), how='inner')
    df.reset_index(inplace=True)
    # print("df + df_ens2gene: %s" % str(df.shape))

    # Genes
    print("Loading Genes")
    df_genes = pd.read_csv('./data/genes_hg38.txt', sep='\t')
    # print("df_genes : %s" % str(df_genes.shape))
    df_genes = df_genes[df_genes['chrom'] == "chr"+str(chrom)]
    df_genes = df_genes.filter(['name', 'txStart', 'txEnd', '#geneName'])
    # df_genes['color'] = df_genes['#geneName'].apply(lambda x: hex(abs(hash(x)))[6:])
    df = df.set_index('gene').join(df_genes.set_index('#geneName'), how='inner')
    df.reset_index(inplace=True)
    # print("df + df_ens2gene + df_genes: %s" % str(df.shape))

    print("Sending")
    return Response(df.to_csv(index=False), mimetype="text/plain")


@app.route('/data/genes')
def get_genes():
    df = pd.read_csv('./data/genes_hg38.txt', sep='\t')
    # df['color'] = df['#geneName'].apply(lambda x: hex(abs(hash(x)))[6:])
    return Response(df.to_csv(index=False), mimetype="text/plain")


# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)
