

//<!-- common firebase Codes Starts Here -->

	var dataTemp ;
var returnedDataObj;
function getFirestoreData_Previous_28May2023( passedValue, passedObj )
{

	const selectElement = document.getElementById("tradingDate");
	 selectElement.innerHTML = '<option>Select</option>'
	 if( passedObj !=undefined && passedObj !="" )
	 {
		for( var tradingDate in passedObj )
		{
		const optionElement = document.createElement("option");
		optionElement.text = tradingDate;
		selectElement.add(optionElement);
		}
	 	
	 }
	 else
	 {
	var monthYearCollection = document.getElementById('monthYear').value

    //var usersRef = db.doc('/April 2023/26-Apr-2023/');
    //var usersRef = db.collection('May 2023')  
    var usersRef = db.collection(monthYearCollection)  
	firestoreIndexObj = {};
	
    // Retrieve all documents in the 'users' collection
    usersRef.get()
      .then(function(querySnapshot) {
      dataTemp = querySnapshot 
      //console.log( querySnapshot );
	  

	  
        querySnapshot.forEach(function(doc) {

          //document.getElementById('firebaseData').innerHTML += (doc.id + " => " + JSON.stringify(doc.data()) + "<br>");
          //console.log(doc.id, " => ", doc.data());
		  firestoreIndexObj [doc.id] = doc.data()
		  const optionElement = document.createElement("option");
    optionElement.text = doc.id;
    selectElement.add(optionElement);
	
        });
		localStorage.setItem( 'firestoreIndexObj', JSON.stringify(firestoreIndexObj) )
	refreshOrLiveFirebaseData(passedValue)
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
	  }
	  

	  
	}

function getFirestoreData( passedValue, passedObj )
{
	  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};


	const selectElement = document.getElementById("tradingDate");
	 selectElement.innerHTML = '<option>Select</option>'
	 if( passedObj !=undefined && passedObj !="" )
	 {
		for( var tradingDate in passedObj )
		{
		const optionElement = document.createElement("option");
		optionElement.text = tradingDate;
		selectElement.add(optionElement);
		}
	 	
	 }
	 else
	 {
	var monthYearCollection = document.getElementById('monthYear').value

    //var usersRef = db.doc('/April 2023/26-Apr-2023/');
    //var usersRef = db.collection('May 2023')  
    var usersRef = db.collection(monthYearCollection)  
	firestoreIndexObj = {};
	
    // Retrieve all documents in the 'users' collection
    usersRef.get()
      .then(function(querySnapshot) {
      dataTemp = querySnapshot 
      //console.log( querySnapshot );
	  

	  
        querySnapshot.forEach(function(doc) {

          //document.getElementById('firebaseData').innerHTML += (doc.id + " => " + JSON.stringify(doc.data()) + "<br>");
          //console.log(doc.id, " => ", doc.data());
		  firestoreIndexObj [doc.id] = doc.data()
		  const optionElement = document.createElement("option");
    optionElement.text = doc.id;
    selectElement.add(optionElement);
	
        });
		
		
          // Attempt to update localStorage and handle quota exceeded error
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
             localStorage.setItem( 'firestoreIndexObj', JSON.stringify(firestoreIndexObj) )
              break; // Successfully stored the new entry
            } catch (e) {
				document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
              currentAttempt++;
            }
          }
		  
		
	refreshOrLiveFirebaseData(passedValue)
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
	  }
	  

	  
	}


async function fetchSectorStockNamesCollectionData( collectionPath ) {

	var localStorageForSectorStockNames = localStorage.getItem('sectorStockNames')
	if( localStorageForSectorStockNames!=null && JSON.parse(localStorageForSectorStockNames) [collectionPath]!=undefined )
	{
		return (JSON.parse(localStorageForSectorStockNames) [collectionPath] )
	}
	else {
  var collectionRef = db.collection(collectionPath);
  var sectorStockNamesObj = {};

  try {
    const querySnapshot = await collectionRef.get();
    querySnapshot.forEach(function(doc) {
      sectorStockNamesObj[doc.id] = JSON.parse(doc.data()['data'])['Symbols'] ;
    });
	
    //localStorage.setItem(collectionPath, JSON.stringify(sectorStockNamesObj));
    localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:sectorStockNamesObj} ));
    return sectorStockNamesObj;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return null;
  }
  }
}

