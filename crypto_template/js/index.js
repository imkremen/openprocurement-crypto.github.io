var localData = {};

function initCryptoTemplate(initObj) {
    localData = {};
    //$.ajaxSetup({'cache': true});
    var useJsonp = false;
    //
    localData.callbackPostSign = initObj.callbackPostSign || 'console.log';
    var renderObject = initObj.renderObject || false;
    var callbackRender = initObj.callbackRender || 'console.log';
    // element for loading template
    var placeholderEl = $(initObj.placeholderId);
    // render error
    var errorBlock = $('<div class="alert alert-danger">');
    // if not exist, create in body bottom
    if (placeholderEl.size() === 0) {
        placeholderEl = $("<div id='sign'/>");
        $("body").append(placeholderEl);
    }
    var url = initObj.apiResourceUrl;
    if (!url)
        url = initObj.apiUrl + initObj.objType + '/' + initObj.objId;
    localData.apiResourceUrl = url;
    var urlDocs = url + "/documents";
    var ajaxParamsObj = {url: url};
    var ajaxParamsDocs = {url: urlDocs};

    if (useJsonp) {
        ajaxParamsObj.url += '?opt_jsonp=' + callbackRender;
        ajaxParamsDocs.url += '?opt_jsonp=renderDocuments';
        $.extend(ajaxParamsObj, {dataType: 'JSONP', jsonpCallback: callbackRender});
        $.extend(ajaxParamsDocs, {dataType: 'JSONP', jsonpCallback: 'renderDocuments'});
    }

    var promiseGetData = $.ajax(ajaxParamsObj);
    var promiseGetDocuments = $.ajax(ajaxParamsDocs);

    var loadTemplate = function (objectData) {

        placeholderEl.load('crypto_template/sign.html');
        if (!useJsonp)
            window[callbackRender](objectData);
    };

    var callbackSuccess = function (res1, res2) {
        var objectData = res1[0];
        localData.obj = objectData.data;
        var documentsData = res2[0];
        var isSignPresent = false;
        // try find document with signature
        for (var i = 0; i < documentsData.data.length; i++) {
            var file = documentsData.data[i];
            if (file.format === "application/pkcs7-signature" && file.title === "sign.p7s") {
                isSignPresent = true;
                $.ajax({url: file.url}).done(function (data) {
                    localData.sign = data;
                    loadTemplate(objectData);
                });
            }
        }
        if (!isSignPresent) loadTemplate(objectData);
    };
    var callbackFailure = function (data, statusText, jqXHR) {
        errorBlock.append(String.format(resources$ua.getFromApiError, data, statusText));
        placeholderEl.append(errorBlock);
    }

    $.when(promiseGetData, promiseGetDocuments).then(callbackSuccess, callbackFailure);
}

// temporary callback function for jsonp documents list callback
function renderDocuments(data) {
}

// localization
var resources$ua = {
    getFromApiError: "Помилка отримання данних за адресою <a href='{0}'>{0}</a>, опис помилки: {1}"
}

// utils
if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined'
                ? args[number]
                : match
                ;
        });
    };
}

// prepare object for sign
function prepareObject(json_object) {
    var fields = ['documents', 'items', 'lots', 'features', 'enquiryPeriod', 'tenderPeriod',
        'procuringEntity', 'title', 'title_en', 'title_ru', 'description', 'description_ru',
        'description_en', 'value', 'minimalStep', 'procurementMethod', 'procurementMethodType',
        'id', 'tenderID'];
    var result = {};
    for (var i = 0; i < fields.length; i++) {
        if (json_object[fields[i]] !== undefined) result[fields[i]] = json_object[fields[i]];
    }
    // delete documents with signature
    if (json_object.documents) {
        for (var index = json_object.documents.length - 1; index >= 0; index--) {
            var document = json_object.documents[index];
            if (document.title === 'sign.p7s' && document.format === "application/pkcs7-signature") {
                result.documents.splice(index, 1);
            }
        }
        if (!result.documents.length) delete result['documents'];
    }
    if (result.lots && result.lots.length) {
        for (var i = 0; i < result.lots.length; i++) {
            if (result.lots[i].auctionPeriod) delete result.lots[i]['auctionPeriod'];
            if (result.lots[i].auctionUrl) delete result.lots[i]['auctionUrl'];
        }
    }
    return JSON.stringify(result);
}