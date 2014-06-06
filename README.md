ElasticUI
=========

ElasticUI is a set of AngularJS directives making it easy to rapidly prototype a frontend on top of ElasticSearch. It builds upon the elastic.js implementation of the ElasticSearch DSL.

Getting started
---
Add the following files to your Angular project:
 - elasticui.js from dist/
 - elastic.js from [fullscale/elastic.js][1]
 - elasticsearch.angular.js from [elasticsearch.org][2]

Set up ElasticUI in your project by defining your ElasticSearch host as *euiHost*:

    angular.module('yourApp', ['elasticui']).constant('euiHost', 'http://localhost:9200');

The concept of ElasticUI is to have one "view" of your index to which you can add aggregations, sorting, paging, filters by adding directives in your app.

Tutorial
---
The easiest way to get started is to walk through the [tutorial files][3] and connect them to your own index.

Components
===

euiIndex
---
The main directive to drop in to your project, probably on the `<body>` tag:

    <body ng-app="yourApp" eui-index="INDEX_NAME">

*Scope*

The **euiIndex** directive adds a property named **indexVM** ([view type definition][4]) to your scope, which you can now query for results and pagination info.

euiAggregation
---
Use this to add an aggregation to your view, e.g.:

    <ul eui-aggregation="ejs.TermsAggregation('agg_name').field('AGG_FIELD').size(10)">
        <li ng-repeat="bucket in aggResult.buckets">...</li>
    </ul>

*Scope*

Creates a new inherited scope, where you can access the results of this specific aggregation using **aggResult**.

euiFilter
---
Add a filter to your view, e.g.:

    <input type="checkbox" eui-filter="ejs.TermsFilter('field', 'value')" ng-model="filter.enabled">
*Scope*

Creates a new inherited scope containing a **filter** object. Use the property *enabled* as demonstrated above to activate the filter.

euiSort
---
TODO

euiEnabled
---
TODO

euiOrFilter
---
TODO

euiFilterSelf
---
TODO

Charts
---
TODO


  [1]: http://github.com/fullscale/elastic.js
  [2]: http://www.elasticsearch.org/guide/en/elasticsearch/client/javascript-api/current/browser-builds.html
  [3]: examples/tutorial
  [4]: src/controllers/IIndexScope.ts
