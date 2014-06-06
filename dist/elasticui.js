var elasticui;
(function (elasticui) {
    (function (util) {
        var FilterCollection = (function () {
            function FilterCollection() {
                this.filters = [];
                this.jsonFilters = [];
            }
            FilterCollection.prototype.getFilterIndex = function (filter) {
                return this.jsonFilters.indexOf(util.FilterTool.getJsonFromFilter(filter));
            };

            FilterCollection.prototype.add = function (filter) {
                var idx = this.getFilterIndex(filter);
                if (idx == -1) {
                    this.filters.push(filter);
                    this.jsonFilters.push(util.FilterTool.getJsonFromFilter(filter));
                }
            };

            FilterCollection.prototype.remove = function (filter) {
                var idx = this.getFilterIndex(filter);
                if (idx > -1) {
                    this.filters.splice(idx, 1);
                    this.jsonFilters.splice(idx, 1);
                }
            };

            FilterCollection.prototype.getAsFilter = function () {
                return util.FilterTool.combineFilters(this.filters);
            };

            FilterCollection.prototype.getAsORFilter = function () {
                return util.FilterTool.combineFiltersShould(this.filters);
            };

            FilterCollection.prototype.contains = function (filter) {
                return this.getFilterIndex(filter) > -1;
            };
            return FilterCollection;
        })();
        util.FilterCollection = FilterCollection;
    })(elasticui.util || (elasticui.util = {}));
    var util = elasticui.util;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (util) {
        var FilterTool = (function () {
            function FilterTool() {
            }
            FilterTool.combineFilters = function (filters) {
                if (filters.length === 1) {
                    return filters[0];
                } else if (filters.length > 1) {
                    return ejs.BoolFilter().must(filters);
                }
                return null;
            };

            FilterTool.combineFiltersShould = function (filters) {
                if (filters.length === 1) {
                    return filters[0];
                } else if (filters.length > 1) {
                    return ejs.BoolFilter().should(filters);
                }
                return null;
            };

            FilterTool.getJsonFromFilter = function (filter) {
                return angular.toJson(filter.toJSON());
            };

            FilterTool.equals = function (filterA, filterB) {
                return !filterA && !filterB || (filterA && filterB && this.getJsonFromFilter(filterA) == this.getJsonFromFilter(filterB));
            };
            return FilterTool;
        })();
        util.FilterTool = FilterTool;
    })(elasticui.util || (elasticui.util = {}));
    var util = elasticui.util;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (_services) {
        _services.services = angular.module('elasticui.services', []);
    })(elasticui.services || (elasticui.services = {}));
    var services = elasticui.services;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (_directives) {
        _directives.directives = angular.module('elasticui.directives', []);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var AggregationDirective = (function () {
            function AggregationDirective() {
                var directive = {};

                directive.restrict = 'EAC';
                directive.scope = true;

                directive.controller = elasticui.controllers.AggregationController;
                directive.link = function (scope, element, attrs, aggCtrl) {
                    var agg = scope.$eval(attrs.euiAggregation);
                    var filterSelf = scope.$eval(attrs.euiFilterSelf);
                    aggCtrl.setFilterSelf(filterSelf);
                    aggCtrl.setAggregation(agg);
                };
                return directive;
            }
            return AggregationDirective;
        })();
        directives.AggregationDirective = AggregationDirective;
        directives.directives.directive('euiAggregation', elasticui.directives.AggregationDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var FilterDirective = (function () {
            function FilterDirective($timeout) {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.FilterController;
                directive.link = function (scope, element, attrs, filterCtrl) {
                    scope.$watch(element.attr('eui-filter') + " | euiCached", function (val) {
                        return scope.filter.filter = val;
                    });

                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) {
                            return scope.filter.enabled = val;
                        });
                        enabled = scope.$eval(enabledAttr);
                    }

                    scope.filter = {
                        filter: scope.$eval(element.attr('eui-filter') + " | euiCached"),
                        enabled: enabled
                    };

                    filterCtrl.init();
                };
                return directive;
            }
            return FilterDirective;
        })();
        directives.FilterDirective = FilterDirective;
        directives.directives.directive('euiFilter', FilterDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var IndexDirective = (function () {
            function IndexDirective() {
                var directive = {};
                directive.restrict = 'EAC';
                directive.scope = false;

                directive.controller = elasticui.controllers.IndexController;
                directive.link = function (scope, element, attrs, indexCtrl) {
                    indexCtrl.indexVM.index = attrs.euiIndex;
                };
                return directive;
            }
            return IndexDirective;
        })();
        directives.IndexDirective = IndexDirective;
        directives.directives.directive('euiIndex', IndexDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var InvertedDirective = (function () {
            function InvertedDirective() {
                var directive = {};

                directive.require = 'ngModel';
                directive.link = function (scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function (val) {
                        return !val;
                    });
                    ngModel.$formatters.push(function (val) {
                        return !val;
                    });
                };
                return directive;
            }
            return InvertedDirective;
        })();
        directives.InvertedDirective = InvertedDirective;
        directives.directives.directive('euiInverted', InvertedDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var OrFilterDirective = (function () {
            function OrFilterDirective() {
                var directive = {};
                directive.restrict = 'EAC';
                directive.scope = true;

                directive.controller = elasticui.controllers.OrFilterController;
                directive.link = function (scope, element, attrs, filterCtrl) {
                };
                return directive;
            }
            return OrFilterDirective;
        })();
        directives.OrFilterDirective = OrFilterDirective;
        directives.directives.directive('euiOrFilter', OrFilterDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var SortDirective = (function () {
            function SortDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;

                directive.controller = elasticui.controllers.SortController;
                directive.link = function (scope, element, attrs, sortCtrl) {
                    scope.$watch(element.attr('eui-sort') + " | euiCached", function (val) {
                        return scope.sorting.sort = val;
                    });

                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) {
                            return scope.sorting.enabled = val;
                        });
                        enabled = scope.$eval(enabledAttr);
                    }

                    scope.sorting = {
                        sort: scope.$eval(element.attr('eui-sort') + " | euiCached"),
                        enabled: enabled
                    };

                    sortCtrl.init();
                };
                return directive;
            }
            return SortDirective;
        })();
        directives.SortDirective = SortDirective;
        directives.directives.directive('euiSort', SortDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var VarDirective = (function () {
            function VarDirective($timeout) {
                var directive = {};
                directive.restrict = 'EAC';
                directive.scope = false;
                directive.transclude = false;

                directive.link = {
                    pre: function (scope, element, attrs) {
                        var key = element.attr('eui-key');
                        scope.$watch(element.attr('eui-value'), function (newVal, oldVal) {
                            if (!angular.equals(newVal, oldVal)) {
                                scope[key] = newVal;
                            }
                        }, true);
                        scope[key] = scope.$eval(element.attr('eui-value'));
                    }
                };
                return directive;
            }
            return VarDirective;
        })();
        directives.VarDirective = VarDirective;
        directives.directives.directive('euiVar', VarDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (_filters) {
        _filters.filters = angular.module('elasticui.filters', []);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (filters) {
        var CachedFilter = (function () {
            function CachedFilter() {
                var values = {};
                return function (input) {
                    if (!input) {
                        return input;
                    }
                    var json = angular.toJson(input.toJSON());
                    if (!values[json]) {
                        values[json] = input;
                    }
                    return values[json];
                };
            }
            return CachedFilter;
        })();
        filters.CachedFilter = CachedFilter;

        filters.filters.filter('euiCached', CachedFilter);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (filters) {
        var MapFilter = (function () {
            function MapFilter() {
                return function (input, property) {
                    var ret = [];
                    if (!input || !input.length) {
                        return input;
                    }
                    var arr = MapFilter.parseString(property);
                    return input.map(function (el) {
                        return [el.key, MapFilter.getValue(el, arr)];
                    });
                };
            }
            MapFilter.parseString = function (input) {
                return input.split(".");
            };

            MapFilter.getValue = function (element, propertyArray) {
                var value = element;

                angular.forEach(propertyArray, function (property) {
                    if (!value) {
                        return value;
                    }
                    value = value[property];
                });

                return value;
            };
            return MapFilter;
        })();
        filters.MapFilter = MapFilter;

        filters.filters.filter('euiMap', MapFilter);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (filters) {
        var PageRangeFilter = (function () {
            function PageRangeFilter() {
                return function (input, total, current, neighbours) {
                    if (typeof neighbours === "undefined") { neighbours = 5; }
                    for (var i = 1; i <= total; i++) {
                        if (i <= current + neighbours && i >= current - neighbours || (i < current && current - neighbours < 4) || (i > current + neighbours && total - (current + neighbours) < 4)) {
                            input.push(i);
                        } else if (i == 1) {
                            input.push(1, -1);
                        } else if (i == total) {
                            input.push(-2, total);
                        }
                    }
                    return input;
                };
            }
            return PageRangeFilter;
        })();
        filters.PageRangeFilter = PageRangeFilter;

        filters.filters.filter('euiPageRange', PageRangeFilter);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (filters) {
        var RangeFilter = (function () {
            function RangeFilter() {
                return function (input, total) {
                    total = parseInt(total);
                    for (var i = 0; i < total; i++) {
                        input.push(i);
                    }
                    return input;
                };
            }
            return RangeFilter;
        })();
        filters.RangeFilter = RangeFilter;

        filters.filters.filter('euiRange', RangeFilter);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (filters) {
        var RoundFilter = (function () {
            function RoundFilter() {
                return function (input) {
                    if (!input) {
                        return input;
                    }
                    return Math.round(input);
                };
            }
            return RoundFilter;
        })();
        filters.RoundFilter = RoundFilter;

        filters.filters.filter('euiRound', RoundFilter);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (filters) {
        var TimestampFilter = (function () {
            function TimestampFilter() {
                return function (input) {
                    return new Date(input).getTime();
                };
            }
            return TimestampFilter;
        })();
        filters.TimestampFilter = TimestampFilter;

        filters.filters.filter('euiTimestamp', TimestampFilter);
    })(elasticui.filters || (elasticui.filters = {}));
    var filters = elasticui.filters;
})(elasticui || (elasticui = {}));
angular.module('elasticui.controllers', []).controller(elasticui.controllers);
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var AggregationController = (function () {
            function AggregationController($scope) {
                var _this = this;
                this.filterSelf = true;
                this.scope = $scope;
                $scope.$parent.$watch('indexVM.results', function () {
                    return _this.updateResults();
                });
            }
            AggregationController.prototype.getAggName = function () {
                return Object.keys(this.agg.toJSON())[0];
            };

            AggregationController.prototype.updateResults = function () {
                var res = this.scope.indexVM.results;
                if (this.agg && res && res.aggregations) {
                    var name = this.getAggName();

                    var aggKey = Object.keys(res.aggregations).filter(function (key) {
                        return key == name || key == "filtered_" + name;
                    })[0];
                    var agg = res.aggregations[aggKey];
                    if (aggKey == "filtered_" + name) {
                        agg = agg[name];
                    }
                    this.scope.aggResult = agg;
                }
            };

            AggregationController.prototype.setFilterSelf = function (filterSelf) {
                if (typeof filterSelf === "undefined") { filterSelf = true; }
                this.filterSelf = filterSelf;
            };

            AggregationController.prototype.setAggregation = function (agg) {
                this.agg = agg;
                this.scope.indexVM.addAggregationProvider(this);
            };

            AggregationController.prototype.getAggregation = function (filters) {
                var _this = this;
                var rootAgg = this.agg;

                var facetFilters = filters;
                if (!this.filterSelf) {
                    facetFilters = facetFilters.filter(function (val) {
                        return val != _this.scope.combinedFilter && (typeof val.field === "undefined" || val.field() != _this.agg.field());
                    });
                }

                var combined = elasticui.util.FilterTool.combineFilters(facetFilters);
                if (combined != null) {
                    rootAgg = new ejs.FilterAggregation("filtered_" + this.getAggName()).filter(combined).agg(this.agg);
                }
                return rootAgg;
            };
            AggregationController.$inject = ['$scope'];
            return AggregationController;
        })();
        controllers.AggregationController = AggregationController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var FilterController = (function () {
            function FilterController($scope) {
                this.scope = $scope;
            }
            FilterController.prototype.init = function () {
                var _this = this;
                if (this.scope.filter.filter) {
                    var isEnabled = this.scope.filters.contains(this.scope.filter.filter);
                    if (!isEnabled && this.scope.filter.enabled) {
                        this.scope.filters.add(this.scope.filter.filter);
                        isEnabled = true;
                    }
                }

                this.scope.filter.enabled = isEnabled;
                this.scope.$watch('filter.enabled', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.updateFilter();
                    }
                });

                this.scope.$watch('filter.filter', function (newVal, oldVal) {
                    if (!elasticui.util.FilterTool.equals(oldVal, newVal)) {
                        if (oldVal) {
                            _this.scope.filters.remove(oldVal);
                        }
                        _this.updateFilter();
                    }
                });
            };

            FilterController.prototype.updateFilter = function () {
                if (!this.scope.filter.filter) {
                    return;
                }

                if (this.scope.filter.enabled) {
                    this.scope.filters.add(this.scope.filter.filter);
                } else {
                    this.scope.filters.remove(this.scope.filter.filter);
                }
            };
            FilterController.$inject = ['$scope'];
            return FilterController;
        })();
        controllers.FilterController = FilterController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var IndexController = (function () {
            function IndexController($scope, $timeout, $window, es) {
                var _this = this;
                this.aggregations = [];
                this.filters = new elasticui.util.FilterCollection();
                this.indexVM = {
                    sort: null,
                    loaded: false,
                    page: 1,
                    index: null,
                    loading: false,
                    pageCount: 0,
                    pageSize: 10,
                    results: null,
                    addAggregationProvider: function (aggProvider) {
                        return _this.addAggregationProvider(aggProvider);
                    },
                    refresh: function () {
                        return _this.refreshIfDocCountChanged();
                    }
                };
                this.searchPromise = null;
                this.refreshPromise = null;
                this.es = es;

                $scope.indexVM = this.indexVM;
                $scope.ejs = $window.ejs;
                $scope.mainController = this;
                $scope.filters = this.filters;
                $scope.$watchCollection('filters.filters', function () {
                    _this.indexVM.page = 1;
                    _this.search();
                });
                $scope.$watch('indexVM.sort', function () {
                    _this.indexVM.page = 1;
                    _this.search();
                });
                $scope.$watch('indexVM.page', function () {
                    return _this.search();
                });
                $scope.$watch('indexVM.index', function () {
                    return _this.search();
                });

                $timeout(function () {
                    return _this.loaded();
                }, 200);
            }
            IndexController.prototype.loaded = function () {
                if (!this.indexVM.loaded) {
                    this.indexVM.loaded = true;
                    this.search();
                }
            };

            IndexController.prototype.addAggregationProvider = function (aggProvider) {
                this.aggregations.push(aggProvider);
                this.search();
            };

            IndexController.prototype.getSearchPromise = function () {
                var request = ejs.Request().query(ejs.MatchAllQuery());

                for (var i = 0; i < this.aggregations.length; i++) {
                    var agg = this.aggregations[i].getAggregation(this.filters.filters);
                    request.agg(agg);
                }

                var combinedFilter = this.filters.getAsFilter();
                if (combinedFilter != null) {
                    request.filter(combinedFilter);
                }

                if (this.indexVM.sort != null) {
                    request.sort(this.indexVM.sort);
                }

                var res = this.es.client.search({
                    index: this.indexVM.index,
                    size: this.indexVM.pageSize,
                    from: this.indexVM.pageSize * (this.indexVM.page - 1),
                    body: request
                });

                return res;
            };

            IndexController.prototype.search = function () {
                var _this = this;
                if (!this.indexVM.loaded || !this.indexVM.index) {
                    return;
                }
                if (this.refreshPromise != null) {
                    this.refreshPromise.abort();
                    this.refreshPromise = null;
                }
                this.indexVM.loading = true;
                this.searchPromise = this.getSearchPromise();
                this.searchPromise.then(function (body) {
                    _this.searchPromise = null;
                    _this.onResult(body);
                });
            };

            IndexController.prototype.refreshIfDocCountChanged = function () {
                var _this = this;
                if (!this.indexVM.loaded || !this.indexVM.index || this.searchPromise != null) {
                    return;
                }
                this.indexVM.loading = true;
                this.refreshPromise = this.getSearchPromise();
                this.refreshPromise.then(function (body) {
                    _this.refreshPromise = null;
                    _this.onResult(body, true);
                });
            };

            IndexController.prototype.onResult = function (body, updateOnlyIfCountChanged) {
                if (typeof updateOnlyIfCountChanged === "undefined") { updateOnlyIfCountChanged = false; }
                if (!updateOnlyIfCountChanged || this.indexVM.results == null || this.indexVM.results.hits.total != body.hits.total) {
                    this.indexVM.results = body;
                    this.indexVM.pageCount = Math.ceil(this.indexVM.results.hits.total / this.indexVM.pageSize);
                }
                this.indexVM.loading = false;
            };
            IndexController.$inject = ['$scope', '$timeout', '$window', 'es'];
            return IndexController;
        })();
        controllers.IndexController = IndexController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var OrFilterController = (function () {
            function OrFilterController($scope) {
                var _this = this;
                this.filters = new elasticui.util.FilterCollection();
                $scope.filters = this.filters;
                $scope.$watchCollection('filters.filters', function () {
                    return _this.updateCombinedFilter();
                });

                this.scope = $scope;
            }
            OrFilterController.prototype.updateCombinedFilter = function () {
                if (this.scope.combinedFilter) {
                    this.scope.$parent.filters.remove(this.scope.combinedFilter);
                }

                this.scope.combinedFilter = this.filters.getAsORFilter();
                if (this.scope.combinedFilter) {
                    this.scope.$parent.filters.add(this.scope.combinedFilter);
                }
            };
            OrFilterController.$inject = ['$scope'];
            return OrFilterController;
        })();
        controllers.OrFilterController = OrFilterController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var SortController = (function () {
            function SortController($scope) {
                this.scope = $scope;
            }
            SortController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('indexVM.sort', function () {
                    return _this.updateEnabled();
                });
                this.scope.$watch('sorting.sort', function () {
                    return _this.updateSort();
                });
                this.scope.$watch('sorting.enabled', function () {
                    return _this.updateSort();
                });
                this.updateSort();
            };

            SortController.prototype.updateSort = function () {
                if (this.scope.sorting.enabled) {
                    this.scope.indexVM.sort = this.scope.sorting.sort;
                }
            };

            SortController.prototype.updateEnabled = function () {
                this.scope.sorting.enabled = this.scope.indexVM.sort != null && angular.equals(this.scope.indexVM.sort.toJSON(), this.scope.sorting.sort.toJSON());
            };
            SortController.$inject = ['$scope'];
            return SortController;
        })();
        controllers.SortController = SortController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (services) {
        var ElasticService = (function () {
            function ElasticService(esFactory, euiHost) {
                this.client = esFactory({
                    host: euiHost
                });
            }
            ElasticService.$inject = ['esFactory', 'euiHost'];
            return ElasticService;
        })();
        services.ElasticService = ElasticService;
        services.services.service('es', ElasticService);
    })(elasticui.services || (elasticui.services = {}));
    var services = elasticui.services;
})(elasticui || (elasticui = {}));
angular.module('elasticui', ['elasticsearch', 'elasticui.filters', 'elasticui.controllers', 'elasticui.services', 'elasticui.directives']);
