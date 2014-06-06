module elasticui.filters {
    export class RangeFilter {
        constructor() {
            return (input, total) => {
                total = parseInt(total);
                for (var i = 0; i < total; i++) {
                    input.push(i);
                }
                return input;
            }
        }
    }

    filters.filter('euiRange', RangeFilter);
}