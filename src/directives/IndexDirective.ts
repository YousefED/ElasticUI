module elasticui.directives {
    export class IndexDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'EAC';
            directive.scope = false;

            directive.controller = controllers.IndexController;
            directive.link = function (scope, element, attrs: any, indexCtrl: controllers.IndexController) {
                indexCtrl.indexVM.index = attrs.euiIndex;
            }
            return directive;
        }
    }
    directives.directive('euiIndex', IndexDirective);
}