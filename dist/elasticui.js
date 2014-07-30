var elasticui;
(function (elasticui) {
    (function (util) {
        var FilterCollection = (function () {
            function FilterCollection() {
                this.filters = [];
                this.jsonFilters = [];
            }
            FilterCollection.prototype.getFilterIndex = function (filter) {
                return this.jsonFilters.indexOf(util.EjsTool.getJsonFromEjsObject(filter));
            };

            FilterCollection.prototype.add = function (filter) {
                var idx = this.getFilterIndex(filter);
                if (idx == -1) {
                    this.filters.push(filter);
                    this.jsonFilters.push(util.EjsTool.getJsonFromEjsObject(filter));
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
            function FilterDirective() {
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
                    scope.$watch(attrs.euiIndex, function (val) {
                        indexCtrl.indexVM.index = val;
                    });
                    indexCtrl.indexVM.index = scope.$eval(attrs.euiIndex);
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
            VarDirective.$inject = ['$timeout'];
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
                    if (!elasticui.util.EjsTool.equals(oldVal, newVal)) {
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
            function IndexController($scope, $timeout, $window, es, $rootScope) {
                var _this = this;
                this.aggregations = [];
                this.filters = new elasticui.util.FilterCollection();
                this.indexVM = {
                    host: null,
                    query: null,
                    sort: null,
                    highlight: null,
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
                this.$rootScope = $rootScope;

                $scope.indexVM = this.indexVM;
                $scope.ejs = $window.ejs;
                $scope.mainController = this;
                $scope.filters = this.filters;
                $scope.$watchCollection('filters.filters', function () {
                    _this.indexVM.page = 1;
                    _this.search();
                });
                $scope.$watch('indexVM.host', function () {
                    if (_this.indexVM.host != null && es.setHost(_this.indexVM.host)) {
                        _this.search();
                    }
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
                $scope.$watch('indexVM.query', function () {
                    return _this.search();
                });
                $scope.$watch('indexVM.highlight', function () {
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
                var request = ejs.Request();

                for (var i = 0; i < this.aggregations.length; i++) {
                    var agg = this.aggregations[i].getAggregation(this.filters.filters);
                    request.agg(agg);
                }

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

                var res = this.es.client.search({
                    index: this.indexVM.index,
                    size: this.indexVM.pageSize,
                    from: this.indexVM.pageSize * (this.indexVM.page - 1),
                    body: request
                });

                var abort = res.abort;

                res = res.then(null, function (err) {
                    this.$rootScope.$broadcast('eui-search-error', err);
                }.bind(this));

                res.abort = abort;

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
            IndexController.$inject = ['$scope', '$timeout', '$window', 'es', '$rootScope'];
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
                this.scope.$watch('sorting.enabled', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.updateSort();
                    }
                });

                this.updateSort();
            };

            SortController.prototype.updateSort = function () {
                if (this.scope.sorting.enabled) {
                    this.scope.indexVM.sort = this.scope.sorting.sort;
                } else {
                    if (this.isEnabledOnIndexScope()) {
                        this.scope.indexVM.sort = null;
                    }
                }
            };

            SortController.prototype.updateEnabled = function () {
                this.scope.sorting.enabled = this.isEnabledOnIndexScope();
            };

            SortController.prototype.isEnabledOnIndexScope = function () {
                return this.scope.indexVM.sort != null && angular.equals(this.scope.indexVM.sort.toJSON(), this.scope.sorting.sort.toJSON());
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
                this.esFactory = esFactory;
                this.setHost(euiHost);
            }
            ElasticService.prototype.setHost = function (host) {
                if (host === this.host) {
                    return false;
                }

                this.host = host;
                this.client = this.esFactory({
                    host: host
                });

                return true;
            };
            ElasticService.$inject = ['esFactory', 'euiHost'];
            return ElasticService;
        })();
        services.ElasticService = ElasticService;
        services.services.service('es', ElasticService);
    })(elasticui.services || (elasticui.services = {}));
    var services = elasticui.services;
})(elasticui || (elasticui = {}));
angular.module('elasticui', ['elasticsearch', 'elasticui.filters', 'elasticui.controllers', 'elasticui.services', 'elasticui.directives', 'elasticui.widgets.directives']);
var elasticui;
(function (elasticui) {
    (function (widgets) {
        (function (_directives) {
            _directives.directives = angular.module('elasticui.widgets.directives', []);
            _directives.default_agg_count = 0;
        })(widgets.directives || (widgets.directives = {}));
        var directives = widgets.directives;
    })(elasticui.widgets || (elasticui.widgets = {}));
    var widgets = elasticui.widgets;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (widgets) {
        (function (directives) {
            var ChecklistDirective = (function () {
                function ChecklistDirective($parse) {
                    var directive = {};
                    directive.restrict = 'E';
                    directive.scope = true;

                    directive.link = {
                        'pre': function (scope, element, attrs) {
                            elasticui.util.AngularTool.setupBinding($parse, scope, attrs, ["field", "size"]);
                            scope.agg_name = scope.field.replace(/[^a-z_0-9]/gmi, "_") + "_" + (directives.default_agg_count++);
                        }
                    };

                    directive.template = '\
            <ul class="nav nav-list" eui-aggregation="ejs.TermsAggregation(agg_name).field(field).size(size)">\
                <li ng-repeat="bucket in aggResult.buckets">\
                    <label class="checkbox" eui-filter="ejs.TermsFilter(field, bucket.key)">\
                        <input type="checkbox" ng-model="filter.enabled">\
                        {{bucket.key}} ({{bucket.doc_count}})\
                    </label>\
                </li>\
            </ul>';

                    return directive;
                }
                ChecklistDirective.$inject = ['$parse'];
                return ChecklistDirective;
            })();
            directives.ChecklistDirective = ChecklistDirective;
            directives.directives.directive('euiChecklist', ChecklistDirective);
        })(widgets.directives || (widgets.directives = {}));
        var directives = widgets.directives;
    })(elasticui.widgets || (elasticui.widgets = {}));
    var widgets = elasticui.widgets;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (widgets) {
        (function (directives) {
            var SimplePagingDirective = (function () {
                function SimplePagingDirective() {
                    var directive = {};
                    directive.restrict = 'E';
                    directive.scope = true;

                    directive.template = '\
            <ul class="pager">\
                <li ng-class="{disabled:indexVM.page <= 1}"><a href="" ng-click="indexVM.page=indexVM.page - 1">Previous</a></li>\
                <li ng-class="{disabled:indexVM.pageCount <= indexVM.page}"><a href="" ng-click="indexVM.page=indexVM.page + 1">Next</a></li>\
            </ul>';

                    return directive;
                }
                return SimplePagingDirective;
            })();
            directives.SimplePagingDirective = SimplePagingDirective;
            directives.directives.directive('euiSimplePaging', SimplePagingDirective);
        })(widgets.directives || (widgets.directives = {}));
        var directives = widgets.directives;
    })(elasticui.widgets || (elasticui.widgets = {}));
    var widgets = elasticui.widgets;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (widgets) {
        (function (directives) {
            var SingleselectDirective = (function () {
                function SingleselectDirective($parse) {
                    var directive = {};
                    directive.restrict = 'E';
                    directive.scope = true;

                    directive.link = {
                        'pre': function (scope, element, attrs) {
                            elasticui.util.AngularTool.setupBinding($parse, scope, attrs, ["field", "size"]);
                            scope.agg_name = scope.field.replace(/[^a-z_0-9]/gmi, "_") + "_" + (directives.default_agg_count++);
                        }
                    };

                    directive.template = '\
            <ul class="nav nav-list" eui-aggregation="ejs.TermsAggregation(agg_name).field(field).size(size)">\
                <li ng-repeat="bucket in aggResult.buckets">\
                    <label eui-filter="ejs.TermsFilter(field, bucket.key)">\
                        <span ng-if="!filter.enabled"><a href="" ng-click="filter.enabled=true">{{bucket.key}} <span class="muted">({{bucket.doc_count}})</span></a></span>\
                        <span ng-if="filter.enabled">{{bucket.key}} <a href="" ng-click="filter.enabled=false" class="facet-remove">x</a></span>\
                    </label>\
                </li>\
            </ul>';

                    return directive;
                }
                SingleselectDirective.$inject = ['$parse'];
                return SingleselectDirective;
            })();
            directives.SingleselectDirective = SingleselectDirective;
            directives.directives.directive('euiSingleselect', SingleselectDirective);
        })(widgets.directives || (widgets.directives = {}));
        var directives = widgets.directives;
    })(elasticui.widgets || (elasticui.widgets = {}));
    var widgets = elasticui.widgets;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var HighlightController = (function () {
            function HighlightController($scope) {
                this.scope = $scope;
            }
            HighlightController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('indexVM.highlight', function () {
                    return _this.updateEnabled();
                });
                this.scope.$watch('highlighting.highlight', function () {
                    return _this.updateHighlight();
                });
                this.scope.$watch('highlighting.enabled', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.updateHighlight();
                    }
                });
                this.updateHighlight();
            };

            HighlightController.prototype.updateHighlight = function () {
                if (this.scope.highlighting.enabled) {
                    this.scope.indexVM.highlight = this.scope.highlighting.highlight;
                } else {
                    if (this.isEnabledOnIndexScope()) {
                        this.scope.indexVM.highlight = null;
                    }
                }
            };

            HighlightController.prototype.updateEnabled = function () {
                this.scope.highlighting.enabled = this.isEnabledOnIndexScope();
            };

            HighlightController.prototype.isEnabledOnIndexScope = function () {
                return this.scope.indexVM.highlight != null && angular.equals(this.scope.indexVM.highlight.toJSON(), this.scope.highlighting.highlight.toJSON());
            };
            HighlightController.$inject = ['$scope'];
            return HighlightController;
        })();
        controllers.HighlightController = HighlightController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var HostController = (function () {
            function HostController($scope) {
                this.scope = $scope;
            }
            HostController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('indexVM.host', function () {
                    return _this.readHost();
                });
                this.scope.$watch('host', function () {
                    return _this.updateHost();
                });

                this.updateHost();
            };

            HostController.prototype.updateHost = function () {
                if (this.scope.host !== null) {
                    this.scope.indexVM.host = this.scope.host;
                }
            };

            HostController.prototype.readHost = function () {
                this.scope.host = this.scope.indexVM.host;
            };
            HostController.$inject = ['$scope'];
            return HostController;
        })();
        controllers.HostController = HostController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (controllers) {
        var QueryController = (function () {
            function QueryController($scope) {
                this.scope = $scope;
            }
            QueryController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('query.enabled', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.updateQuery();
                    }
                });

                this.scope.$watch('query.query', function (newVal, oldVal) {
                    if (!elasticui.util.EjsTool.equals(oldVal, newVal)) {
                        _this.updateQuery();
                    }
                });
                this.updateQuery();
            };

            QueryController.prototype.updateQuery = function () {
                if (!this.scope.query.query) {
                    return;
                }
                if (!this.scope.query.enabled) {
                    this.scope.indexVM.query = null;
                } else {
                    this.scope.indexVM.query = this.scope.query.query;
                }
            };
            QueryController.$inject = ['$scope'];
            return QueryController;
        })();
        controllers.QueryController = QueryController;
    })(elasticui.controllers || (elasticui.controllers = {}));
    var controllers = elasticui.controllers;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var HighlightDirective = (function () {
            function HighlightDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;

                directive.controller = elasticui.controllers.HighlightController;
                directive.link = function (scope, element, attrs, highlightCtrl) {
                    scope.$watch(element.attr('eui-highlight') + " | euiCached", function (val) {
                        return scope.highlighting.highlight = val;
                    });

                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) {
                            return scope.highlighting.enabled = val;
                        });
                        enabled = scope.$eval(enabledAttr);
                    }

                    scope.highlighting = {
                        highlight: scope.$eval(element.attr('eui-highlight') + " | euiCached"),
                        enabled: enabled
                    };

                    highlightCtrl.init();
                };
                return directive;
            }
            return HighlightDirective;
        })();
        directives.HighlightDirective = HighlightDirective;
        directives.directives.directive('euiHighlight', HighlightDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var HostDirective = (function () {
            function HostDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;

                directive.controller = elasticui.controllers.HostController;
                directive.link = function (scope, element, attrs, hostCtrl) {
                    scope.$watch(element.attr('eui-host'), function (val) {
                        return scope.host = val;
                    });

                    scope.host = scope.$eval(element.attr('eui-host'));

                    hostCtrl.init();
                };
                return directive;
            }
            return HostDirective;
        })();
        directives.HostDirective = HostDirective;
        directives.directives.directive('euiHost', HostDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (directives) {
        var QueryDirective = (function () {
            function QueryDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.QueryController;
                directive.link = function (scope, element, attrs, queryCtrl) {
                    scope.$watch(element.attr('eui-query') + " | euiCached", function (val) {
                        return scope.query.query = val;
                    });

                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) {
                            return scope.query.enabled = val;
                        });
                        enabled = scope.$eval(enabledAttr);
                    }

                    scope.query = {
                        query: scope.$eval(element.attr('eui-query') + " | euiCached"),
                        enabled: enabled
                    };

                    queryCtrl.init();
                };
                return directive;
            }
            return QueryDirective;
        })();
        directives.QueryDirective = QueryDirective;
        directives.directives.directive('euiQuery', QueryDirective);
    })(elasticui.directives || (elasticui.directives = {}));
    var directives = elasticui.directives;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (util) {
        var AngularTool = (function () {
            function AngularTool() {
            }
            AngularTool.setupBinding = function ($parse, scope, attrs, attrsToBind) {
                angular.forEach(attrsToBind, function (attrName, key) {
                    scope.$watch(attrs[attrName], function (val) {
                        if (scope[attrName] != val) {
                            scope[attrName] = val;
                        }
                    });
                    scope[attrName] = $parse(attrs[attrName])(scope);
                });
            };
            return AngularTool;
        })();
        util.AngularTool = AngularTool;
    })(elasticui.util || (elasticui.util = {}));
    var util = elasticui.util;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (util) {
        var EjsTool = (function () {
            function EjsTool() {
            }
            EjsTool.getJsonFromEjsObject = function (object) {
                return angular.toJson(object.toJSON());
            };

            EjsTool.equals = function (objectA, objectB) {
                return !objectA && !objectB || (objectA && objectB && this.getJsonFromEjsObject(objectA) == this.getJsonFromEjsObject(objectB));
            };
            return EjsTool;
        })();
        util.EjsTool = EjsTool;
    })(elasticui.util || (elasticui.util = {}));
    var util = elasticui.util;
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    (function (widgets) {
        (function (directives) {
            var SearchboxDirective = (function () {
                function SearchboxDirective($parse) {
                    var directive = {};
                    directive.restrict = 'E';
                    directive.scope = true;

                    directive.link = {
                        'pre': function (scope, element, attrs) {
                            elasticui.util.AngularTool.setupBinding($parse, scope, attrs, ["field"]);
                        }
                    };

                    directive.template = '\
            <input type="text" eui-query="ejs.MatchQuery(field, querystring)" ng-model="querystring" eui-enabled="querystring.length" />\
            ';

                    return directive;
                }
                SearchboxDirective.$inject = ['$parse'];
                return SearchboxDirective;
            })();
            directives.SearchboxDirective = SearchboxDirective;
            directives.directives.directive('euiSearchbox', SearchboxDirective);
        })(widgets.directives || (widgets.directives = {}));
        var directives = widgets.directives;
    })(elasticui.widgets || (elasticui.widgets = {}));
    var widgets = elasticui.widgets;
})(elasticui || (elasticui = {}));
