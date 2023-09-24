import "jsbridge"
import  resco  from "../js/resco.fluent"
import "account.entity"

var formContext: MobileCRM.UI.EntityForm;

export function initialize () {
    MobileCRM.UI.EntityForm.requestObject((c) => {
        formContext = c;
        initializeDisplayRules();
        initalizeValidateRules();
        initializeRequireRules();
        return true;
    }, (e) => {
        if(e) { MobileCRM.bridge.alert (e)}
    }, null);

    var validateEmail = (email: string) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
      };

    var initalizeValidateRules = (function () {
        resco.validateRule(formContext)
            .for('emailaddress1')
            .withMessage('Email is not valid!')
            .triggeredBy(['emailaddress1'])
            .needs(['emailaddress1'])
            .returns((email:string) => {
                return (email == undefined || validateEmail(email));
            })
            .onchange()
            .onload();
    });

    var initializeRequireRules = (function () {

        resco.requireRule(formContext)
            .for('emailaddress1')
            .triggeredBy(['emailaddress1','telephone1'])
            .needs(['telephone1'])
            .returns((phone: any) => {
                return phone == undefined;
            })
            .onchange()
            .onload();

        resco.requireRule(formContext)
            .for('telephone1')
            .triggeredBy(['emailaddress1','telephone1'])
            .needs(['emailaddress1'])
            .returns((email: any) => {
                return email == undefined;
            })
            .onchange()
            .onload(); 
    });

    var initializeDisplayRules = (function () {
        resco.displayRule(formContext)
            .for(Account.Fields.IndustryCode)
            .triggeredBy([Account.Fields.AccountCategoryCode])
            .needs([Account.Fields.AccountCategoryCode])
            .returns((code: any) => {
                return code == Account.AccountCategoryCode.Standard;
            })
            .onchange()
            .onload();
    });
}