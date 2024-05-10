import numpy as np
import pandas as pd
import plotly
import plotly.graph_objs as go
import plotly.express as px


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


scatter_plot()