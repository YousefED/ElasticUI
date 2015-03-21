declare module elasticui.util {
    class EjsCollection {
        ejsObjects: any[];
        private jsonObjects;
        indexOf(ejsObject: any): number;
        add(ejsObject: any): void;
        remove(ejsObject: any): void;
    }
}
declare module elasticui.util {
    class FilterCollection extends EjsCollection {
        getAsFilter(): any[];
        getAsORFilter(): any[];
        contains(filter: any): boolean;
    }
}
declare module elasticui.util {
    class FilterTool {
        static combineFilters(filters: any[]): any;
        static combineFiltersShould(filters: any[]): any;
    }
}
declare module elasticui.services {
    var services: ng.IModule;
}
declare module elasticui.directives {
    var directives: ng.IModule;
}
declare module elasticui.directives {
    class AggregationDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class FilterDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class IndexDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class InvertedDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class OrFilterDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class SortDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class VarDirective {
        static $inject: string[];
        constructor($timeout: any);
    }
}
declare module elasticui.filters {
    var filters: ng.IModule;
}
declare module elasticui.filters {
    class CachedFilter {
        constructor();
    }
}
declare module elasticui.filters {
    class MapFilter {
        private static parseString(input);
        private static getValue(element, propertyArray);
        constructor();
    }
}
declare module elasticui.filters {
    class PageRangeFilter {
        constructor();
    }
}
declare module elasticui.filters {
    class RangeFilter {
        constructor();
    }
}
declare module elasticui.filters {
    class RoundFilter {
        constructor();
    }
}
declare module elasticui.filters {
    class TimestampFilter {
        constructor();
    }
}
declare module elasticui.controllers {
    interface IAggregationScope extends IIndexScope {
        aggResult: any;
        aggregation: {
            agg: any;
            filterSelf: boolean;
        };
    }
    class AggregationController {
        private scope;
        private previousProvider;
        static $inject: string[];
        constructor($scope: IAggregationScope);
        init(): void;
        private updateResults();
        updateAgg(): void;
        private static getAggName(ejsAggregation);
        getAggregationExplicit(ejsAggregation: any, filterSelf: boolean, filters: any[]): any;
        getAggregation(filters: any[]): any;
    }
}
declare module elasticui.controllers {
    interface IFilterScope extends IIndexScope {
        filter: {
            filter: any;
            enabled: boolean;
        };
    }
    class FilterController {
        private scope;
        static $inject: string[];
        constructor($scope: IFilterScope);
        init(): void;
        private updateFilter();
    }
}
declare module elasticui.controllers {
    interface IFilteredScope extends ng.IScope {
        filters: util.FilterCollection;
        combinedFilter: any;
    }
}
declare module elasticui.controllers {
    interface IIndexScope extends IFilteredScope {
        indexVM: IIndexViewModel;
        ejs: any;
    }
    interface IIndexViewModel {
        host: any;
        query: any;
        sort: any;
        aggregationProviders: util.SimpleSet;
        filters: util.FilterCollection;
        highlight: any;
        loaded: boolean;
        loading: boolean;
        page: number;
        index: string;
        pageCount: number;
        pageSize: number;
        results: any;
        refresh: (softRefresh?: boolean) => void;
        error: any;
        autoLoad: boolean;
    }
}
declare module elasticui.controllers {
    class IndexController {
        private es;
        private $rootScope;
        filters: util.FilterCollection;
        indexVM: IIndexViewModel;
        loaded(): void;
        static $inject: string[];
        constructor($scope: any, $timeout: any, $window: any, es: services.ElasticService, $rootScope: any);
        private getSearchPromise();
        private searchPromise;
        private refreshPromise;
        private onError(err);
        private search();
        refresh(softRefresh?: boolean): void;
        private onResult(body, updateOnlyIfCountChanged?);
    }
}
declare module elasticui.controllers {
    class OrFilterController {
        filters: util.FilterCollection;
        private scope;
        static $inject: string[];
        constructor($scope: any);
        private updateCombinedFilter();
    }
}
declare module elasticui.controllers {
    interface ISortScope extends IIndexScope {
        sorting: {
            sort: any;
            enabled: boolean;
        };
    }
    class SortController {
        private scope;
        static $inject: string[];
        constructor($scope: ISortScope);
        init(): void;
        private updateSort();
        updateEnabled(): void;
        isEnabledOnIndexScope(): boolean;
    }
}
declare module elasticui.services {
    class ElasticService {
        client: any;
        private esFactory;
        private host;
        static $inject: string[];
        constructor(esFactory: any, euiHost: any);
        setHost(host: any): boolean;
    }
}
declare module elasticui.widgets.directives {
    var directives: ng.IModule;
    var default_agg_count: number;
}
declare module elasticui.widgets.directives {
    class ChecklistDirective {
        static $inject: string[];
        constructor($parse: any);
    }
}
declare module elasticui.widgets.directives {
    class SimplePagingDirective {
        constructor();
    }
}
declare module elasticui.widgets.directives {
    class SingleselectDirective {
        static $inject: string[];
        constructor($parse: any);
    }
}
declare module elasticui.controllers {
    interface IHighlightScope extends IIndexScope {
        highlighting: {
            highlight: any;
            enabled: boolean;
        };
    }
    class HighlightController {
        private scope;
        static $inject: string[];
        constructor($scope: IHighlightScope);
        init(): void;
        private updateHighlight();
        updateEnabled(): void;
        isEnabledOnIndexScope(): boolean;
    }
}
declare module elasticui.controllers {
    interface IHostScope extends IIndexScope {
        host: any;
    }
    class HostController {
        private scope;
        static $inject: string[];
        constructor($scope: IHostScope);
        init(): void;
        private updateHost();
        readHost(): void;
    }
}
declare module elasticui.controllers {
    interface IQueryScope extends IIndexScope {
        query: {
            query: any;
            enabled: boolean;
        };
    }
    class QueryController {
        private scope;
        static $inject: string[];
        constructor($scope: IQueryScope);
        init(): void;
        private updateQuery();
    }
}
declare module elasticui.directives {
    class HighlightDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class HostDirective {
        constructor();
    }
}
declare module elasticui.directives {
    class QueryDirective {
        constructor();
    }
}
declare module elasticui.util {
    class AngularTool {
        static setupBinding($parse: any, scope: any, attrs: any, attrsToBind: string[]): void;
    }
}
declare module elasticui.util {
    class EjsTool {
        static getJsonFromEjsObject(object: any): string;
        static equals(objectA: any, objectB: any): boolean;
    }
}
declare module elasticui.util {
    class SimpleSet {
        objects: any[];
        indexOf(object: any): number;
        add(object: any): void;
        remove(object: any): void;
    }
}
declare module elasticui.widgets.directives {
    class SearchboxDirective {
        static $inject: string[];
        constructor($parse: any);
    }
}
