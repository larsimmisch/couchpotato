Overview
========

couchpotato is a CouchApp for storing recipes. It is bare-bones and not 
really intended for use by anyone except me yet.

Features
========

* Fulltext searching using Lucene

Installation
============

Install couchdb (obviously)

Install [couchdb-lucene](https://github.com/rnewson/couchdb-lucene)
> git clone https://github.com/rnewson/couchdb-lucene.git

The instructions in couchdb-lucene worked fine for me.

Install couchapp:
> easy_install couchapp

Install couchpotato:
> git clone https://github.com/larsimmisch/couchpotato.git 

> cp .couchapprc.template .couchapprc

Adjust .couchapprc and:

> couchapp push

Future plans
============

* MealMaster import and export (in progress)
* Nutrition database
* Markdown/photos