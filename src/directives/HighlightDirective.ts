module elasticui.directives {
    export class HighlightDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'A';
            directive.scope = true;

            directive.controller = controllers.HighlightController;
            directive.link = function (scope, element, attrs: any, highlightCtrl) {
                scope.$watch(element.attr('eui-highlight') + " | euiCached", (val) => scope.highlighting.highlight = val);

                var enabled = false;
                var enabledAttr = element.attr('eui-enabled');
                if (enabledAttr) {
                    scope.$watch(enabledAttr, (val) => scope.highlighting.enabled = val);
                    enabled = scope.$eval(enabledAttr);
                }

                scope.highlighting = {
                    highlight: scope.$eval(element.attr('eui-highlight') + " | euiCached"),
                    enabled: enabled
                };

                highlightCtrl.init();
            }
            return directive;
        }
    }
    directives.directive('euiHighlight', HighlightDirective);
}
