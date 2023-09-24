declare global {
    interface Window { resco: FormHandler; }
}

window.resco = window.resco || {};


enum LogLevel {
    Information = 1,
    Warning = 2,
    Error = 3
}

class Logger {
    log(msg: string, logLevel: LogLevel) {
        if (window.console) {
            switch (logLevel) {
                case 1:
                    window.console.info(msg);
                    break;
                case 2:
                    window.console.warn(msg);
                    break;
                case 3:
                    window.console.error(msg);
                    break;
                default:
                    window.console.log(msg);
                    break;
            }
        }
    }
}

export class FormHandler {
    rules: any[];
    logger: Logger = new Logger();

    constructor() {
        this.rules = [];
    }

    requireRule (formContext: MobileCRM.UI.EntityForm) {
        var rule = new RequireRule(formContext);
        this.rules.push(rule);
        return rule;
    }

    displayRule (formContext: MobileCRM.UI.EntityForm) {
        var rule = new DisplayRule(formContext);
        this.rules.push(rule);
        return rule;
    }

    enableRule (formContext: MobileCRM.UI.EntityForm) {
        var rule = new EnableRule(formContext);
        this.rules.push(rule);
        return rule;
    }

    validateRule (formContext: MobileCRM.UI.EntityForm) {
        var rule = new ValidateRule(formContext);
        this.rules.push(rule);
        return rule;
    }
}
var resco = new FormHandler();
export default resco;

abstract class RuleBase {
    fieldName: string;
    fields: string[];
    values: any[];
    triggers: string[];
    formContext: MobileCRM.UI.EntityForm;
    func: Function | undefined;
    isonload: boolean;
    logger: Logger;

    constructor(formContext: MobileCRM.UI.EntityForm) {
        this.fieldName = "";
        this.fields = [];
        this.values = [];
        this.triggers = [];
        this.formContext = formContext;
        this.isonload = false;
        this.logger = new Logger();
    }
    for(fieldName: string) {
        this.fieldName = fieldName;
        return this;
    }
    needs(fields: string[]) {
        this.fields = fields;
        return this;
    }
    triggeredBy(triggers: string[]) {
        this.triggers = triggers;
        return this;
    }
    returns(func: Function) {
        /// <summary>
        /// A function that returns the result of the <func/>.
        /// </summary>
        /// <param name="func">The function that will be called on change of the trigger.</param>
        /// <returns type="Context">Returns the context of the function.</returns>
        this.func = func;
        return this;
      };

    extractValues (entityForm: MobileCRM.UI.EntityForm): any[] {
        var result:any[] = [];
        this.fields.forEach(field => {

            if (field in entityForm.entity.properties) {
                /* entity contains the element we're looking for */
                result.push(entityForm.entity.properties[field]);
            }
        });
        return result;
    }

    onload(): this {
        this.run(this.formContext, false);
        return this;
    }

    onchange() {
        MobileCRM.UI.EntityForm.onChange(
            (entityForm) => {
                this.run(entityForm, true);
                return true;
            },
            true,
            null
        );
        return this;
    }

    abstract run (formContext: MobileCRM.UI.EntityForm, isonchange: boolean): any;
}

export class RequireRule extends RuleBase{
    run(formContext: MobileCRM.UI.EntityForm, isonchange: boolean) {
        this.triggers.forEach(field => {
            if(formContext) {
                if(isonchange == true)
                {
                    var context = formContext.context as MobileCRM.UI.IFormChangeContext;
                    if(field == context.changedItem)
                    {
                        this.logic(formContext);
                    }
                } else {
                    this.logic (formContext);
                }
            }
        });
    }

    private logic (formContext: MobileCRM.UI.EntityForm) {
        var detailView = formContext.getDetailView("General");
        var item = detailView.getItemByName(this.fieldName);
        if(this.func && item)
        {
            if(this.func.apply(null, this.extractValues(formContext)))
            {
                item.validate = true;
            } else {
                item.validate = false;
            }
        }
    }
}

export class DisplayRule extends RuleBase{
    run(formContext: MobileCRM.UI.EntityForm, isonchange: boolean) {
        this.triggers.forEach(field => {
            if(formContext) {
                if(isonchange == true)
                {
                    var context = formContext.context as MobileCRM.UI.IFormChangeContext;
                    if(field == context.changedItem)
                    {
                        this.logic(formContext);
                    }
                } else {
                    this.logic (formContext);
                }
            }
        });
    }

    private logic (formContext: MobileCRM.UI.EntityForm) {
        var detailView = formContext.getDetailView("General");
        var item = detailView.getItemByName(this.fieldName);
        if(this.func && item)
        {
            if(this.func.apply(null, this.extractValues(formContext)))
            {
                item.isVisible = true;
            } else {
                item.isVisible = false;
            }
        }
    }
}

export class EnableRule extends RuleBase{
    run(formContext: MobileCRM.UI.EntityForm, isonchange: boolean) {
        this.triggers.forEach(field => {
            if(formContext) {
                if(isonchange == true)
                {
                    var context = formContext.context as MobileCRM.UI.IFormChangeContext;
                    if(field == context.changedItem)
                    {
                        this.logic(formContext);
                    }
                } else {
                    this.logic (formContext);
                }
            }
        });
    }

    private logic (formContext: MobileCRM.UI.EntityForm) {
        var detailView = formContext.getDetailView("General");
        var item = detailView.getItemByName(this.fieldName);
        if(this.func && item)
        {
            if(this.func.apply(null, this.extractValues(formContext)))
            {
                item.isEnabled = true;
            } else {
                item.isEnabled = false;
            }
        }
    }
}

export class ValidateRule extends RuleBase {
    message!: string;

    withMessage(str:string) {
        this.message = str;
        return this;
    }

    run(formContext: MobileCRM.UI.EntityForm, isonchange: boolean) {
        if(this.message == "" || this.message == null) {
            this.logger.log("Message not defined in ValidateRule!", LogLevel.Error)
            return;
        }

        var detailView = formContext.getDetailView("General");
        var item = detailView.getItemByName(this.fieldName);
        if(this.func && item)
        {
            if(this.func.apply(null, this.extractValues(formContext)))
            {
                item.errorMessage = "";
                this.logger.log(`Field ${this.fieldName} is valid.`, LogLevel.Information);
            } else {
                item.errorMessage = this.message;
                this.logger.log(`Field ${this.fieldName} is invalid.`, LogLevel.Warning);
            }
        }
    }
}
