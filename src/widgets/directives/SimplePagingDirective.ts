module elasticui.widgets.directives {
    // The widgets show how to create reusable components on top of ElasticUI. 
    // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
    export class SimplePagingDirective {
        constructor() {
            var directive: ng.IDirective = {};
            directive.restrict = 'E';
            directive.scope = true;

            directive.template = '\
            <ul class="pager">\
                <li ng-class="{disabled:indexVM.page <= 1}"><a href="" ng-click="indexVM.page=indexVM.page - 1">Previous</a></li>\
                <li ng-class="{disabled:indexVM.pageCount <= indexVM.page}"><a href="" ng-click="indexVM.page=indexVM.page + 1">Next</a></li>\
            </ul>';
            
            return directive;
        }
    }
    directives.directive('euiSimplePaging', SimplePagingDirective);
}