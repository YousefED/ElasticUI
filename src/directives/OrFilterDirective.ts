module elasticui.directives {
    export class OrFilterDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'EAC';
            directive.scope = true;

            directive.controller = controllers.OrFilterController;
            directive.link = function (scope, element, attrs: any, filterCtrl) {

            }
            return directive;
        }
    }
    directives.directive('euiOrFilter', OrFilterDirective);
}