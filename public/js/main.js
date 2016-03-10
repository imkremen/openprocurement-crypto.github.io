var obj = {
    apiResourceUrl : "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/b64001cdaa1540e7a17c14d0207e3feb",
    placeholderId : "#signPlaceholder",
    callbackRender : "renderJson",
    callbackPostSign : "postSign"
}

$(function(){
    //initCryptoTemplate(obj);
});

function demo1()
{
    obj.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/b64001cdaa1540e7a17c14d0207e3feb";
    initCryptoTemplate(obj);
}
function demo2()
{
    obj.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/33681f0176574ea498fe2763dae9c124";
    initCryptoTemplate(obj);
}
function demo3()
{
    obj.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.11/tenders/9835f4f342f04b22aaaf2c40f25cfe80";
    initCryptoTemplate(obj);
}

function demo4()
{
    obj.apiResourceUrl = "https://lb.api-sandbox.openprocurement.org/api/0.12/tenders/fae0de97deab4b289f0b53bb64e8e09b";
    initCryptoTemplate(obj);
}

// optional, render html
function renderJson(data){
    console.log('renderJson', data);
}

function postSign(signature) {
    console.log('sendSign', signature);
    // do post to server with sign
    // after success
    setKeyStatus('Підпису успішно накладено та передано у ЦБД', 'success');
    // if error
    // setKeyStatus('Помилка при передачі підпису до ЦБД', 'error');
}