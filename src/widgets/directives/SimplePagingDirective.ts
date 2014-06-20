module elasticui.widgets.directives {
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