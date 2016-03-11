declare namespace gapi {

    function load(api: string, callback: () => void);

    interface ApiResult<TResponse> {
        result: TResponse;
    }

    namespace auth {
        function authorize(params, callback: (authResult) => void);
    }

    namespace client {

        interface Batch extends PromiseLike<ApiResult<any[]>> {
            add(request: PromiseLike<any>);
        }

        function load(api, version, callback: () => void);
        function load(api, version) : PromiseLike<void>;
        
        function setApiKey(key: string);
        function newBatch(): Batch;
    }

}