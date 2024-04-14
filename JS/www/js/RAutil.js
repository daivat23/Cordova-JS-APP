function doValidate_frmModify() {
    const form2 = $("#frmModify");
    form2.validate({
        rules: {
            frmModifytxtBusinessName: {
                required: true,
                rangelength: [2, 30]
            },
            frmModifytxtReviewerEmail: {
                required: true,
                emailcheck: true
            },
            frmModifytxtReviewDate: {
                required: true,
            },
            frmModifytxtFoodQuality: {
                required: true,
                min: 0,
                max: 5
            },
            frmModifytxtService: {
                required: true,
                min: 0,
                max: 5
            },
            frmModifytxtValue: {
                required: true,
                min: 0,
                max: 5
            },
        },
        messages: {
            fmrModifytxtBusinessName: {
                required: "Name is required",
                rangelength: "Name must be at least 2-20 chars long"
            },
            fmrModifytxtModifyReviewerEmail: {
                required: "You must enter email address",
                emailcheck: "Entered email is invalid"
            },
            fmrModifytxtModifyReviewDate: {
                required: "Date is required",
            },
            fmrModifytxtModifyFoodQuality: {
                required: "Value must be 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            fmrModifytxtModifyService: {
                required: "Value must be 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            fmrModifytxtModifyValue: {
                required: "Value must be 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            }
        }
    });
    return form2.valid();
}

function doValidate_frmAdd() {
    const form = $("#frmAdd");
    form.validate({
        rules: {
            frmAddtxtBussiness: {
                required: true,
                rangelength: [2,30]
            },
            frmAddtxtReviewer: {
                required: true,
                emailcheck: true
            },
            frmAddtxtReviewDate:{
                required: true,
            },
            frmAddtxtFoodQuality:{
                required:true,
                min:0,
                max:5
            },
            frmAddtxtService:{
                required:true,
                min:0,
                max:5
            },
            frmAddtxtValue:{
                required:true,
                min:0,
                max:5
            },
        },
        messages: {
            frmAddtxtBussiness: {
                required: "Name is required",
                rangelength: "Name must be at least 2-20 chars long"
            },
            frmAddtxtReviewer: {
                required: "You must enter email address",
                emailcheck: "Entered email is invalid"
            },
            frmAddtxtReviewDate: {
                required: "Date is required",
            },
            frmAddtxtFoodQuality: {
                required: "Value must be 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            frmAddtxtService: {
                required: "Value must be 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
            frmAddtxtValue: {
                required: "Value must be 0-5",
                min: "Value must be 0-5",
                max: "Value must be 0-5"
            },
        }
    });
    return form.valid();
}

jQuery.validator.addMethod("emailcheck",
        function(value, element)
    {
        var regexp = /^.+gmail.(?:com|org|net)|.+yahoo.(?:com|org|net)|.+outlook.(?:com|org|net)|$/
        return this.optional(element) || regexp.test(value);
    },
    "You must enter a valid email");


function calculation() {
    let quality = parseInt(document.getElementById("frmAddtxtFoodQuality").value);
    let service = parseInt(document.getElementById("frmAddtxtService").value);
    let value = parseInt(document.getElementById("frmAddtxtValue").value);
    let overallRating = (quality + service + value) * 100 / 15;
    let overallRatingDisplay = document.getElementById("frmAddtxtOverallRating");
    overallRatingDisplay.value = overallRating.toFixed(0) + "%";
}
function Modifycalculation() {
    let Modifyquality = parseInt(document.getElementById("frmModifytxtFoodQuality").value);
    let Modifyservice = parseInt(document.getElementById("frmModifytxtService").value);
    let Modifyvalue = parseInt(document.getElementById("frmModifytxtValue").value);
    let ModifyoverallRating = (Modifyquality + Modifyservice + Modifyvalue) * 100 / 15;
    let ModifyoverallRatingDisplay = document.getElementById("frmModifytxtOverallRating");
    ModifyoverallRatingDisplay.value = ModifyoverallRating.toFixed(0) + "%";
}

function LocalStorage() {
    var defaultReviewerEmail = document.getElementById("frmSettingtxtReviewerEmailSettings").value;
    localStorage.setItem("DefaultEmail", defaultReviewerEmail);
    alert("Default reviewer email saved.");
}