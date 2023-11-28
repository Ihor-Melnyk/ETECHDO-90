function onCreate() {
  setInitiator();
}

function setInitiator() {
  var data = EdocsApi.getInExtAttributes(CurrentDocument.id.toString())?.attributeValues;
  if (data) {
    var initiatorLogin = EdocsApi.findElementByProperty("code", "InitiatorName", data)?.value;
    var initiatorId = EdocsApi.getEmployeeDataByEmployeeUserLogin(initiatorLogin)?.employeeId;
    if (initiatorId) EdocsApi.setAttributeValue({ code: "InitiatorName", value: initiatorId, text: null });
  }
}

function setSignatories() {
  var data = EdocsApi.getInExtAttributes(CurrentDocument.id.toString())?.attributeValues;
  if (data) {
    var EDRPOU = EdocsApi.findElementByProperty("code", "OrganizationEDRPOU", data)?.value;

    if (EDRPOU) {
      var response = EdocsApi.getDictionaryData("MembersСommissionsAct", "", [{ attributeCode: "Title", value: EDRPOU }]);

      if (response.length > 0) var id = EdocsApi.getDictionaryData("MembersСommissionsAct", EDRPOU)?.id;
      EdocsApi.getDictionaryItemData("MembersСommissionsAct", id);
    }
  }
}
