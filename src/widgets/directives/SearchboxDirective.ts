module elasticui.widgets.directives {
    // The widgets show how to create reusable components on top of ElasticUI. 
    // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
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

            // TODO: should be debounced
            directive.template = '\
            <input type="text" eui-query="ejs.MatchQuery(field, querystring)" ng-model="querystring" eui-enabled="querystring.length" />\
            ';
            
            return directive;
        }
    }
    directives.directive('euiSearchbox', SearchboxDirective);
}