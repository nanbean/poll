## poll_total.py
# -*- coding: utf-8 -*-

import sys, json, numpy as np
import requests
import pandas as pd
from pandas import Series, DataFrame
from pandas.io.json import json_normalize

url = 'http://comment.daum.net/poll/polls/tags/of/all/지지율,' + '종합' + '?offset=0&limit=1000'

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that

    resp = requests.get(url)

    return pd.read_json(resp.text)['data']

def main():
    #get our data as an array from read_in()
    lines = json_normalize(read_in())

    def findMoon(x):
        for i in x:
            if (i['title'] == u'문재인'):
                return i['rate']
        return 0

    lines['문재인'] = lines['options'].apply(findMoon)

    def findAhn(x):
        for i in x:
            if (i['title'] == u'안철수'):
                return i['rate']
        return 0

    lines['안철수'] = lines['options'].apply(findAhn)

    def findHong(x):
        for i in x:
            if (i['title'] == u'홍준표'):
                return i['rate']
        return 0

    lines['홍준표'] = lines['options'].apply(findHong)

    def findYou(x):
        for i in x:
            if (i['title'] == u'유승민'):
                return i['rate']
        return 0

    lines['유승민'] = lines['options'].apply(findYou)

    def findSim(x):
        for i in x:
            if (i['title'] == u'심상정'):
                return i['rate']
        return 0

    lines['심상정'] = lines['options'].apply(findSim)


    #return the sum to the output stream
    print lines.reset_index().to_json(orient='records')

#start process
if __name__ == '__main__':
    main()
