module elasticui.services {
    export class ElasticService {
        public client;
        private esFactory;
        private host;

        static $inject = ['esFactory', 'euiHost'];
        constructor(esFactory, euiHost) {
            this.esFactory = esFactory;
            this.setHost(euiHost);
        }

        public setHost(host) {
            if (host === this.host) {
                return false;
            }

            this.host = host;
            this.client = this.esFactory({
                host: host,
                calcDeadTimeout: "flat"
            });

            return true;
        }
    }
    services.service('es', ElasticService);
}
