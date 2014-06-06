module elasticui.controllers {
    export interface IFilteredScope extends ng.IScope {
        filters: util.FilterCollection;
        combinedFilter: any;
    }
}