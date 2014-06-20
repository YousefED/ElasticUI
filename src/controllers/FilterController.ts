module elasticui.controllers {
    export interface IFilterScope extends IIndexScope {
        filter: { filter: any; enabled: boolean };
    }

    export class FilterController {
        private scope: IFilterScope;

        static $inject = ['$scope'];
        constructor($scope: IFilterScope) {
            this.scope = $scope;  
        }

        public init() {
            if (this.scope.filter.filter) {
                var isEnabled = this.scope.filters.contains(this.scope.filter.filter);
                if (!isEnabled && this.scope.filter.enabled) {
                    this.scope.filters.add(this.scope.filter.filter);
                    isEnabled = true;
                }
            }

            this.scope.filter.enabled = isEnabled;
            this.scope.$watch('filter.enabled', (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    this.updateFilter();
                }
            });

            this.scope.$watch('filter.filter', (newVal, oldVal) => { 
                if (!util.EjsTool.equals(oldVal, newVal)) {
                    if (oldVal) {
                        this.scope.filters.remove(oldVal);
                    }
                    this.updateFilter();
                }
            });
        }

        private updateFilter() {
            if (!this.scope.filter.filter) {
                return;
            }

            if (this.scope.filter.enabled) {
                this.scope.filters.add(this.scope.filter.filter);
            } else {
                this.scope.filters.remove(this.scope.filter.filter);
            }
        }
    }
}