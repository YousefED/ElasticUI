module elasticui.controllers {

    export interface IHighlightScope extends IIndexScope {
        highlighting: { highlight: any; enabled: boolean };
    }

    export class HighlightController{
        private scope: IHighlightScope;

        static $inject = ['$scope'];
        constructor($scope: IHighlightScope){
            this.scope = $scope;
        }

        public init() {
            this.scope.$watch('indexVM.highlight', () => this.updateEnabled());
            this.scope.$watch('highlighting.highlight', () => this.updateHighlight());
            this.scope.$watch('highlighting.enabled', () => this.updateHighlight());
            this.updateHighlight();
        }

        private updateHighlight() {
            if (this.scope.highlighting.enabled) {
                this.scope.indexVM.highlight = this.scope.highlighting.highlight;
            }
        }

        public updateEnabled() {
            this.scope.highlighting.enabled = this.scope.indexVM.highlight != null && angular.equals(this.scope.indexVM.highlight.toJSON(), this.scope.highlighting.highlight.toJSON());
        }
    }
}
