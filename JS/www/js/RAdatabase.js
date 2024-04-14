//++++++++++++++++++++++++++++++++++++++++++++++++++
// Setting The Instance For IndexDB 
//++++++++++++++++++++++++++++++++++++++++++++++++++
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB,
    IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;

// Assuming the IndexedDB setup has been done as per your previous message
document.addEventListener('DOMContentLoaded', function() {
    // Call the function to generate the list of business names
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    // DATA OBJECT
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Creating The DB 
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    const request = window.indexedDB.open("RAFeedbackDB", 1);
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    //Error On Creation Of The DB or Some Other Kind Of Error 
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    request.onerror = (error) => {
        console('"Why didnt you allow my web app to use IndexedDB?', error);
    };
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    //When you create a new database or increase the version number of an existing database.
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    request.onupgradeneeded = (event) => {
        // Save the IDBDatabase interface
        const db = event.target.result;
        // Create an objectStore for this database
        if (!db.objectStoreNames.contains('types')) {
        const objectStore = db.createObjectStore("types", { keyPath: "id" });
        objectStore.createIndex("nameIndex", "name", { unique: false });}
        console.log("created type objects");

        if (!db.objectStoreNames.contains('reviews')) {
            const objectStore = db.createObjectStore("reviews", { keyPath: "id",autoIncrement: true });
            objectStore.createIndex("businessNameIndex", "businessname", { unique: false });
            objectStore.createIndex("reviewerEmailIndex", "revieweremail", { unique: false });
            objectStore.createIndex("reviewerCommentsIndex", "reviewerComments", { unique: false });
            objectStore.createIndex("reviewDateIndex", "reviewdate", { unique: false });
            objectStore.createIndex("hasRatingIndex", "hasrating", { unique: false });
            objectStore.createIndex("rating1Index", "rating1", { unique: false });
            objectStore.createIndex("rating2Index", "rating2", { unique: false });
            objectStore.createIndex("rating3Index", "rating3", { unique: false });
            objectStore.createIndex("typeIdIndex", "typeId", { unique: false });
        }
    };
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    // DATA OBJECT
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    const typesData = [
        { id: 1, name: "Others"},
        { id: 2, name: "Canadian "},
        { id: 3, name: "Asian"},
        { id: 4, name: "European"},
        { id: 5, name: "Australian"},
    ];
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    //On Success
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++
    request.onsuccess = function(event) {
        db = event.target.result;
        const typeObjectStore = db.transaction("types", "readwrite").objectStore("types");
        typesData.forEach((type) => {
            //console.log(bike);
            typeObjectStore.add(type);
        });
        console.log('Review added to the database', event.target.result);
    };
    request.onerror = function(event) {
        console.error('Error adding review to the database', event.target.error);
    };
    // console.log(window.location.hash);
    // if (window.location.hash === "#RAModifyPage") {
    //     console.log("hii");
    //     // Call your function here
    //     generateBusinessList();
    // }
    generateBusinessList();
    const cancleButton = document.getElementById("frmModifybtnCancel");
    cancleButton.onclick = () => hideForm();

    const deleteButton = document.getElementById("frmModifybtnDelete");
    deleteButton.onclick = () => deleteCurrentBusiness(deleteButton.value);
    function deleteCurrentBusiness() {
        var businessName = document.getElementById('frmModifytxtBusinessName').value;
        if (confirm("Are you sure you want to delete this record?")) {
            deleteBusinessFromIndexedDB(businessName);
        }
    }

    function populateDropdown() {
        let request = indexedDB.open('RAFeedbackDB', 1);

        request.onsuccess = function(event) {
            let db = event.target.result;
            let transaction = db.transaction('types', 'readonly');
            let objectStore = transaction.objectStore('types');
            let dropdown = document.getElementById('frmAddDropType');

            // Clear existing options
            // dropdown.innerHTML = '';

            // Fetch data from the object store and populate the dropdown
            objectStore.openCursor().onsuccess = function(event) {
                let cursor = event.target.result;
                if (cursor) {
                    let option = document.createElement('option');
                    option.text = cursor.value.name;
                    option.value = cursor.value.id;
                    dropdown.appendChild(option);
                    cursor.continue();
                }
            };
            // dropdown.value = dropdown.options[dropdown.selectedIndex].text;
        };

        request.onerror = function(event) {
            console.error('Error opening database', event.target.error);
        };
    }
    document.getElementById('frmAddbtnSave').addEventListener('click', function() {
        let businessName = document.getElementById('frmAddtxtBussiness').value;
        let typeId = document.getElementById('frmAddDropType').value; // Assuming you'll map these to actual type IDs
        let reviewerEmail = document.getElementById('frmAddtxtReviewer').value;
        let reviewerComments = document.getElementById('frmAddtxtAreaReviewerComments').value;
        let reviewDate = document.getElementById('frmAddtxtReviewDate').value;
        let hasRating = document.getElementById('frmAddrating').checked;
        let rating1 = parseInt(document.getElementById('frmAddtxtFoodQuality').value, 10) || 0;
        let rating2 = parseInt(document.getElementById('frmAddtxtService').value, 10) || 0;
        let rating3 = parseInt(document.getElementById('frmAddtxtValue').value, 10) || 0;
        let overallRating = (rating1 + rating2 + rating3) / 3;

        // In a real application, you might want to use a more robust method for generating unique IDs
        // let reviewId = new Date().getTime();

        let review = [{
            // id: reviewId,
            businessname: businessName,
            typeId: typeId,
            revieweremail: reviewerEmail,
            reviewerComments: reviewerComments,
            reviewdate: reviewDate,
            hasrating: hasRating,
            rating1: rating1,
            rating2: rating2,
            rating3: rating3,
            overallRating: overallRating
        }];

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        //Creating The DB 
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        const request = window.indexedDB.open("RAFeedbackDB", 1);
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        //Error On Creation Of The DB or Some Other Kind Of Error 
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        request.onerror = (error) => {
            console('"Why didnt you allow my web app to use IndexedDB?', error);
        };
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        //When you create a new database or increase the version number of an existing database.
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++

        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        //On Success
        //+++++++++++++++++++++++++++++++++++++++++++++++++++++
        request.onsuccess = (event) => {
            //DB Instance
            db = event.target.result;
            //+++++++++++++++++++++++++++++++++++++
            //Create
            //+++++++++++++++++++++++++++++++++++++
            const transaction = db.transaction("reviews", "readwrite").objectStore("reviews");
            document.getElementById('frmAddtxtBussiness').value = '';
            document.getElementById('frmAddDropType').value = '';
            document.getElementById('frmAddtxtReviewer').value = '';
            document.getElementById('frmAddtxtAreaReviewerComments').value = '';
            document.getElementById('frmAddtxtReviewDate').value = '';
            document.getElementById('frmAddrating').checked = false;
            document.getElementById('frmAddtxtFoodQuality').value = '';
            document.getElementById('frmAddtxtService').value = '';
            document.getElementById('frmAddtxtValue').value = '';
            document.getElementById('frmAddtxtOverallRating').value = '';
            // let transaction = db.transaction(['reviews'], 'readwrite');
            // let objectStore = transaction.objectStore('reviews');
            // let request = objectStore.add(review);
            review.forEach((review) => {
                //console.log(bike);
                transaction.add(review);
            });
            request.onsuccess = function(event) {
                console.log('Review added to the database', event.target.result);
                generateBusinessList();
            };
            request.onerror = function(event) {
                console.error('Error adding review to the database', event.target.error);
            };
        };
        request.onerror = function(event) {
            console.error('Error opening database', event.target.error);
        };
    });
    populateDropdown();
    });

