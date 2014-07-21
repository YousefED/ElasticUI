**The concept of ElasticUI is to have one "view" of your index to which you can add aggregations, 
sorting, paging, filters, highlighting by adding directives in your app. 
ElasticUI defines the following directives for this:**

euiIndex
---
The main directive to drop in to your project, probably on the `<body>` tag:

    <body ng-app="yourApp" eui-index="'INDEX_NAME'">

**Scope**

The **euiIndex** directive adds a property named **indexVM** ([view type definition][1]) to your scope, which you can now query for results and pagination info.

euiAggregation
---
Use this to add an aggregation to your view, e.g.:

    <ul eui-aggregation="ejs.TermsAggregation('agg_name').field('AGG_FIELD').size(10)">
        <li ng-repeat="bucket in aggResult.buckets">...</li>
    </ul>

**Scope**

Creates a new inherited scope, where you can access the results of this specific aggregation using **aggResult**.

**Attributes**

*euiFilterSelf: boolean = true (optional)*: By default, all filters defined in the view are applied to the aggregation. 
When setting *eui-filter-self="false"* on the *euiAggregation*, only filters are applied that are different from the aggregation field.
This behaviour is useful for rendering a facet (e.g.: list of checkboxes), which you don't want to update after changing the facet-selection.

euiFilter
---
Add a filter to your view, e.g.:

    <input type="checkbox" eui-filter="ejs.TermsFilter('field', 'value')" ng-model="filter.enabled">
**Scope**

Creates a new inherited scope containing a **filter** object. Use the property **enabled** as demonstrated above to activate the filter.

**Attributes**

*euiEnabled (optional)*: See below

euiQuery
---
Add a query to your view (if not set, default query is *Match All*). E.g.:

    <input type="text" eui-query="ejs.MatchQuery(field, querystring)" ng-model="querystring"/>

**Scope**

Creates a new inherited scope containing a **query** object. Use the property **enabled** to activate the query.

**Attributes**

*euiEnabled (optional)*: See below


euiSort
---
Set the sort order of the results, e.g.:

    <body eui-sort="ejs.Sort(field).order('desc')" eui-enabled="true">

**Scope**

Creates a new inherited scope containing a **sorting** object. Use the property **enabled** to activate the sort.

**Attributes**

*euiEnabled (optional)*: See below


euiHighlight
---
Allows to highlight search results on one or more fields, e.g.:

    <body eui-highlight="ejs.Highlight(field).preTags('<mark>').postTags('</mark>')" eui-enabled="true">

**Scope**

Creates a new inherited scope containing a **highlighting** object. Use the property **enabled** to activate the highlighting.

**Attributes**

*euiEnabled (optional)*: See below


Attribute euiEnabled
---
On directives supporting *eui-enabled* (*euiSort*, *euiFilter*, *euiQuery*, *euiHighlight*), 
you can use this attribute instead of manipulating *scope.(sorting|query|filter|highlight).enabled* to enable the sort/query/filter/highlight.


euiOrFilter
---
Combines filters defined as children (i.e.: within its scope) using a **should** (OR) BoolFilter. Normally, when multiple filters are defined, they are combined using **must** (AND). E.g.:

    <div eui-or-filter>
        <input type="checkbox" eui-filter="ejs.TermsFilter('field1', 'value1')" ng-model="filter.enabled">
        <input type="checkbox" eui-filter="ejs.TermsFilter('field2', 'value2')" ng-model="filter.enabled">
        <input type="checkbox" eui-filter="ejs.TermsFilter('field3', 'value3')" ng-model="filter.enabled">
    </div>

This example would render 3 checkboxes. When all checkboxes are selected, documents matching at least one of the 3 filters will be returned. 
Without the euiOrFilter directive, only documents matching all selected filters would be returned.


Charts
---
TODO

  [1]: ../src/controllers/IIndexScope.ts
