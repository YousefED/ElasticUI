var elasticui;
(function (elasticui) {
    var util;
    (function (util) {
        var EjsCollection = (function () {
            function EjsCollection() {
                this.ejsObjects = [];
                this.jsonObjects = [];
            }
            EjsCollection.prototype.indexOf = function (ejsObject) {
                return this.jsonObjects.indexOf(util.EjsTool.getJsonFromEjsObject(ejsObject));
            };
            EjsCollection.prototype.add = function (ejsObject) {
                var idx = this.indexOf(ejsObject);
                if (idx == -1) {
                    this.ejsObjects.push(ejsObject);
                    this.jsonObjects.push(util.EjsTool.getJsonFromEjsObject(ejsObject));
                }
            };
            EjsCollection.prototype.remove = function (ejsObject) {
                var idx = this.indexOf(ejsObject);
                if (idx > -1) {
                    this.ejsObjects.splice(idx, 1);
                    this.jsonObjects.splice(idx, 1);
                }
            };
            return EjsCollection;
        })();
        util.EjsCollection = EjsCollection;
    })(util = elasticui.util || (elasticui.util = {}));
})(elasticui || (elasticui = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var elasticui;
(function (elasticui) {
    var util;
    (function (util) {
        var FilterCollection = (function (_super) {
            __extends(FilterCollection, _super);
            function FilterCollection() {
                _super.apply(this, arguments);
            }
            FilterCollection.prototype.getAsFilter = function () {
                return util.FilterTool.combineFilters(this.ejsObjects);
            };
            FilterCollection.prototype.getAsORFilter = function () {
                return util.FilterTool.combineFiltersShould(this.ejsObjects);
            };
            FilterCollection.prototype.contains = function (filter) {
                return this.indexOf(filter) > -1;
            };
            return FilterCollection;
        })(util.EjsCollection);
        util.FilterCollection = FilterCollection;
    })(util = elasticui.util || (elasticui.util = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var util;
    (function (util) {
        var FilterTool = (function () {
            function FilterTool() {
            }
            FilterTool.combineFilters = function (filters) {
                if (filters.length === 1) {
                    return filters[0];
                }
                else if (filters.length > 1) {
                    return ejs.BoolFilter().must(filters);
                }
                return null;
            };
            FilterTool.combineFiltersShould = function (filters) {
                if (filters.length === 1) {
                    return filters[0];
                }
                else if (filters.length > 1) {
                    return ejs.BoolFilter().should(filters);
                }
                return null;
            };
            return FilterTool;
        })();
        util.FilterTool = FilterTool;
    })(util = elasticui.util || (elasticui.util = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var services;
    (function (_services) {
        _services.services = angular.module('elasticui.services', []);
    })(services = elasticui.services || (elasticui.services = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (_directives) {
        _directives.directives = angular.module('elasticui.directives', []);
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var AggregationDirective = (function () {
            function AggregationDirective() {
                var directive = {};
                directive.restrict = 'EAC';
                directive.scope = true;
                directive.controller = elasticui.controllers.AggregationController;
                directive.link = function (scope, element, attrs, aggCtrl) {
                    scope.$watch(element.attr('eui-aggregation') + " | euiCached", function (val) { return scope.aggregation.agg = val; });
                    var filterSelf = true;
                    var filterSelfAttr = element.attr('eui-filter-self');
                    if (filterSelfAttr) {
                        scope.$watch(filterSelfAttr, function (val) { return scope.aggregation.filterSelf = val; });
                        filterSelf = scope.$eval(filterSelfAttr);
                    }
                    scope.aggregation = {
                        agg: scope.$eval(element.attr('eui-aggregation') + " | euiCached"),
                        filterSelf: filterSelf
                    };
                    aggCtrl.init();
                };
                return directive;
            }
            return AggregationDirective;
        })();
        directives.AggregationDirective = AggregationDirective;
        directives.directives.directive('euiAggregation', elasticui.directives.AggregationDirective);
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var FilterDirective = (function () {
            function FilterDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.FilterController;
                directive.link = function (scope, element, attrs, filterCtrl) {
                    scope.$watch(element.attr('eui-filter') + " | euiCached", function (val) { return scope.filter.filter = val; });
                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) { return scope.filter.enabled = val; });
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var InvertedDirective = (function () {
            function InvertedDirective() {
                var directive = {};
                // http://stackoverflow.com/questions/13925462/angularjs-reverse-checkbox-state
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var SortDirective = (function () {
            function SortDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.SortController;
                directive.link = function (scope, element, attrs, sortCtrl) {
                    scope.$watch(element.attr('eui-sort') + " | euiCached", function (val) { return scope.sorting.sort = val; });
                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) { return scope.sorting.enabled = val; });
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        // should not be used (for development purposes atm)
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
    (function (_filters) {
        _filters.filters = angular.module('elasticui.filters', []);
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
    (function (filters) {
        // This filter makes sure the same elastic.js object is returned after every digest.
        // This workaround is needed because expressions like ejs.* return a new object every time
        var CachedFilter = (function () {
            function CachedFilter() {
                var values = {}; // keys: native elasticsearch json, values: elastic.js object
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
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
    (function (filters) {
        // utility filter returning a tuple [_1, _2] of an elasticsearch bucket, useful for passing data to chart libraries
        // _1 is set to the key
        // _2 is based on property parameter you can supply an object path(e.g.: "nested.property")
        // for example if you have buckets [{"key":"italy","doc_count":301}]
        // you can pass "doc_count" as property and it will return [["italy", 301]]
        var MapFilter = (function () {
            function MapFilter() {
                return function (input, property) {
                    var ret = [];
                    if (!input || !input.length) {
                        return input;
                    }
                    var arr = MapFilter.parseString(property);
                    return input.map(function (el) { return [el.key, MapFilter.getValue(el, arr)]; });
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
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
    (function (filters) {
        var PageRangeFilter = (function () {
            function PageRangeFilter() {
                return function (input, total, current, neighbours) {
                    if (neighbours === void 0) { neighbours = 5; }
                    for (var i = 1; i <= total; i++) {
                        if (i <= current + neighbours && i >= current - neighbours || (i < current && current - neighbours < 4) || (i > current + neighbours && total - (current + neighbours) < 4)) {
                            input.push(i);
                        }
                        else if (i == 1) {
                            input.push(1, -1);
                        }
                        else if (i == total) {
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
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
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
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
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
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var filters;
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
    })(filters = elasticui.filters || (elasticui.filters = {}));
})(elasticui || (elasticui = {}));
angular.module('elasticui.controllers', []).controller(elasticui.controllers);
var elasticui;
(function (elasticui) {
    var controllers;
    (function (controllers) {
        var AggregationController = (function () {
            function AggregationController($scope) {
                this.scope = $scope;
            }
            AggregationController.prototype.init = function () {
                var _this = this;
                this.scope.$parent.$watch('indexVM.results', function () { return _this.updateResults(); });
                this.scope.$watch('aggregation.agg', function (newVal, oldVal) {
                    if (!elasticui.util.EjsTool.equals(oldVal, newVal)) {
                        if (_this.previousProvider) {
                            _this.scope.indexVM.aggregationProviders.remove(_this.previousProvider);
                        }
                        _this.updateAgg();
                    }
                });
                this.scope.$watch('aggregation.filterSelf', function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        if (_this.previousProvider) {
                            _this.scope.indexVM.aggregationProviders.remove(_this.previousProvider);
                        }
                        _this.updateAgg();
                    }
                });
                this.scope.$on('$destroy', function () {
                    if (_this.previousProvider) {
                        _this.scope.indexVM.aggregationProviders.remove(_this.previousProvider);
                    }
                });
                this.updateAgg();
            };
            AggregationController.prototype.updateResults = function () {
                var res = this.scope.indexVM.results;
                if (this.scope.aggregation.agg && res && res.aggregations) {
                    var name = AggregationController.getAggName(this.scope.aggregation.agg);
                    var aggKey = Object.keys(res.aggregations).filter(function (key) { return key == name || key == "filtered_" + name; })[0];
                    var agg = res.aggregations[aggKey];
                    if (aggKey == "filtered_" + name) {
                        agg = agg[name];
                    }
                    this.scope.aggResult = agg;
                }
            };
            AggregationController.prototype.updateAgg = function () {
                var _this = this;
                var provider = null;
                if (this.scope.aggregation.agg) {
                    provider = function (filters) { return _this.getAggregation(filters); };
                }
                if (provider) {
                    this.scope.indexVM.aggregationProviders.add(provider);
                }
                this.previousProvider = provider;
            };
            AggregationController.getAggName = function (ejsAggregation) {
                return Object.keys(ejsAggregation.toJSON())[0];
            };
            AggregationController.prototype.getAggregationExplicit = function (ejsAggregation, filterSelf, filters) {
                var _this = this;
                if (!ejsAggregation) {
                    return null;
                }
                var facetFilters = filters;
                if (!filterSelf) {
                    facetFilters = facetFilters.filter(function (val) { return val != _this.scope.combinedFilter && (typeof val.field === "undefined" || val.field() != ejsAggregation.field()); });
                }
                var combinedFilters = elasticui.util.FilterTool.combineFilters(facetFilters);
                if (combinedFilters != null) {
                    ejsAggregation = new ejs.FilterAggregation("filtered_" + AggregationController.getAggName(ejsAggregation)).filter(combinedFilters).agg(ejsAggregation);
                }
                return ejsAggregation;
            };
            AggregationController.prototype.getAggregation = function (filters) {
                return this.getAggregationExplicit(this.scope.aggregation.agg, this.scope.aggregation.filterSelf, filters);
            };
            AggregationController.$inject = ['$scope'];
            return AggregationController;
        })();
        controllers.AggregationController = AggregationController;
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var controllers;
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
                }
                else {
                    this.scope.filters.remove(this.scope.filter.filter);
                }
            };
            FilterController.$inject = ['$scope'];
            return FilterController;
        })();
        controllers.FilterController = FilterController;
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var controllers;
    (function (controllers) {
        var IndexController = (function () {
            function IndexController($scope, $timeout, $window, es, $rootScope) {
                var _this = this;
                this.filters = new elasticui.util.FilterCollection();
                this.indexVM = {
                    host: null,
                    query: null,
                    sort: null,
                    aggregationProviders: new elasticui.util.SimpleSet(),
                    filters: this.filters,
                    highlight: null,
                    loaded: false,
                    page: 1,
                    index: null,
                    loading: false,
                    pageCount: 0,
                    pageSize: 10,
                    results: null,
                    refresh: function (softRefresh) {
                        if (softRefresh === void 0) { softRefresh = true; }
                        return _this.refresh(softRefresh);
                    },
                    error: null,
                    autoLoad: true
                };
                this.searchPromise = null;
                this.refreshPromise = null;
                this.es = es;
                this.$rootScope = $rootScope;
                $scope.indexVM = this.indexVM;
                $scope.ejs = $window.ejs; // so we can use ejs in attributes etc. TODO: better to have a ejs service instead of loading from window
                $scope.filters = this.filters;
                $scope.$watchCollection('indexVM.filters.ejsObjects', function () {
                    _this.indexVM.page = 1;
                    _this.search();
                });
                $scope.$watchCollection('indexVM.aggregationProviders.objects', function () { return _this.search(); });
                $scope.$watch('indexVM.host', function () {
                    if (_this.indexVM.host != null && es.setHost(_this.indexVM.host)) {
                        _this.search();
                    }
                });
                $scope.$watch('indexVM.sort', function () {
                    _this.indexVM.page = 1;
                    _this.search();
                });
                $scope.$watch('indexVM.pageSize', function () {
                    _this.indexVM.page = 1;
                    _this.search();
                });
                $scope.$watch('indexVM.page', function () { return _this.search(); });
                $scope.$watch('indexVM.index', function () { return _this.search(); });
                $scope.$watch('indexVM.query', function () { return _this.search(); });
                $scope.$watch('indexVM.highlight', function () { return _this.search(); });
                $timeout(function () { return _this.loaded(); }, 200); // TODO: find better way to recognize loading of app
            }
            IndexController.prototype.loaded = function () {
                if (!this.indexVM.loaded) {
                    this.indexVM.loaded = true;
                    if (this.indexVM.autoLoad) {
                        this.search();
                    }
                }
            };
            IndexController.prototype.getSearchPromise = function () {
                var request = ejs.Request();
                for (var i = 0; i < this.indexVM.aggregationProviders.objects.length; i++) {
                    var provider = this.indexVM.aggregationProviders.objects[i];
                    var agg = provider(this.filters.ejsObjects);
                    request.agg(agg);
                }
                // apply search filters to the request
                var combinedFilter = this.filters.getAsFilter();
                if (combinedFilter != null) {
                    request.filter(combinedFilter);
                }
                if (this.indexVM.query != null) {
                    request.query(this.indexVM.query);
                }
                else {
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
                    from: this.indexVM.pageSize * (this.indexVM.page - 1),
                    body: request
                });
                return res;
            };
            IndexController.prototype.onError = function (err) {
                this.$rootScope.$broadcast('eui-search-error', err);
                this.indexVM.error = err;
            };
            IndexController.prototype.search = function () {
                var _this = this;
                if (!this.indexVM.loaded || !this.indexVM.index) {
                    return;
                }
                if (this.refreshPromise != null) {
                    var promiseToAbort = this.refreshPromise;
                    this.refreshPromise = null;
                    promiseToAbort.abort();
                }
                if (this.searchPromise != null) {
                    var promiseToAbort = this.searchPromise;
                    this.searchPromise = null;
                    promiseToAbort.abort();
                }
                this.indexVM.loading = true;
                this.searchPromise = this.getSearchPromise();
                this.searchPromise.then(function (body) {
                    _this.searchPromise = null;
                    _this.indexVM.error = null;
                    _this.onResult(body);
                }, function (err) {
                    if (_this.searchPromise) {
                        _this.searchPromise = null;
                        _this.onError(err);
                    }
                });
            };
            IndexController.prototype.refresh = function (softRefresh) {
                var _this = this;
                if (softRefresh === void 0) { softRefresh = true; }
                if (!this.indexVM.loaded || !this.indexVM.index || this.searchPromise != null) {
                    return;
                }
                this.indexVM.loading = true;
                this.refreshPromise = this.getSearchPromise();
                this.refreshPromise.then(function (body) {
                    _this.refreshPromise = null;
                    _this.indexVM.error = null;
                    _this.onResult(body, softRefresh);
                }, function (err) {
                    if (_this.refreshPromise) {
                        _this.refreshPromise = null;
                        _this.onError(err);
                    }
                });
            };
            IndexController.prototype.onResult = function (body, updateOnlyIfCountChanged) {
                if (updateOnlyIfCountChanged === void 0) { updateOnlyIfCountChanged = false; }
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
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var controllers;
    (function (controllers) {
        var OrFilterController = (function () {
            function OrFilterController($scope) {
                var _this = this;
                this.filters = new elasticui.util.FilterCollection();
                $scope.filters = this.filters;
                $scope.$watchCollection('filters.ejsObjects', function () { return _this.updateCombinedFilter(); });
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
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var controllers;
    (function (controllers) {
        var SortController = (function () {
            function SortController($scope) {
                this.scope = $scope;
            }
            SortController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('indexVM.sort', function () { return _this.updateEnabled(); });
                this.scope.$watch('sorting.sort', function () { return _this.updateSort(); });
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
                }
                else {
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
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var services;
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
                    host: host,
                    calcDeadTimeout: "flat"
                });
                return true;
            };
            ElasticService.$inject = ['esFactory', 'euiHost'];
            return ElasticService;
        })();
        services.ElasticService = ElasticService;
        services.services.service('es', ElasticService);
    })(services = elasticui.services || (elasticui.services = {}));
})(elasticui || (elasticui = {}));
angular.module('elasticui', ['elasticsearch', 'elasticui.filters', 'elasticui.controllers', 'elasticui.services', 'elasticui.directives', 'elasticui.widgets.directives']);
var elasticui;
(function (elasticui) {
    var widgets;
    (function (widgets) {
        var directives;
        (function (_directives) {
            _directives.directives = angular.module('elasticui.widgets.directives', []);
            _directives.default_agg_count = 0;
        })(directives = widgets.directives || (widgets.directives = {}));
    })(widgets = elasticui.widgets || (elasticui.widgets = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var widgets;
    (function (widgets) {
        var directives;
        (function (directives) {
            // The widgets show how to create reusable components on top of ElasticUI. 
            // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
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
                    // TODO: make sure checked boxes are always at top
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
        })(directives = widgets.directives || (widgets.directives = {}));
    })(widgets = elasticui.widgets || (elasticui.widgets = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var widgets;
    (function (widgets) {
        var directives;
        (function (directives) {
            // The widgets show how to create reusable components on top of ElasticUI. 
            // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
            var SimplePagingDirective = (function () {
                function SimplePagingDirective() {
                    var directive = {};
                    directive.restrict = 'E';
                    directive.scope = true;
                    directive.template = '\
            <ul class="pager">\
                <li ng-if="indexVM.page <= 1" class="disabled"><a href="">Previous</a></li>\
                <li ng-if="indexVM.page > 1"><a href="" ng-click="indexVM.page=indexVM.page - 1">Previous</a></li>\
                <li ng-if="indexVM.pageCount <= indexVM.page" class="disabled"><a href="">Next</a></li>\
                <li ng-if="indexVM.pageCount > indexVM.page"><a href="" ng-click="indexVM.page=indexVM.page + 1">Next</a></li>\
            </ul>';
                    return directive;
                }
                return SimplePagingDirective;
            })();
            directives.SimplePagingDirective = SimplePagingDirective;
            directives.directives.directive('euiSimplePaging', SimplePagingDirective);
        })(directives = widgets.directives || (widgets.directives = {}));
    })(widgets = elasticui.widgets || (elasticui.widgets = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var widgets;
    (function (widgets) {
        var directives;
        (function (directives) {
            // The widgets show how to create reusable components on top of ElasticUI. 
            // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
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
        })(directives = widgets.directives || (widgets.directives = {}));
    })(widgets = elasticui.widgets || (elasticui.widgets = {}));
})(elasticui || (elasticui = {}));
/// <reference path="src/util/EjsCollection.ts" />
/// <reference path="src/util/FilterCollection.ts" />
/// <reference path="src/util/FilterTool.ts" />
/// <reference path="src/services/services.ts" />
/// <reference path="src/directives/directives.ts" />
/// <reference path="src/directives/AggregationDirective.ts" />
/// <reference path="src/directives/FilterDirective.ts" />
/// <reference path="src/directives/IndexDirective.ts" />
/// <reference path="src/directives/InvertedDirective.ts" />
/// <reference path="src/directives/OrFilterDirective.ts" />
/// <reference path="src/directives/SortDirective.ts" />
/// <reference path="src/directives/VarDirective.ts" />
/// <reference path="src/filters/filters.ts" />
/// <reference path="src/filters/CachedFilter.ts" />
/// <reference path="src/filters/MapFilter.ts" />
/// <reference path="src/filters/PageRangeFilter.ts" />
/// <reference path="src/filters/RangeFilter.ts" />
/// <reference path="src/filters/RoundFilter.ts" />
/// <reference path="src/filters/TimestampFilter.ts" />
/// <reference path="src/controllers/controllers.ts" />
/// <reference path="src/controllers/AggregationController.ts" />
/// <reference path="src/controllers/FilterController.ts" />
/// <reference path="src/controllers/IFilteredScope.ts" />
/// <reference path="src/controllers/IIndexScope.ts" />
/// <reference path="src/controllers/IndexController.ts" />
/// <reference path="src/controllers/OrFilterController.ts" />
/// <reference path="src/controllers/SortController.ts" />
/// <reference path="src/services/services.ts" />
/// <reference path="src/services/ElasticService.ts" />
/// <reference path="src/controllers/controllers.ts" />
/// <reference path="src/main.ts" />
/// <reference path="src/widgets/directives/directives.ts" />
/// <reference path="src/widgets/directives/ChecklistDirective.ts" />
/// <reference path="src/widgets/directives/SimplePagingDirective.ts" />
/// <reference path="src/widgets/directives/SingleselectDirective.ts" />
var elasticui;
(function (elasticui) {
    var controllers;
    (function (controllers) {
        var HighlightController = (function () {
            function HighlightController($scope) {
                this.scope = $scope;
            }
            HighlightController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('indexVM.highlight', function () { return _this.updateEnabled(); });
                this.scope.$watch('highlighting.highlight', function () { return _this.updateHighlight(); });
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
                }
                else {
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
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var controllers;
    (function (controllers) {
        var HostController = (function () {
            function HostController($scope) {
                this.scope = $scope;
            }
            HostController.prototype.init = function () {
                var _this = this;
                this.scope.$watch('indexVM.host', function () { return _this.readHost(); });
                this.scope.$watch('host', function () { return _this.updateHost(); });
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
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var controllers;
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
                }
                else {
                    this.scope.indexVM.query = this.scope.query.query;
                }
            };
            QueryController.$inject = ['$scope'];
            return QueryController;
        })();
        controllers.QueryController = QueryController;
    })(controllers = elasticui.controllers || (elasticui.controllers = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var HighlightDirective = (function () {
            function HighlightDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.HighlightController;
                directive.link = function (scope, element, attrs, highlightCtrl) {
                    scope.$watch(element.attr('eui-highlight') + " | euiCached", function (val) { return scope.highlighting.highlight = val; });
                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) { return scope.highlighting.enabled = val; });
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var HostDirective = (function () {
            function HostDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.HostController;
                directive.link = function (scope, element, attrs, hostCtrl) {
                    scope.$watch(element.attr('eui-host'), function (val) { return scope.host = val; });
                    scope.host = scope.$eval(element.attr('eui-host'));
                    hostCtrl.init();
                };
                return directive;
            }
            return HostDirective;
        })();
        directives.HostDirective = HostDirective;
        directives.directives.directive('euiHost', HostDirective);
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var directives;
    (function (directives) {
        var QueryDirective = (function () {
            function QueryDirective() {
                var directive = {};
                directive.restrict = 'A';
                directive.scope = true;
                directive.controller = elasticui.controllers.QueryController;
                directive.link = function (scope, element, attrs, queryCtrl) {
                    scope.$watch(element.attr('eui-query') + " | euiCached", function (val) { return scope.query.query = val; });
                    var enabled = false;
                    var enabledAttr = element.attr('eui-enabled');
                    if (enabledAttr) {
                        scope.$watch(enabledAttr, function (val) { return scope.query.enabled = val; });
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
    })(directives = elasticui.directives || (elasticui.directives = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var util;
    (function (util) {
        // TODO, probably want to move stuff in util module to services
        var AngularTool = (function () {
            function AngularTool() {
            }
            // http://stackoverflow.com/questions/24303408/bind-to-attributes-in-prototypically-inherited-scope
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
    })(util = elasticui.util || (elasticui.util = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var util;
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
    })(util = elasticui.util || (elasticui.util = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var util;
    (function (util) {
        var SimpleSet = (function () {
            function SimpleSet() {
                this.objects = [];
            }
            SimpleSet.prototype.indexOf = function (object) {
                return this.objects.indexOf(object);
            };
            SimpleSet.prototype.add = function (object) {
                var idx = this.indexOf(object);
                if (idx == -1) {
                    this.objects.push(object);
                }
            };
            SimpleSet.prototype.remove = function (object) {
                var idx = this.indexOf(object);
                if (idx > -1) {
                    this.objects.splice(idx, 1);
                }
            };
            return SimpleSet;
        })();
        util.SimpleSet = SimpleSet;
    })(util = elasticui.util || (elasticui.util = {}));
})(elasticui || (elasticui = {}));
var elasticui;
(function (elasticui) {
    var widgets;
    (function (widgets) {
        var directives;
        (function (directives) {
            // The widgets show how to create reusable components on top of ElasticUI. 
            // You can also directly use the directive.template html in your front-end (see docs/widgets.md for more info)
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
                    // TODO: should be debounced
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
        })(directives = widgets.directives || (widgets.directives = {}));
    })(widgets = elasticui.widgets || (elasticui.widgets = {}));
})(elasticui || (elasticui = {}));
