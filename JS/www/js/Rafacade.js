function testValidationfrmAdd() {
    if (doValidate_frmAdd()) {
        console.log("Add form is valid");
    }
    else {
        console.log("Add form is INVALID");
    }
}
function testValidationfrmModify() {
    if (doValidate_frmModify()) {
        console.log("Modify form is valid");
    }
    else {
        console.log("Modify form is INVALID");
    }
}

