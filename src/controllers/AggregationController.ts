module elasticui.controllers {
    export interface IAggregationScope extends IIndexScope {
        aggResult: any;
        aggregation: {
            agg: any;
            filterSelf: boolean;
        }
    }

    export class AggregationController{
        private scope: IAggregationScope;
        private previousProvider: any;

        static $inject = ['$scope'];
        constructor($scope: IAggregationScope) {
            this.scope = $scope;
        }

        public init() {
            this.scope.$parent.$watch('indexVM.results', () => this.updateResults());
            this.scope.$watch('aggregation.agg', (newVal, oldVal) => {
                if (!util.EjsTool.equals(oldVal, newVal)) {
                    if (this.previousProvider) {
                        this.scope.indexVM.aggregationProviders.remove(this.previousProvider);
                    }
                    this.updateAgg();
                }
            });

            this.scope.$watch('aggregation.filterSelf', (newVal, oldVal) => {
                if (newVal !== oldVal) {
                    if (this.previousProvider) {
                        this.scope.indexVM.aggregationProviders.remove(this.previousProvider);
                    }
                    this.updateAgg();
                }
            });

            this.scope.$on('$destroy', () => {
                if (this.previousProvider) {
                    this.scope.indexVM.aggregationProviders.remove(this.previousProvider);
                }
            });

            this.updateAgg();
        }

        private updateResults() {
            var res = this.scope.indexVM.results;
            if (this.scope.aggregation.agg && res && res.aggregations) {
                var name = AggregationController.getAggName(this.scope.aggregation.agg);
                
                var aggKey = Object.keys(res.aggregations).filter(key => key == name || key == "filtered_" + name)[0];
                var agg = res.aggregations[aggKey];
                if (aggKey == "filtered_" + name) {
                    agg = agg[name];
                }
                this.scope.aggResult = agg;
            }
        }

        public updateAgg() {
            var provider = null;

            if (this.scope.aggregation.agg) {
                provider = (filters: any[]): any => this.getAggregation(filters);
            }

            if (provider) {
                this.scope.indexVM.aggregationProviders.add(provider);
            }

            this.previousProvider = provider;
        }

        private static getAggName(ejsAggregation: any) {
            return Object.keys(ejsAggregation.toJSON())[0];
        }

        public getAggregationExplicit(ejsAggregation: any, filterSelf: boolean, filters: any[]): any {
            if (!ejsAggregation) {
                return null;
            }

            var facetFilters = filters;
            if (!filterSelf) {
                facetFilters = facetFilters.filter(
                    (val) => val != (<any>this.scope).combinedFilter && (typeof val.field === "undefined" || val.field() != ejsAggregation.field()));
            }

            var combinedFilters = util.FilterTool.combineFilters(facetFilters);
            if (combinedFilters != null) {
                ejsAggregation = new ejs.FilterAggregation("filtered_" + AggregationController.getAggName(ejsAggregation)).filter(combinedFilters).agg(ejsAggregation);
            }
            return ejsAggregation;
        }

        public getAggregation(filters: any[]): any {
            return this.getAggregationExplicit(this.scope.aggregation.agg, this.scope.aggregation.filterSelf, filters);
        }
    }
}