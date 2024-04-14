function frmAddbtnSave_click(){
    testValidationfrmAdd();
}

function frmModifybtnSave_click(){
    testValidationfrmModify();
}

function frmModifybtn_click(){
    console.log("hiiii");
    generateBusinessList();
}
function init(){
    $("#frmAddbtnSave").on("click", frmAddbtnSave_click);
    $("#frmModifybtnSave").on("click", frmModifybtnSave_click);
    $("#RAModifyPage").on("click", frmModifybtn_click);
    $("#frmAddtxtFoodQuality,#frmAddtxtService,#frmAddtxtValue").on("input",calculation);
    $("#frmModifytxtFoodQuality,#frmModifytxtService,#frmModifytxtValue").on("input",Modifycalculation);
    $("#frmAddtxtOverallRating").click();
    $("#frmModifytxtOverallRating").click();
    $("#frmSettingbtnSaveDefaults").on("click",LocalStorage);
}

$(document).ready(function () {
    init();
    $("#frmAddrating").click(function () {
        $("#frmAddRatings").toggle();
        calculation();
    });
    $("#frmModifyrating").click(function () {
        $("#frmModifyRatings").toggle();
        Modifycalculation();
    });
});

