declare global {
    interface Window { resco: any; }
}

window.resco = window.resco || {};
var resco = window.resco || {};

resco.forms = (function(forms) {

    var requireRules: RequireRule[] = [];

    return forms;
}(resco.forms || {}));

class RuleBase {
    rule: {};
    fieldName: string;
    fields: string[];
    values: any[];
    triggers: string[];
    formContext: MobileCRM.UI.Form;
    func: Function | undefined;

    constructor(formContext: MobileCRM.UI.Form) {
        this.rule = {};
        this.fieldName = "";
        this.fields = [];
        this.values = [];
        this.triggers = [];
        this.formContext = formContext;
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
    returns (func: Function) {
        /// <summary>
        /// A function that returns the result of the <func/>.
        /// </summary>
        /// <param name="func">The function that will be called on change of the trigger.</param>
        /// <returns type="Context">Returns the context of the function.</returns>
        this.func = func;
        return this;
      };
}

export class RequireRule extends RuleBase{
    apply() {
        MobileCRM.UI.EntityForm.onChange(
            (entityForm) => {
                // First check whether the change handler is called due to desired item change
                this.triggers.forEach(field => {
                    var context = entityForm.context as MobileCRM.UI.IFormChangeContext;
                    if(field == context.changedItem)
                    {
                        var detailView = entityForm.getDetailView("General");
                        var item = detailView.getItemByName(this.fieldName);
                        if(this.func && item)
                        {
                            if(this.func.apply(null, this.extractValues(entityForm)))
                            {
                                item.validate = true;
                            } else {
                                item.validate = false;
                            }
                        }
                    }
                });
                return true;
            },
            true,
            null
        );
    }

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
}