module elasticui.filters {
    export class RoundFilter {
        constructor() {
            return (input) => {
                if (!input) {
                    return input;
                }
                return Math.round(input);
            }
        }
    }

    filters.filter('euiRound', RoundFilter);
}