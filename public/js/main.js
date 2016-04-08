var options = {
    /* {url} full address of object in API */
    apiResourceUrl: "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/b64001cdaa1540e7a17c14d0207e3feb",
    /* {string} element id (jquery) to render html */
    placeholderId: "#signPlaceholder",
    /* {boolean} verify signature on start, if exist */
    verifySignOnInit: true,
    /* {boolean} if verification error, allow sign whatever */
    ignoreVerifyError: false,
    /* callback obtaining json from API  */
    callbackRender: "renderJson",
    /* callback after put sign */
    callbackPostSign: "postSign",
    /* callback after init all libs */
    callbackOnInit: "onInit",
    /* callback before init all libs */
    callbackBeforeInit: "beforeInit",
    /* callback after verify signature */
    callbackCheckSign: "checkSign",
    /* using jsondiffpatch-formatters for render difference */
    userJsonDiffHtml: true,
    /* custom ajaxOptions options */
    ajaxOptions: {'global': false},
    /* use JSONP for call API method (if CORS not available)  */
    useJsonp: false,
    /* only verify signature, without render template */
    verifyOnly: false,
    /* list of fields, witch will be ignored during verify */
    //ignoreFields : //['documents']
    /* disable loading data from apiResourceUrl on start */
    disableLoadObj: false,
    /* disable loading signature file from apiResourceUrl on start, only if disableLoadObj = false */
    disableLoadSign: false
}

$(function () {
    $('#cbOnlyVerify').change(function (e) {
        $('#signPlaceholder').html('');
        options.verifyOnly = $(this).is(':checked');
    });
    console.log("opSign.version = " + opSign.version);
    /*$(document).bind("ajaxSend", function(arg1, arg2, ajax){
     console.log('ajaxSend', ajax);
     }).bind("ajaxComplete", function(){
     console.log('ajaxComplete1');
     });*/
    /* {string} custom html for render */
    //options.customHtmlTemplate = $('#htmlTemplate').text();
    // test work CORS from page
    // $.ajax({url:'https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/b64001cdaa1540e7a17c14d0207e3feb'}).done(function(data){ console.log(data); });
});

/**
 * Callback function, before init crypto libs, for redefine gui elements
 */
function beforeInit(obj) {
    //console.log('beforeInit', arguments);
    // override proxy
    //URL_XML_HTTP_PROXY_SERVICE = "https://vpn.unity-bars.com.ua:40103/proxy/ProxyHandler.ashx";
    //URL_XML_HTTP_PROXY_SERVICE = "http://192.168.147.145:8080/ProxyHandler.php";
    //URL_XML_HTTP_PROXY_SERVICE = "http://52.34.154.100/ProxyHandler.php";
    //URL_XML_HTTP_PROXY_SERVICE = "http://52.32.168.53/proxy.php";
    //URL_XML_HTTP_PROXY_SERVICE = "https://prozorro.gov.ua/PH/ProxyHandler.php";

    // if using custom html template - can redefine elements id
    //obj.uiSignPanel = document.getElementById('signPanel'); // панель наложения подписи
    //obj.uiCheckPanel = document.getElementById('checkPanel'); // панель верификации подписи
    //obj.uiVerifyBtn = document.getElementById('VerifyDataButton'); // кнопка проверки подписи
    //obj.uiSignBtn = document.getElementById('SignDataButton'); // кнопка наложения подписи
    //obj.uiPkSelectBtn = document.getElementById('PKeySelectFileButton'); // кнопка выбора файла ключа
    //obj.uiPkFileName = document.getElementById('PKeyFileName'); // поле с файлом ключа
    //obj.uiPkCertsDiv = document.getElementById('PKCertsSelectZone'); // блок с загрузкой личных сертификатов
    //obj.uiCaServersSelect = document.getElementById('CAsServersSelect'); // dropdown со списком ЦСК
    //obj.uiPkStatusInfo = document.getElementById('PKStatusInfo'); // span для сообщений о процессе работы с ключем
    //obj.uiPkPassword = document.getElementById('PKeyPassword'); // поле пароля для ключа
    //obj.uiPkReadBtn = document.getElementById('PKeyReadButton'); // кнопка чтения ключа
    //obj.uiPkFileInput = document.getElementById('PKeyFileInput'); // input(type=file) для загрузки ключа
    //obj.uiCertInfo = document.getElementById('certInfo'); // блок с информацией о сертификате
    //obj.uiVerifyCertInfo = document.getElementById('certInfo'); // блок с информацией о сертификате при проверке подписи
    //obj.uiVerifyErrorInfo = document.getElementById('verificationError'); // блок с информацией о неверной подписи
    //obj.uiVerifyDiffInfo = document.getElementById('verificationErrorDiff'); // блок с информацией о различиях данных
    //obj.uiVerifySuccessInfo = document.getElementById('verificationSuccess'); // блок с информацией о успешной проверке подписи
    //obj.uiCertFileInput = document.getElementById('ChoosePKCertsInput');// input(type=file) для загрузки сертификата
    //obj.uiCertList = document.getElementById('SelectedPKCertsList'); // output для отображения загруженого сертификата
}

