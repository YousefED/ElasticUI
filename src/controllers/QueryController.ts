module elasticui.controllers {
    export interface IQueryScope extends IIndexScope {
        query: { query: any; enabled:boolean };
    }

    export class QueryController {
        private scope: IQueryScope;

        static $inject = ['$scope'];
        constructor($scope: IQueryScope) {
            this.scope = $scope;  
        }

        public init() {
            this.scope.$watch('query.enabled', (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    this.updateQuery();
                }
            });

            this.scope.$watch('query.query', (newVal, oldVal) => {
                if (!util.EjsTool.equals(oldVal, newVal)) {
                    this.updateQuery();
                }
            });
            this.updateQuery();
        }

        private updateQuery() {
            if (!this.scope.query.query) {
                return;
            }
            if (!this.scope.query.enabled) {
                this.scope.indexVM.query = null;
            } else {
                this.scope.indexVM.query = this.scope.query.query;
            }
        }
    }
}