function displayData(review) {
    let section = document.getElementById('frmModify');
    const businessList = document.getElementById("businessList");
    businessList.style.display = "none";  // Hide the business list
    section.style.display = 'block';
    document.getElementById('frmModifytxtBusinessName').value = review.businessname;
    document.getElementById('frmModifyDropType').value = review.typeId.value;
    document.getElementById('frmModifytxtReviewerEmail').value = review.revieweremail;
    document.getElementById('frmModifytxtAreaReviewerComments').value = review.reviewerComments;
    document.getElementById('frmModifytxtReviewDate').value = review.reviewdate;
    document.getElementById('frmModifytxtFoodQuality').value = review.rating1;
    document.getElementById('frmModifytxtService').value = review.rating2;
    document.getElementById('frmModifytxtValue').value = review.rating3;
    document.getElementById('frmModifytxtOverallRating').value = review.overallRating;

    // Show or hide ratings section based on checkbox state
    document.getElementById('frmModifyRatings').style.display = review.hasrating ? 'block' : 'none';
    const updateButton = document.getElementById("frmModifybtnSave");
    updateButton.onclick = () => updateCurrentBusiness();
    function updateCurrentBusiness() {
        updateObject(review.id);
    }
}

function hideForm() {
    const businessList = document.getElementById("businessList");
    const form = document.getElementById("frmModify");

    // Hide the form and show the business list
    form.style.display = "none";
    businessList.style.display = "block";
}

