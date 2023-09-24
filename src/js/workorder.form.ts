import "jsbridge"

var formContext: MobileCRM.UI.EntityForm;

export function initialize () {

    MobileCRM.UI.EntityForm.requestObject((c) => {
        formContext = c;
        registerGlobalEvents();
        return true;
    }, (e) => {
        if(e) { MobileCRM.bridge.alert (e)}
    }, null);

    var registerGlobalEvents = (function () {
          MobileCRM.bridge.onGlobalEvent(
            "RequestOpenReport",
            openReport,
            true
          );
    });

     var openReport = (function(args:any) {
        if (args && args.reportId) {
            MobileCRM.UI.FormManager.showEditDialog(
              "annotation",
              args.reportId,
              undefined,
              null
            );
          }
    });
}