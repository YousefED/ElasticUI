module elasticui.util {
    export class EjsTool {
        public static getJsonFromEjsObject(object: any) {
            return angular.toJson(object.toJSON());
        }

        public static equals(objectA: any, objectB: any) {
            return !objectA && !objectB || (objectA && objectB && this.getJsonFromEjsObject(objectA) == this.getJsonFromEjsObject(objectB));
        }
    }
}