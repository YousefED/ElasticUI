module elasticui.controllers {
    export class IndexController {

        private aggregations: any[] = [];

        private es: services.ElasticService;

        public filters = new elasticui.util.FilterCollection();

        public indexVM: IIndexViewModel = {
            host: null,
            query: null,
            sort: null,
            highlight: null,
            loaded: false,
            page: 1,
            index: null,
            loading:false,
            pageCount: 0,
            pageSize: 10,
            results: null,
            addAggregationProvider: (aggProvider) => this.addAggregationProvider(aggProvider),
            refresh: () => this.refreshIfDocCountChanged()
        };

        public loaded() {
            if (!this.indexVM.loaded) {
                this.indexVM.loaded = true;
                this.search();
            }
        }

        public addAggregationProvider(aggProvider) {
            this.aggregations.push(aggProvider);
            this.search();
        }

        static $inject = ['$scope', '$timeout', '$window', 'es'];
        constructor($scope, $timeout, $window, es: services.ElasticService) {
            this.es = es;

            $scope.indexVM = this.indexVM;
            $scope.ejs = $window.ejs; // so we can use ejs in attributes etc. TODO: better to have a ejs service instead of loading from window
            $scope.mainController = this;
            $scope.filters = this.filters;
            $scope.$watchCollection('filters.filters', () => { this.indexVM.page = 1; this.search() });
            $scope.$watch('indexVM.host', () => { if (this.indexVM.host != null && es.setHost(this.indexVM.host)) { this.search(); } });
            $scope.$watch('indexVM.sort', () => { this.indexVM.page = 1; this.search() });
            $scope.$watch('indexVM.page', () => this.search());
            $scope.$watch('indexVM.index', () => this.search());
            $scope.$watch('indexVM.query', () => this.search());
            $scope.$watch('indexVM.highlight', () => this.search());

            $timeout(() => this.loaded(), 200); // TODO: find better way to recognize loading of app
        }

        private getSearchPromise() {
            var request = ejs.Request();

            for (var i = 0; i < this.aggregations.length; i++) {
                var agg = this.aggregations[i].getAggregation(this.filters.filters);
                request.agg(agg);
            }

            // apply search filters to the request
            var combinedFilter = this.filters.getAsFilter();
            if (combinedFilter != null) {
                request.filter(combinedFilter);
            }

            if (this.indexVM.query != null) {
                request.query(this.indexVM.query);
            } else {
                request.query(ejs.MatchAllQuery());
            }

            if (this.indexVM.sort != null) {
                request.sort(this.indexVM.sort);
            }

            if (this.indexVM.highlight != null) {
                request.highlight(this.indexVM.highlight);
            }

            //console.log("request to ES");

            var res = this.es.client.search({
                index: this.indexVM.index,
                size: this.indexVM.pageSize,
                from: this.indexVM.pageSize * (this.indexVM.page-1),
                body: request
            });

            return res;
        }

        private searchPromise = null;
        private refreshPromise = null;

        private search() {
            if (!this.indexVM.loaded || !this.indexVM.index) {
                return;
            }
            if (this.refreshPromise != null) {
                this.refreshPromise.abort();
                this.refreshPromise = null;
            }
            this.indexVM.loading = true;
            this.searchPromise = this.getSearchPromise();
            this.searchPromise.then((body) => {
                this.searchPromise = null;
                this.onResult(body)
            });
        }

        public refreshIfDocCountChanged() {
            if (!this.indexVM.loaded || !this.indexVM.index || this.searchPromise != null) {
                return;
            }
            this.indexVM.loading = true;
            this.refreshPromise = this.getSearchPromise();
            this.refreshPromise.then((body) => {
                this.refreshPromise = null;
                this.onResult(body, true)
            });
        }

        private onResult(body, updateOnlyIfCountChanged: boolean = false) {
            if (!updateOnlyIfCountChanged || this.indexVM.results == null || this.indexVM.results.hits.total != body.hits.total) {
                this.indexVM.results = body;
                this.indexVM.pageCount = Math.ceil(this.indexVM.results.hits.total / this.indexVM.pageSize);
            }
            this.indexVM.loading = false;
        }
    }
}