// Function to generate HTML content for the list of business names
function generateBusinessList() {
    // Reference to the container element
    const container = document.getElementById("businessList");
  
    // Clear existing content
    container.innerHTML = "";
    const request = window.indexedDB.open("RAFeedbackDB", 1);
    request.onsuccess = (event) => {
        //DB Instance
        db = event.target.result;
        let transaction1 = db.transaction(['reviews'], 'readonly');
        let objectStore1 = transaction1.objectStore('reviews');
        let request1 = objectStore1.getAll();

        request1.onsuccess = function(event) {
            let reviews = event.target.result;
            let n = 1
            // Loop through the array of business names
            // Check if reviews array is empty
            if (reviews.length === 0) {
                // Display "No data found" message
                const noDataMessage = document.createElement("h1");
                noDataMessage.textContent = "No record found";
                container.appendChild(noDataMessage);
            } else {reviews.forEach(review => {
                // Create a new div element
                const div = document.createElement("div");
                div.onclick = () => displayData(review);
                // Create an h1 element for the business name
                const h1 = document.createElement("h1");
                h1.textContent = "Business Name: " + review.businessname;

                // Create two p elements for additional information (you can customize this as needed)
                const p1 = document.createElement("p");
                p1.textContent = "Reviewer Email: " + review.revieweremail; // Example additional information
                const p2 = document.createElement("p");
                p2.textContent = "Overall Rating: " + review.overallRating.toFixed(1); // Example additional information

                // Append the h1 and p elements to the div
                div.appendChild(h1);
                div.appendChild(p1);
                div.appendChild(p2);
                
                // Add additional styling or attributes if needed
                div.style.padding = "10px";
                div.style.border = "1px solid #ccc";
                div.style.marginBottom = "5px";
            
                // Append the div to the container
                container.appendChild(div);
                n = n + 1;
            });
        }
    }};
  }
function deleteBusinessFromIndexedDB(businessName) {
    const request = window.indexedDB.open("RAFeedbackDB", 1);
    
    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(["reviews"], "readwrite");
        const store = transaction.objectStore("reviews");

        // Use the index to match records
        const index = store.index("businessNameIndex");
        const getRequest = index.get(businessName);

        getRequest.onsuccess = function(event) {
            const record = event.target.result;
            if (record) {
                // If the record exists, delete it using the primary key
                const deleteRequest = store.delete(record.id);
                deleteRequest.onsuccess = function(event) {
                    console.log("Record deleted successfully!");
                    document.getElementById('frmModify').style.display = 'none';
                    document.getElementById('businessList').style.display = 'block';
                    generateBusinessList(); // Refresh the business list, this function should handle empty cases
                };
                deleteRequest.onerror = function(event) {
                    console.error("Delete error: ", event.target.errorCode);
                };
            } else {
                console.log("No record found with that business name.");
            }
        };

        getRequest.onerror = function(event) {
            console.error("Error fetching record: ", event.target.errorCode);
        };
    };
}

function updateObject(bName) {
    const request = window.indexedDB.open("RAFeedbackDB", 1);
    
    request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        const transaction = db.transaction("reviews", "readwrite");
        const store = transaction.objectStore("reviews");
        const getRequest = store.get(bName);
        let businessName = document.getElementById('frmModifytxtBusinessName').value;
        let typeId = document.getElementById('frmModifyDropType').value; // Assuming you'll map these to actual type IDs
        let reviewerEmail = document.getElementById('frmModifytxtReviewerEmail').value;
        let reviewerComments = document.getElementById('frmModifytxtAreaReviewerComments').value;
        let reviewDate = document.getElementById('frmModifytxtReviewDate').value;
        let hasRating = document.getElementById('frmModifyRatings').checked;
        let rating1 = parseInt(document.getElementById('frmModifytxtFoodQuality').value, 10) || 0;
        let rating2 = parseInt(document.getElementById('frmModifytxtService').value, 10) || 0;
        let rating3 = parseInt(document.getElementById('frmModifytxtValue').value, 10) || 0;
        let overallRating = (rating1 + rating2 + rating3) / 3;

        let newData = {
            // id: reviewId,
            businessname: businessName,
            typeId: typeId,
            revieweremail: reviewerEmail,
            reviewerComments: reviewerComments,
            reviewdate: reviewDate,
            hasrating: hasRating,
            rating1: rating1,
            rating2: rating2,
            rating3: rating3,
            overallRating: overallRating
        };
        
        getRequest.onsuccess = function(event) {
            // Grab the data object returned as the result
            const data = event.target.result;;
            // Update the data with values from newData
            data.businessname = newData.businessname;
            data.typeId = newData.typeId;
            data.revieweremail = newData.revieweremail;
            data.reviewerComments = newData.reviewerComments;
            data.reviewdate = newData.reviewdate;
            data.hasrating = newData.hasrating;
            data.rating1 = newData.rating1;
            data.rating2 = newData.rating2;
            data.rating3 = newData.rating3;
            data.overallRating = newData.overallRating;

            // Put the updated data back into the object store
            var putRequest = store.put(data);
            putRequest.onsuccess = function(event) {
            console.log('Review updated in the database');
            document.getElementById('frmModify').style.display = 'none';
            document.getElementById('businessList').style.display = 'block';
            generateBusinessList();
        }
        };

        getRequest.onerror = function(event) {
            console.error('Error updating record', event.target.error);
        };

        request.onerror = function(event) {
            console.error('Error getting record', event.target.error);
        };
    };

    request.onerror = function(event) {
        console.error('Error opening database', event.target.error);
    };
}

