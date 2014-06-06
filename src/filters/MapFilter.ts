module elasticui.filters {
    // utility filter returning a tuple [_1, _2] of an elasticsearch bucket, useful for passing data to chart libraries
    // _1 is set to the key
    // _2 is based on property parameter you can supply an object path(e.g.: "nested.property")
    // for example if you have buckets [{"key":"italy","doc_count":301}]
    // you can pass "doc_count" as property and it will return [["italy", 301]]
    export class MapFilter {
        private static parseString(input: string) {
            return input.split(".");
        }

        private static getValue(element: any, propertyArray: string[]) {
            var value = element;

            angular.forEach(propertyArray, function (property: string) {
                if (!value) {
                    return value;
                }
                value = value[property];
            });

            return value;
        }

        constructor() {
            return (input: any[], property: string) => {
                var ret = [];
                if (!input || !input.length) {
                    return input;
                }
                var arr = MapFilter.parseString(property);
                return input.map((el) => [el.key, MapFilter.getValue(el, arr)]);
            }
        }
    }

    filters.filter('euiMap', MapFilter);
}