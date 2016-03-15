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
    userJsonDiffHtml : true
}

$(function () {
    /* {string} custom html for render */
    //options.customHtmlTemplate = $('#htmlTemplate').text();
});

/**
 * Callback function, before init crypto libs, for redefine gui elements
 */
function beforeInit(obj) {
    //console.log('beforeInit', arguments);
    // override proxy
    //URL_XML_HTTP_PROXY_SERVICE = "https://vpn.unity-bars.com.ua/proxy/ProxyHandler.ashx";

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
    //console.log('renderJson', data);
}

/**
 * Callback function, after sign verification
 * @param {object} signData - json object from signature
 * @param {object} currData - json object from database
 * @param {object} diff     - difference, json object (undefined if equal), see https://github.com/benjamine/jsondiffpatch
 */
function checkSign(signData, currData, diff, obj) {
    //console.log('externalcheckSign', diff);
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
    setKeyStatus('Підпису успішно накладено та передано у ЦБД', 'success');
    // if error
    // setKeyStatus('Помилка при передачі підпису до ЦБД', 'error');
}


// demo calls
function demo1() {
    options.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/b64001cdaa1540e7a17c14d0207e3feb";
    opSign.init(options);
}
function demo2() {
    options.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/33681f0176574ea498fe2763dae9c124";
    opSign.init(options);
}
function demo3() {
    options.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/9835f4f342f04b22aaaf2c40f25cfe80";
    opSign.init(options);
}

function demo4() {
    options.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.12/tenders/fae0de97deab4b289f0b53bb64e8e09b";
    opSign.init(options);
}