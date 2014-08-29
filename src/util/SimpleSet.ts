module elasticui.util {
    export class SimpleSet {
        public objects = [];

        public indexOf(object) {
            return this.objects.indexOf(object);
        }

        public add(object: any) {
            var idx = this.indexOf(object);
            if (idx == -1) {
                this.objects.push(object);
            }
        }

        public remove(object: any) {
            var idx = this.indexOf(object);
            if (idx > -1) {
                this.objects.splice(idx, 1);
            }
        }
    }
}