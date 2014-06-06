module elasticui.controllers {
    export interface IAggregationScope extends IIndexScope {
        aggResult: any;    
    }

    export class AggregationController{
        public agg: any;
        public filterSelf: boolean = true;

        private scope: IAggregationScope;

        static $inject = ['$scope'];
        constructor($scope: IAggregationScope) {
            this.scope = $scope;
            $scope.$parent.$watch('indexVM.results', () => this.updateResults());
        }

        private getAggName() {
            return Object.keys(this.agg.toJSON())[0];
        }

        private updateResults() {
            var res = this.scope.indexVM.results;
            if (this.agg && res && res.aggregations) {
                var name = this.getAggName();
                
                var aggKey = Object.keys(res.aggregations).filter(key => key == name || key == "filtered_" + name)[0];
                var agg = res.aggregations[aggKey];
                if (aggKey == "filtered_" + name) {
                    agg = agg[name];
                }
                this.scope.aggResult = agg;
            }
        }

        public setFilterSelf(filterSelf: boolean = true) {
            this.filterSelf = filterSelf;
        }

        public setAggregation(agg: any) {
            this.agg = agg;
            this.scope.indexVM.addAggregationProvider(this);
        }

        public getAggregation(filters: any[]) {
            var rootAgg = this.agg;

            var facetFilters = filters;
            if (!this.filterSelf) {
                facetFilters = facetFilters.filter(
                    (val) => val != (<any>this.scope).combinedFilter && (typeof val.field === "undefined" || val.field() != this.agg.field()));
            }

            var combined = util.FilterTool.combineFilters(facetFilters);
            if (combined != null) {
                rootAgg = new ejs.FilterAggregation("filtered_" + this.getAggName()).filter(combined).agg(this.agg);
            }
            return rootAgg;
        }
    }
}