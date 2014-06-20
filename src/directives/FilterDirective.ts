module elasticui.directives {
    export class FilterDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'A';
            directive.scope = true;
            directive.controller = controllers.FilterController;
            directive.link = function (scope, element, attrs: any, filterCtrl) {
                scope.$watch(element.attr('eui-filter') + " | euiCached", (val) => scope.filter.filter = val);
                
                var enabled = false;
                var enabledAttr = element.attr('eui-enabled');
                if (enabledAttr) {
                    scope.$watch(enabledAttr, (val) => scope.filter.enabled = val);
                    enabled = scope.$eval(enabledAttr);
                }

                scope.filter = {
                    filter: scope.$eval(element.attr('eui-filter') + " | euiCached"),
                    enabled: enabled
                };

                filterCtrl.init();
            }
            return directive;
        }
    }
    directives.directive('euiFilter', FilterDirective);
}