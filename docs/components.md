**The concept of ElasticUI is to have one "view" of your index to which you can add aggregations, sorting, paging, filters by adding directives in your app. 
ElasticUI defines the following directives for this:**

euiIndex
---
The main directive to drop in to your project, probably on the `<body>` tag:

    <body ng-app="yourApp" eui-index="INDEX_NAME">

*Scope*

The **euiIndex** directive adds a property named **indexVM** ([view type definition][1]) to your scope, which you can now query for results and pagination info.

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

euiQuery
---
TODO

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

  [1]: ../src/controllers/IIndexScope.ts