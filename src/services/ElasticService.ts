module elasticui.services {
    export class ElasticService {
        public client;

        static $inject = ['esFactory', 'euiHost'];
        constructor(esFactory, euiHost) {
            this.client = esFactory({
                host: euiHost
            });

        }
    }
    services.service('es', ElasticService);
}