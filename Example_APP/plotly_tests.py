import numpy as np
import pandas as pd
import plotly
import plotly.graph_objs as go
import plotly.express as px
from typing import Any


def pandas_df():
    arr_1 = np.random.randn(50, 4)
    df_1 = pd.DataFrame(arr_1, columns=['A', 'B', 'C', 'D'])
    print(df_1.head())


def minimal_plot():
    x_values = [1, 2, 3, 4, 5]
    y_values = [2, 4, 6, 8, 10]
    trace = go.Scatter(x=x_values, y=y_values)
    fig = go.Figure(data=trace)
    # fig.show()


def stocks_plot():
    df_stocks = px.data.stocks()
    # fig1 = px.line(df_stocks, x='date', y=['GOOG', 'AAPL'], labels={'x': 'Date', 'y':'Price'})
    # fig1.show()

    fig2 = go.Figure()
    fig2.add_trace(go.Scatter(x=df_stocks.date, y=df_stocks.AAPL,
                              mode='lines+markers', name='Apple'))
    fig2.add_trace(go.Scatter(x=df_stocks.date, y=df_stocks.GOOG,
                              mode='lines+markers', name='Google',
                              line=dict(color='firebrick', width=2,
                                        dash='dash')))
    # fig2.show()


def querying():
    df_us = px.data.gapminder().query("country == 'United States'")
    fig = px.bar(df_us, x='year', y='pop')


def scatter_plot():
    # df_iris = px.data.iris()
    # fig = px.scatter(df_iris, x='sepal_width', y='sepal_length', color='species', size='petal_length', hover_data=['petal_width'] )
    # fig.show()
    df = px.data.iris()
    # fig = px.scatter_matrix(df,
    #     dimensions=["sepal_length", "sepal_width", "petal_length", "petal_width"],
    #     color="species")
    # fig = px.parallel_coordinates(df, color="species_id", labels={"species_id": "Species",
    #             "sepal_width": "Sepal Width", "sepal_length": "Sepal Length",
    #             "petal_width": "Petal Width", "petal_length": "Petal Length", },
    #                          color_continuous_scale=px.colors.diverging.Tealrose,
    #                          color_continuous_midpoint=2)
    fig = px.density_heatmap(df, x="sepal_width", y="sepal_length", marginal_x="rug", marginal_y="histogram")
    fig.show()


def lkajsdf():
    df = pd.read_csv('https://raw.githubusercontent.com/plotly/datasets/master/earthquakes-23k.csv')
    fig = px.density_mapbox(df, lat='Latitude', lon='Longitude', z='Magnitude', radius=10,
                            center=dict(lat=0, lon=180), zoom=0,
                            mapbox_style="open-street-map")
    fig.show()


def jklakk():
    df_tips = px.data.tips()
    fig = px.parallel_categories(df_tips, color="size", color_continuous_scale=px.colors.sequential.Inferno)
    fig.show()

"""
Args:
    tissues: ["T1_ENSG#_#_#", "T2_ENSG#_#_#", ...]
Returns:
    [["T1", "ENSG#", #, #], ["T2", "ENSG#", #, #], ...]
"""
def stringlist_to_listlist(tissues: list) -> list[list[str]]:
    output = []
    for i in tissues:
        output.append(split_tissue(i))
    return output

"""
Args:
    tissue: Adipose_Subcutaneous_ENSG00000206195.10_0.730738_1.14214e-15
Returns:
    ['Adipose_Subcutaneous', 'ENSG00000206195.10', '0.730738', '1.14214e-15']
"""
def split_tissue(tissue: str) -> list[str]:
    arr: list[str] = tissue.split('_')
    return ["_".join(arr[:-3]), arr[-3], arr[-2], arr[-1]]


# TODO Fix the horribly inconsistent filtering, dropping and everything
def parallel_plot(): # https://plotly.com/python/parallel-coordinates-plot/
    # SNPs
    df_snp_ = pd.read_csv('./data/data_snp_sv/chr22.allQTLs.TE.tsv', sep='\t')
    df_snp = df_snp_.filter(['POS', 'P', 'SV_ID'], axis=1)
    # df_snp = df_snp.nlargest(1000, 'P') # .sort_values(by=['P']).head(1000)

    # Genes
    # df_genes = pd.read_csv('./data/genes_hg38.txt', sep='\t')

    # QTLs
    df_eqtl = pd.read_csv('./data/summary_eqtls/chr22_summary_eqtls.txt', sep='\t', names=['a', 'b'])
    # Split initial columns into usable ones
    df_eqtl[['chr', 'POS', 'ref', 'alt', 'gen_ref']] = df_eqtl['a'].str.split('_', n=4, expand=True)
    df_eqtl['POS'] = df_eqtl['POS'].astype(int)
    df_eqtl['tissues'] = df_eqtl['b'].str.split(';') # Fucks up because there is a ; at the end
    df_eqtl['tissues'] = df_eqtl['tissues'].apply(lambda x: x[:-1]) # Remove last empty element
    df_eqtl['tissues'] = df_eqtl['tissues'].apply(lambda x: stringlist_to_listlist(x))
    # Remove columns
    df_eqtl.drop(columns=['a', 'b'], inplace=True)
    df_eqtl.drop(columns=['chr', 'ref', 'alt', 'gen_ref'], inplace=True)

    # Join on POS/locus
    # df_snp_.set_index('POS').join(df_eqtl_.set_index('locus'), how='inner')
    df_X = pd.merge(df_snp, df_eqtl, on="POS", how="inner")


    bp_range: int = 10000

    snp = df_X['POS']
    sv = df_X['SV_ID'].apply(lambda x: int(x.split("_")[1]))
    min_p = df_X['P'].min()
    max_p = df_X['P'].max()
    scaled_P = (df_X['P'] - min_p) / (max_p - min_p)

    fig = go.Figure(data=
        go.Parcoords(
            line_color=scaled_P,
            dimensions = list([
                dict(range = snp.agg(['min', 'max']),
                    label = 'SNP', values = snp),
                dict(range = sv.agg(['min', 'max']),
                    label = 'SV', values = sv),
                dict(range = sv.agg(['min', 'max']),
                    label = 'SV', values = sv)
            ])
        )
    )
    fig.show()


parallel_plot()