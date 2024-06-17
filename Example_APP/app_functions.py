# Libraries
import numpy as np
import pandas as pd
import csv
from pandasgwas import get_variants_by_variant_id

# def readBrowseOption(data_path, browse, window, refGen):
def readBrowseOption(browse, window):
    if ':' in browse and '-' not in browse: # 1:100000
        words = browse.split(':')
        chrom, start_pos, end_pos, browse_type = int(words[0]), int(words[1]) - window, int(words[1]) + window, 'Single position'
    elif ':' in browse and '-' in browse: # 1:100000-200000
        words = browse.split(':')
        chrom, start_pos, end_pos, browse_type = int(words[0]), int(words[1].split('-')[0]) - window, int(words[1].split('-')[1]) + window, 'Interval'
    elif 'rs' in browse:
        snps = pd.DataFrame(get_variants_by_variant_id(browse.replace(' ', '')).locations)
        chrom, pos, browse_type = int(snps['chromosomeName'][0]), snps['chromosomePosition'][0], 'RsID'
        start_pos, end_pos = (pos - window).item(), (pos + window).item() # .item() converts numpy.int64 to int
    else:
        data_path = './data/genes_hg38.txt'
        df = pd.read_csv(data_path, sep='\t')
        genes = df[df['#geneName'] == browse].to_numpy()[0]
        chrom, start_pos, end_pos, browse_type = genes[1].replace('chr', ''), int(genes[3]) - window, int(genes[4]) + window, 'Gene'

    return chrom, start_pos, end_pos, browse_type


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
    ['Adipose_Subcutaneous', 'ENSG00000206195', '0.730738', '1.14214e-15']
"""
def split_tissue(tissue: str) -> list[str]:
    arr: list[str] = tissue.split('_')
    return ["_".join(arr[:-3]), arr[-3].split('.')[0], arr[-2], arr[-1]]
