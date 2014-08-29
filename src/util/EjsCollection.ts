module elasticui.util {
    export class EjsCollection {
        public ejsObjects = [];
        private jsonObjects = [];

        public indexOf(ejsObject) {
            return this.jsonObjects.indexOf(EjsTool.getJsonFromEjsObject(ejsObject));
        }

        public add(ejsObject: any) {
            var idx = this.indexOf(ejsObject);
            if (idx == -1) {
                this.ejsObjects.push(ejsObject);
                this.jsonObjects.push(EjsTool.getJsonFromEjsObject(ejsObject));
            }
        }

        public remove(ejsObject: any) {
            var idx = this.indexOf(ejsObject);
            if (idx > -1) {
                this.ejsObjects.splice(idx, 1);
                this.jsonObjects.splice(idx, 1);
            }
        }
    }
}