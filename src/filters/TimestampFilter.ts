module elasticui.filters {
    export class TimestampFilter {
        constructor() {
            return (input) => {
                return new Date(input).getTime();
            }
        }
    }

    filters.filter('euiTimestamp', TimestampFilter);
}