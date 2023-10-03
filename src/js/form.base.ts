import "jsbridge"

export abstract class formBase {
    formContext!: MobileCRM.UI.EntityForm;

    initializeBase() {
        MobileCRM.UI.EntityForm.requestObject((c) => {
            this.formContext = c;
            return true;
        }, (e) => {
            if(e) { MobileCRM.bridge.alert (e)}
        }, null);
    }

    abstract initializeDisplayRules() : void;
    abstract initalizeValidateRules() : void;
    abstract initializeRequireRules() : void;
}