module elasticui.util {
    export class FilterTool {
        public static combineFilters(filters: any[]) {
            if (filters.length === 1) {
                return filters[0];
            } else if (filters.length > 1) {
                return ejs.BoolFilter().must(filters);
            }
            return null;
        }

        public static combineFiltersShould(filters: any[]) {
            if (filters.length === 1) {
                return filters[0];
            } else if (filters.length > 1) {
                return ejs.BoolFilter().should(filters);
            }
            return null;
        }

        public static getJsonFromFilter(filter: any) {
            return angular.toJson(filter.toJSON());
        }

        public static equals(filterA: any, filterB: any) {
            return !filterA && !filterB || (filterA && filterB && this.getJsonFromFilter(filterA) == this.getJsonFromFilter(filterB));
        }
    }
}