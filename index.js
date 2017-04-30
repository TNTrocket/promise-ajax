class simple {
    constructor(typeCall){
        this.typeCall = typeCall;
        if(!this.typeCall){
            this.call = window.fetch
        }else{
            this.call = this.typeCall
        }
        this.resConfig ={
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        }
    }
    ajaxSetUp(url,opition, successCallback, errorCallback) {
        $.ajax(url,opition).done(function (data, textStatus, jqXHR) {
            (successCallback || $.noop)(data);
        }).fail(function (jqXHR, textStatus, errorThrown) {
            if (typeof errorCallback == "function") {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        })
    }
    callApi(url,opition) {
        let deferred = $.Deferred();
        this.ajaxSetUp(url,opition, function (data) {
            deferred.resolve(data);
        }, function (jqXHR, textStatus, errorThrown) {
            deferred.reject(textStatus);
        });
        return deferred.promise();
    }
    simpleCall(url,opition){
        opition = Object.assign(this.resConfig,opition);
        if(!this.typeCall) {
            var myPromise = new Promise((resolve, reject) => {
                this.call(url, this.resConfig).then(() => {
                    resolve("success")
                }, () => {
                    reject("failure")
                })
            });
            return myPromise
        }else{
            this.callApi(url,this.resConfig)
        }


    }

}
var  simpleType;
if(typeof $  === undefined){
    simpleType = ""
}
else{
    simpleType = $
}
export   let apiCall = simple(simpleType).simpleCall;