import "jsbridge"

var formContext: MobileCRM.UI.HomeForm;

export function initialize () {

    MobileCRM.UI.HomeForm.requestObject((c) => {
        formContext = c;
        registerGlobalEvents();
        return true;
    }, (e) => {
        if(e) { MobileCRM.bridge.alert (e)}
    }, null);

    var registerGlobalEvents = (function () {
        MobileCRM.bridge.onGlobalEvent(
            "EntityFormClosed",
            cleanPreviewData,
            true
          );
    });

    var cleanPreviewData = ((closedEntityForm: MobileCRM.UI.EntityForm) => {
        if (
            closedEntityForm &&
            closedEntityForm.entity &&
            !closedEntityForm.entity.isNew &&
            closedEntityForm.entity.entityName == "demo_servicereport"
          ) {
            getPreviewData(closedEntityForm.entity)
            .then((data: MobileCRM.DynamicEntity[]) => {
              var deletes = data.map(removeAnnotation.bind(this));
              return Promise.all(deletes).then(function () {
                MobileCRM.DynamicEntity.deleteById(
                  "demo_servicereport",
                  closedEntityForm.entity.id,
                  function () {},
                  function (error) {
                    MobileCRM.bridge.alert("An error occurred: " + error);
                  }
                );
              });
            },
            MobileCRM.bridge.alert);
          }
    });

    var getPreviewData = (function(entity: MobileCRM.DynamicEntity): Promise<MobileCRM.DynamicEntity[]> {
        return new Promise(function (resolve, reject) {
            var filter1 = new MobileCRM.FetchXml.Filter();
            filter1.where("objectid", "eq", entity.id);
      
            var fetchEntity = new MobileCRM.FetchXml.Entity("annotation");
            fetchEntity.addAttributes();
            fetchEntity.filter = new MobileCRM.FetchXml.Filter();
            fetchEntity.filter.filters.push(filter1);
      
            var fetch = new MobileCRM.FetchXml.Fetch(fetchEntity);
            fetch.execute(
              "DynamicEntities",
              resolve,
              reject,
              null
            );
          });
    });

    var removeAnnotation = (function(annotation: MobileCRM.DynamicEntity): Promise<void> {
        return new Promise((resolve, reject) => {
            MobileCRM.DynamicEntity.deleteById(
              annotation.entityName,
              annotation.id,
              resolve,
              reject
            );
          });
    });
}