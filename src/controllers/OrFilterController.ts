module elasticui.controllers {
    export class OrFilterController {
        public filters = new util.FilterCollection();
        private scope: any;

        static $inject = ['$scope'];
        constructor($scope: any){
            $scope.filters = this.filters;
            $scope.$watchCollection('filters.ejsObjects', () => this.updateCombinedFilter());    
            
            this.scope = $scope;
        }

        private updateCombinedFilter() {
            if (this.scope.combinedFilter) {
                this.scope.$parent.filters.remove(this.scope.combinedFilter);
            }

            this.scope.combinedFilter = this.filters.getAsORFilter();
            if (this.scope.combinedFilter) {
                this.scope.$parent.filters.add(this.scope.combinedFilter);
            }
        }
    }
}