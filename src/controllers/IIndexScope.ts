module elasticui.controllers {
    export interface IIndexScope extends IFilteredScope {
        indexVM: IIndexViewModel;
    }

    export interface IIndexViewModel {
        host: any;
        query: any;
        sort: any;
        highlight: any;
        loaded: boolean;
        loading: boolean;
        page: number;
        index: string;
        pageCount: number;
        pageSize: number;
        results: any;
        addAggregationProvider: (any) => void;
        refresh: () => void;
    }
}
