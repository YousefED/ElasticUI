module elasticui.util {
    export class FilterCollection {
        public filters = [];
        private jsonFilters = [];

        private getFilterIndex(filter) {
            return this.jsonFilters.indexOf(FilterTool.getJsonFromFilter(filter));
        }

        public add(filter: any) {
            var idx = this.getFilterIndex(filter);
            if (idx == -1) {
                this.filters.push(filter);
                this.jsonFilters.push(FilterTool.getJsonFromFilter(filter));
            }
        }

        public remove(filter: any) {
            var idx = this.getFilterIndex(filter);
            if (idx > -1) {
                this.filters.splice(idx, 1);
                this.jsonFilters.splice(idx, 1);
            }
        }

        public getAsFilter(): any [] {
            return FilterTool.combineFilters(this.filters);
        }

        public getAsORFilter(): any[] {
            return FilterTool.combineFiltersShould(this.filters);
        }

        public contains(filter: any): boolean {
            return this.getFilterIndex(filter) > -1;
        }
    }
}