async function fetchDeliveryDataDocData(docPath) {

	var localStorageForDeliveryData = localStorage.getItem('deliveryData')
	if( localStorageForDeliveryData!=null && JSON.parse(localStorageForDeliveryData) [docPath]!=undefined )
	{
		return (JSON.parse(localStorageForDeliveryData) [docPath] )
	}
	else
	{
  var docRef = db.doc(docPath);
  //var usersRef = db.doc('/April 2023/26-Apr-2023/');
  //var usersRef = db.collection('May 2023')  
	
  // Retrieve the document from Firebase
  return docRef.get()
    .then(function(doc) {
      if (doc.exists) {
        var dataObj =  doc.data();
		localStorage.setItem('deliveryData', JSON.stringify( {[docPath]:dataObj} ));
        return dataObj;
      } else {
        console.log("Document does not exist");
        return null;
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
      return null;
    });
	}
}

function fetchFirebaseDocData_ORIGINAL(docPath) {
	
	var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs')
	if( firebaseFetchedDocsLocalStorage!=null && JSON.parse(firebaseFetchedDocsLocalStorage) [docPath]!=undefined )
	{
		return (JSON.parse(firebaseFetchedDocsLocalStorage) [docPath] )
	}
	else 
	{
  var docRef = db.doc(docPath);
  //var usersRef = db.doc('/April 2023/26-Apr-2023/');
  //var usersRef = db.collection('May 2023')  
	
  // Retrieve the document from Firebase
  return docRef.get()
    .then(function(doc) {
      if (doc.exists) {
        var dataObj =  doc.data();
        return dataObj;
      } else {
        console.log("Document does not exist");
        return null;
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
      return null;
    });
	
}
}

function fetchFirebaseDocData_Previous_27May2023(docPath) {
  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};

  if (firebaseFetchedDocs[docPath] !== undefined) {
    return firebaseFetchedDocs[docPath];
  } else {
    var docRef = db.doc(docPath);

    // Retrieve the document from Firebase
    return docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var dataObj = doc.data();

          // Store the fetched document in localStorage
          firebaseFetchedDocs[docPath] = dataObj;
          var entries = Object.entries(firebaseFetchedDocs);
          if (entries.length > 50) {
            // Remove the oldest entry if more than 50 entries are present
            delete firebaseFetchedDocs[entries[0][0]];
          }
          localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));

          return dataObj;
        } else {
          console.log("Document does not exist");
          return null;
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
        return null;
      });
  }
}

function fetchFirebaseDocData(docPath) {
  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};

  if (firebaseFetchedDocs[docPath] !== undefined) {
    return firebaseFetchedDocs[docPath];
  } else {
    var docRef = db.doc(docPath);

    // Retrieve the document from Firebase
    return docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var dataObj = doc.data();

          // Store the fetched document in localStorage
          firebaseFetchedDocs[docPath] = dataObj;

          // Attempt to update localStorage and handle quota exceeded error
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
              localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));
              break; // Successfully stored the new entry
            } catch (e) {
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
              currentAttempt++;
            }
          }

          if (currentAttempt === maxAttempts) {
            console.log("Unable to store the new entry due to quota limitations.");
          }

          return dataObj;
        } else {
          console.log("Document does not exist");
          return null;
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
        return null;
      });
  }
}


function refreshOrLiveFirebaseData(passedValue)
{
	//console.log(passedValue)
	
	if( passedValue=="refresh" || passedValue=="live")
	  {
	  var savedSelectedValues = JSON.parse( localStorage.getItem( 'selectedValues' ) )
	document.getElementById('monthYear').value = savedSelectedValues["selectedMonthYear"]
	document.getElementById('tradingDate').value = savedSelectedValues["selectedTradingDate"]
	
	setCommonSelectors()
	document.getElementById('commonTimeValues').value = savedSelectedValues["selectedCommonTimeValues"]
	
	  }
	  
	  
	if( passedValue=="refresh")
	  {
	fetchDataForAllSegments();
	  }
	  else if( passedValue=="live" )
	  {

	  	var theSelect = document.getElementById('commonTimeValues');
		var lastValue = theSelect.options[theSelect.options.length - 1].value;
		document.getElementById("commonTimeValues").value = lastValue
		
		saveSelectedValues();
		fetchDataForAllSegments();
	  }
	  
	}

function generateMonthYearFromDate(startDate) {
  const currentDate = new Date();
  const months = [];

  // Helper function to format the month and year as a string
  function formatDate(date) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    return monthNames[monthIndex] + " " + year;
  }

  // Loop through each month from startDate to currentDate
  let currentDateTemp = new Date(startDate.getTime());
  while (currentDateTemp <= currentDate) {
    months.push(formatDate(currentDateTemp));
    currentDateTemp.setMonth(currentDateTemp.getMonth() + 1);
  }

  // Add the options to the select element
  const selectElement = document.getElementById("monthYear");
  selectElement.innerHTML = '<option>Select</option>'
  
  for (let i = 0; i < months.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.text = months[i];
    selectElement.add(optionElement);
  }
  
/*
  // Select the current month and year by default
  const currentMonthYear = formatDate(currentDate);
  selectElement.value = currentMonthYear;
  */

  if( localStorage.getItem( 'firestoreIndexObj' ) !=undefined )
  {
	firestoreIndexObj = JSON.parse( localStorage.getItem( 'firestoreIndexObj' ) )
	getFirestoreData( "", firestoreIndexObj )
	
	setSavedSelectedTimeValues()
	fetchDataForAllSegments()
  }
}

function setCommonSelectors()
{
	var tradingDate = document.getElementById('tradingDate').value
	var timeValuesArray 
	if( firestoreIndexObj[ tradingDate ]['Index']['common_time_values'] !=undefined )
	{
		//timeValuesArray = firestoreIndexObj[ tradingDate ]['Index']['common_timeValues']
		timeValuesArray = firestoreIndexObj[ tradingDate ]['Index']['common_time_values']
		// handle common time values
	}
	else
	{
		timeValuesArray = firestoreIndexObj[ tradingDate ]['Index']['index_performace']
	}

const selectElement = document.getElementById("commonTimeValues");
selectElement.innerHTML = '<option>Select</option>'
  for (let i = 0; i < timeValuesArray.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.text = timeValuesArray[i];
    selectElement.add(optionElement);
  }


}

// Example usage: generate month and year from April 2023 till now
//generateMonthYearFromDate( new Date("April 2023") );


// <!-- common firebase Codes Ends Here -->
  
