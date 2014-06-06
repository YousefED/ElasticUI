module elasticui.controllers {

    export interface ISortScope extends IIndexScope {
        sorting: { sort: any; enabled: boolean };
    }

    export class SortController{
        private scope: ISortScope;

        static $inject = ['$scope'];
        constructor($scope: ISortScope){
            this.scope = $scope;
        }

        public init() {
            this.scope.$watch('indexVM.sort', () => this.updateEnabled());
            this.scope.$watch('sorting.sort', () => this.updateSort());
            this.scope.$watch('sorting.enabled', () => this.updateSort());   
            this.updateSort();
        }

        private updateSort() {
            if (this.scope.sorting.enabled) {
                this.scope.indexVM.sort = this.scope.sorting.sort;
            }
        }

        public updateEnabled() {
            this.scope.sorting.enabled = this.scope.indexVM.sort != null && angular.equals(this.scope.indexVM.sort.toJSON(), this.scope.sorting.sort.toJSON());
        }
    }
}