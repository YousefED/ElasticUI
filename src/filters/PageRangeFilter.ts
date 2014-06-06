module elasticui.filters {
    export class PageRangeFilter {
        constructor() {
            return (input: number[], total: number, current: number, neighbours: number= 5) => {
                // TODO: remove hardcoded numbers
                // TODO: remove for loop
                for (var i = 1; i <= total; i++) {
                    if (i <= current + neighbours && i >= current - neighbours
                        || (i < current && current - neighbours < 4)
                        || (i > current + neighbours && total - (current + neighbours) < 4)
                        ) {
                        input.push(i);
                    } else if (i == 1) {
                        input.push(1, -1);
                    } else if (i == total) {
                        input.push(-2, total);
                    }
                }
                return input;
            }
        }
    }

    filters.filter('euiPageRange', PageRangeFilter);
}