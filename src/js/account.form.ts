import "jsbridge"
import  resco  from "../js/resco.fluent"

var formContext: MobileCRM.UI.EntityForm;

export function initialize () {
    enum AccountCategoryCode {
        None = -1,
        PreferredCustomer = 1,
        Standard = 2
    }

    MobileCRM.UI.EntityForm.requestObject((c) => {
        formContext = c;
        initializeDisplayRules();
        initializeRequireRules();
        initalizeValidateRules();
        return true;
    }, (e) => {
        if(e) { MobileCRM.bridge.alert (e)}
    }, null);

    var initalizeValidateRules = (function () {
        resco.validateRule(formContext)
            .for('emailaddress1')
            .withMessage('Email is not valid!')
            .triggeredBy(['emailaddress1'])
            .needs(['emailaddress1'])
            .returns((email:string) => {
                return (email.indexOf('@') != -1)
            })
            .onchange();
    });

    var initializeRequireRules = (function () {

        resco.requireRule(formContext)
            .for('industrycode')
            .triggeredBy(['accountcategorycode'])
            .needs(['accountcategorycode'])
            .returns((code: any) => {
                return code == AccountCategoryCode.Standard;
            })
            .onload()
            .onchange();
        
    });

    var initializeDisplayRules = (function () {
        resco.displayRule(formContext)
            .for('industrycode')
            .triggeredBy(['accountcategorycode'])
            .needs(['accountcategorycode'])
            .returns((code: any) => {
                return code == AccountCategoryCode.Standard;
            })
            .onload()
            .onchange();
    });
}