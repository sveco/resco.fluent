import "jsbridge"
import { formBase } from "./form.base";
import  resco  from "../js/resco.fluent"
import "account.entity"

export class accountform extends formBase {

    public initialize(): void {
        this.initializeBase();
        this.initializeDisplayRules();
        this.initalizeValidateRules();
        this.initializeRequireRules();
    }

    initializeDisplayRules(): void {
        resco.displayRule(this.formContext)
        .for(Account.Fields.IndustryCode)
        .triggeredBy([Account.Fields.AccountCategoryCode])
        .needs([Account.Fields.AccountCategoryCode])
        .returns((code: any) => {
            return code == Account.AccountCategoryCode.Standard;
        })
        .onchange()
        .onload();
    }

    initalizeValidateRules(): void {
        var validateEmail = (email: string) => {
            return email.match(
              /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
          };

        resco.validateRule(this.formContext)
        .for('emailaddress1')
        .withMessage('Email is not valid!')
        .triggeredBy(['emailaddress1'])
        .needs(['emailaddress1'])
        .returns((email:string) => {
            return (email == undefined || validateEmail(email));
        })
        .onchange()
        .onload();
    }

    initializeRequireRules(): void {
        resco.requireRule(this.formContext)
        .for('emailaddress1')
        .triggeredBy(['emailaddress1','telephone1'])
        .needs(['telephone1'])
        .returns((phone: any) => {
            return phone == undefined;
        })
        .onchange()
        .onload();

    resco.requireRule(this.formContext)
        .for('telephone1')
        .triggeredBy(['emailaddress1','telephone1'])
        .needs(['emailaddress1'])
        .returns((email: any) => {
            return email == undefined;
        })
        .onchange()
        .onload(); 
    }
}