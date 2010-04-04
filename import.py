#!/usr/bin/env python

'''This script is a one-off that imports my Filemaker recipes - exported to cvs
- into couchpotato
'''
import sys
import codecs
import json
from httplib2 import Http
from optparse import OptionParser

class Recipe:
    def __init__(self, line):

        def toint(s):
            if not s:
                return 0
            return int(s)

        def tofloat(s):
            if not s:
                return 0.0
            return float(s)
        
        def ingredients(rows):
            names = rows[1].split('\x1d')
            units = rows[2].split('\x1d')
            quantities = [tofloat(r) for r in rows[3].split('\x1d')]

            return [ {'name': t[0], 'quantity': t[1], 'unit': t[2] }
                     for t in zip(names, quantities, units)]

        # the csv parser barfs at utf-8, so I take shortcuts
        # that just happen to work with my data
        line = line.strip()
        if line[0] == '"':
            line = line[1:]
        if line[-1] == '"':
            line = line[:-1]
        rows = line.split('","')

        try:
            self.json = json.dumps({
                'type': 'recipe',
                'title': rows[0],
                'ingredients': ingredients(rows),
                'description': rows[4].replace('\x0b', '\n'),
                'serves': toint(rows[9]),
                }).encode('utf-8')
        except:
            print('\nError at %s' % rows[0])
            print(line)
            raise

    def export(self, http, baseurl):
        url = baseurl + '/recipes/'
        resp, contents = http.request(
            url, 'POST', self.json)
        if resp.status >= 400:
            raise RuntimeError, json.loads(contents)

if __name__ == '__main__':

    parser = OptionParser()
    parser.add_option("-f", "--file", default='rezepte.csv',
                      help="read recipes from FILE")
    parser.add_option("-c", "--couchdb", default='http://localhost:5984',
                      help="URL for CouchDB")
    parser.add_option("-e", "--export", action="store_true",
                      help="export to CouchDb")
    parser.add_option("-u", "--user", default="lars", help="user name")
    parser.add_option("-p", "--password", default="33rpm", help="password")

    options, args = parser.parse_args()
    
    # sys.stdout = codecs.getwriter('utf-8')(sys.stdout)
    f = codecs.open(options.file, 'r', 'macroman')
    # readlines doesn't work with macroman encoded files, it seems 
    lines = f.read().split('\r')

    http = None
    if options.export:
        http = Http()

    for l in lines:
        if l:
            recipe = Recipe(l)
            print(recipe.json)
            if options.export:
                recipe.export(http, options.couchdb)
