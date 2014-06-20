**The project includes a number of widgets (directives) building upon the [ElasticUI components][1] for simple faceting and search.
Reviewing how they work is a good way to get started with the project.**

euiChecklist
---
A searchbox which performs a MatchQuery on the specified field.

*Example use:*

    <eui-searchbox field="'textField'"></eui-searchbox>

*Corresponding code:*

Using this prebuilt directive would correspond to writing:

    <input type="text" eui-query="ejs.MatchQuery('textField', querystring)" ng-model="querystring" eui-enabled="querystring.length" />



euiChecklist
---
*Example use:*

    <eui-singleselect field="'facet_field'" size="5"></eui-singleselect>

*Extended code:*

Using this prebuilt directive would correspond to writing:

    <ul class="nav nav-list" eui-aggregation="ejs.TermsAggregation('facet_field').field('facet_field').size(5)">
        <li ng-repeat="bucket in aggResult.buckets">
            <label class="checkbox" eui-filter="ejs.TermsFilter(field, bucket.key)">
                <input type="checkbox" ng-model="filter.enabled">
                {{bucket.key}} ({{bucket.doc_count}})
            </label>
        </li>
    </ul>

Screenshot:

![checklist screenshot](checklist.png)


[1]: components.md