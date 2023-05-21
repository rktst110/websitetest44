

//<!-- common firebase Codes Starts Here -->

	var dataTemp ;
var returnedDataObj;
function getFirestoreData( passedValue, passedObj )
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
   
function fetchFirebaseDocData(docPath) {
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
	if( firestoreIndexObj[ tradingDate ]['Index']['common_timeValues'] !=undefined )
	{
		timeValuesArray = firestoreIndexObj[ tradingDate ]['Index']['common_timeValues']
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
  