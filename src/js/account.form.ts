import "jsbridge"
import { RequireRule } from "../js/resco.fluent"
//import { common } from "../js/common"

var resco = window.resco || {};
var formContext: MobileCRM.UI.Form;

export function initialize () {
    MobileCRM.UI.Form.requestObject((c) => {
        formContext = c;

        initializeDisplayRules();
    });

    var initializeDisplayRules = (function () {
        resco.forms.displayRules

        var displayRule1 = new RequireRule(formContext)
            .for('emailaddress1')
            .triggeredBy(['emailaddress1', 'telephone1'])
            .needs(['emailaddress1', 'telephone1'])
            .returns((emailaddress: any, telephone: any) => {
                return telephone == undefined;
            }).apply();
/*
        var displayRule2 = new RequireRule(formContext)
            .for('telephone1')
            .triggeredBy(['emailaddress1', 'telephone1'])
            .needs(['emailaddress1', 'telephone1'])
            .returns((emailaddress: any, telephone: any) => {
                return emailaddress == undefined;
            }).apply();
*/
    });
}