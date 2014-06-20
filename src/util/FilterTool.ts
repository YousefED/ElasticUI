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
    }
}