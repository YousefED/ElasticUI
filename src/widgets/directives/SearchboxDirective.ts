module elasticui.widgets.directives {
    export class SearchboxDirective {
        static $inject = ['$parse'];
        constructor($parse) {
            var directive: ng.IDirective = {};
            directive.restrict = 'E';
            directive.scope = true;

            (<any>directive).link = {
                'pre': function (scope, element, attrs: any) {
                    elasticui.util.AngularTool.setupBinding($parse, scope, attrs, ["field"]);
                }
            }

            directive.template = '\
            <input type="text" eui-query="ejs.MatchQuery(field, querystring)" ng-model="querystring" eui-enabled="querystring.length" />\
            ';
            
            return directive;
        }
    }
    directives.directive('euiSearchbox', SearchboxDirective);
}