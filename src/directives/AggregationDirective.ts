module elasticui.directives {
    export class AggregationDirective {
        constructor() {
            var directive: ng.IDirective = {};

            directive.restrict = 'EAC';
            directive.scope = true;

            directive.controller = controllers.AggregationController;
            directive.link = function (scope, element, attrs: any, aggCtrl) {
                var agg = scope.$eval(attrs.euiAggregation);
                var filterSelf = scope.$eval(attrs.euiFilterSelf);
                aggCtrl.setFilterSelf(filterSelf);
                aggCtrl.setAggregation(agg);
            }
            return directive;
        }
    }
    directives.directive('euiAggregation', elasticui.directives.AggregationDirective);
}
