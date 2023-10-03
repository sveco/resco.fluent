import "jsbridge"

export class workorderform {
  initialize () {
    this.registerGlobalEvents();
  }

  registerGlobalEvents(): void  {
    MobileCRM.bridge.onGlobalEvent(
      "RequestOpenReport",
      this.openReport,
      true
    );
  };

  openReport(args:any): void {
    if (args && args.reportId) {
        MobileCRM.UI.FormManager.showEditDialog(
          "annotation",
          args.reportId,
          undefined,
          null
        );
      }
  };
}
