# Libraries
from flask import Flask, request, render_template, send_file, session, make_response, redirect, url_for, jsonify

from io import BytesIO
import base64
import json
import numpy as np

import pandas as pd

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

######################################################################
######################################################################

# Set path to data
data_path = '/Data'
# df = pd.read_csv('./Data/data_example.tar/data_example/chr22.allQTLs.NEWSET.JOIN_size.txt')
df = pd.read_csv('./data_snp_sv/chr22.allQTLs.TE.txt', sep='\t')

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
    # fetch data
    # ...
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

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)