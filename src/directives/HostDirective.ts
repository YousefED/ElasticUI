module elasticui.directives {
    export class HostDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'A';
            directive.scope = true;

            directive.controller = controllers.HostController;
            directive.link = function (scope, element, attrs: any, hostCtrl) {
                scope.$watch(element.attr('eui-host'), (val) => scope.host = val);

                scope.host = scope.$eval(element.attr('eui-host'));

                hostCtrl.init();
            }
            return directive;
        }
    }
    directives.directive('euiHost', HostDirective);
}
