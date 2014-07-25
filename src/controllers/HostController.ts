module elasticui.controllers {

    export interface IHostScope extends IIndexScope {
        host: any;
    }

    export class HostController{
        private scope: IHostScope;

        static $inject = ['$scope'];
        constructor($scope: IHostScope){
            this.scope = $scope;
        }

        public init() {
            this.scope.$watch('indexVM.host', () => this.readHost());
            this.scope.$watch('host', () => this.updateHost());

            this.updateHost();
        }

        private updateHost() {
            if (this.scope.host !== null) {
                this.scope.indexVM.host = this.scope.host;
            }
        }

        public readHost() {
            this.scope.host = this.scope.indexVM.host;
        }
    }
}
