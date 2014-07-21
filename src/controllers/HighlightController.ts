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
            this.scope.$watch('highlighting.enabled', (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    this.updateHighlight();
                }
            });
            this.updateHighlight();
        }

        private updateHighlight() {
            if (this.scope.highlighting.enabled) {
                this.scope.indexVM.highlight = this.scope.highlighting.highlight;
            } else {
                if (this.isEnabledOnIndexScope()) {
                    this.scope.indexVM.highlight = null;
                }
            }
        }

        public updateEnabled() {
            this.scope.highlighting.enabled = this.isEnabledOnIndexScope();
        }

        public isEnabledOnIndexScope() {
            return this.scope.indexVM.highlight != null && angular.equals(this.scope.indexVM.highlight.toJSON(), this.scope.highlighting.highlight.toJSON());
        }
    }
}