/**
 * Callback function, after init crypto libs
 */
function onInit(obj) {

    //console.log('externalInit', arguments);
}


/**
 * Callback function, after obtaining json from API
 * @param {object} data - json object
 */
function renderJson(data) {
    console.log('renderJson', data);
}

/**
 * Callback function, after sign verification
 * @param {object} signData  - json object from signature
 * @param {object} currData  - json object from database
 * @param {object} diff      - difference, json object (undefined if equal), see https://github.com/benjamine/jsondiffpatch
 * @param {object} ownerInfo - certificate info
 * @param {object} timeInfo  - timestamp info
 * @param {object} obj       - reference to main lib
 */
function checkSign(signData, currData, diff, ownerInfo, timeInfo, obj) {
    console.log('signData = %O', JSON.parse(signData));
    console.log('currData = %O', JSON.parse(currData));
    console.log('diff = %O', diff);
    if (!signData) {
        $('#signPlaceholder').html('Підпис відсутній');
        return;
    }
    var certInfo = "Підписувач:  <b>" + ownerInfo.GetSubjCN() + "</b><br/>" +
        "ЦСК:  <b>" + ownerInfo.GetIssuerCN() + "</b><br/>" +
        "Серійний номер:  <b>" + ownerInfo.GetSerial() + "</b><br/>";

    var timeMark;
    if (timeInfo.IsTimeAvail()) {
        timeMark = (timeInfo.IsTimeStamp() ?
                "Мітка часу: <b>" : "Час підпису: <b>") + timeInfo.GetTime().toISOString() + "</b>";
    } else {
        timeMark = "Час підпису відсутній";
    }
    // for demo only
    if (options.verifyOnly) {
        var diffInfo = '<b>Підпис вірний</b><br/>';
        if (diff) {
            diffInfo = '<b>Підпис не вірний</b>, відмінності :' + JSON.stringify(diff) + ' <br/>';
        }
        $('#signPlaceholder').html(diffInfo + certInfo + timeMark);
    }
    // if userJsonDiffHtml : false, use obj.showDiffError
    //if(diff)
    //    obj.showDiffError('custom error message');
}

/**
 * Callback function, post sign to server
 * @param {string} signature - base64 string with CMS signature
 */
function postSign(signature) {
    //console.log('sendSign', signature);
    // todo post to server with sign
    // if  success
    setKeyStatus('Підпис успішно накладено та передано у ЦБД', 'success');
    // if error
    // setKeyStatus('Помилка при передачі підпису до ЦБД', 'error');
}

function demo(url) {
    $('#signPlaceholder').html('');
    options.apiResourceUrl = url;
    opSign.init(options);
}

// demo calls
function demo1() {
    demo("https://lb.api-sandbox.openprocurement.org/api/2.2/tenders/3ba0bbc3395b43aaa45cce88e44f2325");
}
function demo2() {
    demo("https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/33681f0176574ea498fe2763dae9c124");
}
function demo3() {
    demo("https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/9835f4f342f04b22aaaf2c40f25cfe80");
}
function demo4() {
    demo("https://lb.api-sandbox.openprocurement.org/api/0.12/tenders/fae0de97deab4b289f0b53bb64e8e09b");
}
function demo5() {
    demo("https://lb.api-sandbox.openprocurement.org/api/2.1/plans/8d80e519291c4b74930da8f8808489d7");
}

function demo6() {
    demo("https://lb.api-sandbox.openprocurement.org/api/2.1/plans/51250d165c3e4baba4f6aed801b5a8a7");
}

function demo7() {
    demo("https://public.api.openprocurement.org/api/2.2/tenders/3ada5c7f0ef94b07b45be08946d081e5");
}
function demo8() {
    demo("https://lb.api-sandbox.openprocurement.org/api/2.2/plans/58cd699c303b4c549e4790733ab9c735");
}

function verify() {
    demo(document.getElementById('tbApiResourceUrl').value);
}
