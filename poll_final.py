## poll_total.py
# -*- coding: utf-8 -*-

import sys, json, numpy as np
import requests
import pandas as pd
from pandas import Series, DataFrame
from pandas.io.json import json_normalize

url = 'http://media.daum.net/election/vote/api/2017_0509/count/0.json?callback=CountPage'

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that

    resp = requests.get(url)

    return pd.read_json(resp.text[10:-2])

def main():
    #get our data as an array from read_in()
    lines = read_in()

    #return the sum to the output stream
    print lines.reset_index().to_json(orient='records')

#start process
if __name__ == '__main__':
    main()
