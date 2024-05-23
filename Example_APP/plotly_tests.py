import os
import numpy as np
import pandas as pd
import csv
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


####################################################################################################
####################################################################################################


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


def transform_summary_eqtls(df_snp_eqtl, chrom):
    print("Transforming chromosome " + str(chrom) + " summary eqtls into new format, this may take a while...")
    # Transform into dict
    # dict = {}
    list = []
    for index, row in df_snp_eqtl.iterrows():
        for tissue in row['tissues']:
            # Add values in array after tissue name, index = POS
            # if tissue[0] not in dict:
            #     dict[tissue[0]] = [[index, tissue[2]]]
            # else:
            #     dict[tissue[0]].append([index, tissue[2]])

            # Add values all under eachother
            list.append(str(chrom)+","+str(tissue[0])+","+str(index)+","+str(tissue[2]))

    # Transform into DataFrame
    # df = pd.DataFrame(columns=['tissue', 'val'])
    # for index, row in df_snp_eqtl.iterrows():
    #     for tissue in row['tissues']:
    #         if tissue[0] not in dict:
    #             # dict[tissue[0]] = [index, tissue[2]]
    #             df = df._append({'tissue':tissue[0], 'val':[index, tissue[2]]}, ignore_index=True)
    #         else:

    # df = pd.DataFrame.from_dict(dict, orient='index') # Because df.DataFrame(dict) didn't work. Why am I even transforming it into a DataFrame?
    # write df to csv file
    # df.to_csv('./data/summary_eqtls/chr'+chrom+'tissues.csv')

    # write dict to csv file
    # with open('./data/summary_eqtls/chr'+chrom+'tissues.csv', 'w') as f:
    #     for key in dict:
    #         f.write("%s,%s\n"%(key, dict[key]))

    # write list to csv file
    with open('./data/summary_eqtls/chr'+chrom+'tissues.csv', 'w') as f:
        for item in list:
            f.write("%s\n"%item)


# TODO Fix the horribly inconsistent filtering, dropping and everything
def parallel_plot(): # https://plotly.com/python/parallel-coordinates-plot/
    chrom = 2

    # SNPs and TEs
    df_snp_ = pd.read_csv('./data/data_snp_sv/chr'+str(chrom)+'.allQTLs.TE.txt', sep='\t')
    df_snp = df_snp_.filter(['POS', 'P', 'SV_ID'], axis=1)
    # df_snp = df_snp.nlargest(1000, 'P') # .sort_values(by=['P']).head(1000)

    # Genes
    df_genes_ = pd.read_csv('./data/genes_hg38.txt', sep='\t')
    df_genes = df_genes_[df_genes_['chrom'] == "chr"+str(chrom)]
    df_genes = df_genes.filter(['name', 'txStart', 'txEnd', '#geneName'])

    # QTLs
    df_eqtl = pd.read_csv('./data/summary_eqtls/chr'+str(chrom)+'_summary_eqtls.txt', sep='\t', names=['a', 'b'])
    # Split initial columns into usable ones
    df_eqtl[['chr', 'locus', 'ref', 'alt', 'gen_ref']] = df_eqtl['a'].str.split('_', n=4, expand=True)
    df_eqtl['locus'] = df_eqtl['locus'].astype(int)
    df_eqtl['tissues'] = df_eqtl['b'].str.split(';') # Fucks up because there is a ; at the end
    df_eqtl['tissues'] = df_eqtl['tissues'].apply(lambda x: x[:-1]) # Remove last empty element
    df_eqtl['tissues'] = df_eqtl['tissues'].apply(lambda x: stringlist_to_listlist(x))
    # Remove columns
    df_eqtl.drop(columns=['a', 'b'], inplace=True)
    df_eqtl.drop(columns=['chr', 'ref', 'alt', 'gen_ref'], inplace=True)

    # Join on POS/locus
    df_snp_eqtl = df_snp.set_index('POS').join(df_eqtl.set_index('locus'), how='inner')
    # df_snp_eqtl = df_snp_eqtl.head(100)
    # df_snp_eqtl = pd.merge(df_snp, df_eqtl, on="POS", how="inner")



    
    print(df_snp_eqtl)

    if not os.path.exists('./data/summary_eqtls/chr'+str(chrom)+'tissues.csv'):
        transform_summary_eqtls(df_snp_eqtl, str(chrom))


    return

    bp_range: int = 10000

    snp = df_snp_eqtl['POS']
    sv = df_snp_eqtl['SV_ID'].apply(lambda x: int(x.split("_")[1]))
    min_p = df_snp_eqtl['P'].min()
    max_p = df_snp_eqtl['P'].max()
    scaled_P = (df_snp_eqtl['P'] - min_p) / (max_p - min_p)

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


def test():
    # load data into df
    df = pd.read_csv('./data/summary_eqtls/chr2tissues.csv', sep=',', names=['chrom', 'tissue', 'POS', 'val'])
    df = df[df['tissue'] == 'Whole_Blood']
    print(df)
    # print(df['tissue'].unique())


parallel_plot()
# test()