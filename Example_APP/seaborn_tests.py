import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import scipy

tips = sns.load_dataset("tips")
iris = sns.load_dataset("iris")
titanic = sns.load_dataset("titanic")
planets = sns.load_dataset("planets")


def simple_plot():
    # print(sns.get_dataset_names())
    sns.scatterplot(x="tip", y="total_bill", data=tips, hue="day", size="size", palette="YlGnBu")
    plt.show()

def histogram_plot():
    sns.histplot(tips['tip'], kde=True, bins=15)
    plt.show()

def box_plot():
    sns.boxplot(x="day", y="tip", data=tips, hue="sex", palette="YlGnBu")
    plt.show()

def strip_plot():
    sns.stripplot(x="day", y="tip", data=tips, hue="sex", palette="YlGnBu", dodge=True)
    plt.show()

def joint_plot():
    # sns.jointplot(x="tip", y="total_bill", data=tips)
    # sns.jointplot(x="tip", y="total_bill", data=tips, kind="reg")
    # sns.jointplot(x="tip", y="total_bill", data=tips, kind="kde")
    sns.jointplot(x="tip", y="total_bill", data=tips, kind="hex", cmap="icefire")
    # sns.jointplot(x="tip", y="total_bill", data=tips, hue="day", palette="YlGnBu")
    plt.show()

def pair_plot():
    sns.pairplot(titanic.select_dtypes(['number']), hue="pclass")
    plt.show()

def heat_map():
    sns.heatmap(titanic.corr(numeric_only=True), annot=True, cmap="icefire")
    plt.show()

def cluster_plot():
    sns.clustermap(iris.drop("species", axis=1))
    plt.show()


################################################################################
################################################################################


def main():
    df = pd.read_csv('./data_snp_sv/chr22.allQTLs.TE.txt', sep='\t')
    # print(df.head)
    # print(df.groupby('SV_ID').count().head)


main()