# Libraries
import numpy as np
import pandas as pd
import csv

# def readBrowseOption(data_path, browse, window, refGen):
# def readBrowseOption(browse, window):
#     # check if input is in the form 1:100000
#     if ':' in browse and '-' not in browse:
#         chrom, start_pos, end_pos, browse_type = int(browse.split(':')[0]), int(browse.split(':')[1]) - window, int(browse.split(':')[1]) + window, 'Single position'
#     elif ':' in browse and '-' in browse:
#         chrom, start_pos, end_pos, browse_type = int(browse.split(':')[0]), int(browse.split(':')[1].split('-')[0]) - window, int(browse.split(':')[1].split('-')[1]) + window, 'Interval'
#     elif 'rs' in browse:
#         snps = pd.DataFrame(8(browse.replace(' ', '')).locations)
#         chrom, pos, browse_type = snps['chromosomeName'][0], snps['chromosomePosition'][0], 'RsID'
#         # if refGen == 'GRCh37':
#         #     converter = get_lifter('hg38', 'hg19')
#         #     start_pos, end_pos = converter[chrom][pos][0][1] - window, converter[chrom][pos][0][1] + window
#         # else:
#         #     start_pos, end_pos = pos - window, pos + window
#         start_pos, end_pos = pos - window, pos + window
#     else:
#         data_path = '%s/databases/Genes/genes_hg19.txt.gz' %(data_path) if refGen == 'GRCh37' else '%s/databases/Genes/genes_hg38.txt.gz' %(data_path)
#         genes = list(os.popen('zgrep -i -w %s %s' %(browse.replace(' ', ''), data_path)))[0].split('\t')
#         if refGen == "GRCh37":
#             chrom, start_pos, end_pos, browse_type = genes[2].replace('chr', ''), int(genes[4]) - window, int(genes[5]) + window, 'Gene'
#         else:
#             chrom, start_pos, end_pos, browse_type = genes[1].replace('chr', ''), int(genes[3]) - window, int(genes[4]) + window, 'Gene'
#     return chrom, start_pos, end_pos, browse_type


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