

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
		
		
         // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
             localStorage.setItem( 'firestoreIndexObj', JSON.stringify(firestoreIndexObj) )
              break; // Successfully stored the new entry
            } catch (e) {
				//document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
              currentAttempt++;
            }
          }
		  // Attempt to update localStorage and handle quota exceeded error (Ends Here)
		  
		
	refreshOrLiveFirebaseData(passedValue)
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
	  }
	  

	  
	}

async function fetchSectorStockNamesCollectionData_Previous_28May2023( collectionPath ) {

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

async function fetchSectorStockNamesCollectionData_Previous_07Sep2023( collectionPath ) {
	

	  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};


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
		var symbolsArray = JSON.parse(doc.data()['data'])['Symbols']
      sectorStockNamesObj[doc.id] = symbolsArray.sort() ;
	  //console.log( symbolsArray )
	  
    });
	
  
          // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
               localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:sectorStockNamesObj} ));
              break; // Successfully stored the new entry
            } catch (e) {
				document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
              currentAttempt++;
            }
          }
		// Attempt to update localStorage and handle quota exceeded error (Ends Here)
	
    return sectorStockNamesObj;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return null;
  }
  }
}

async function fetchSectorStockNamesCollectionData( collectionPath ) {

	  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};


	var localStorageForSectorStockNames = localStorage.getItem('sectorStockNames')
	if( localStorageForSectorStockNames!=null && JSON.parse(localStorageForSectorStockNames) [collectionPath]!=undefined )
	{
		 var sectorStockNamesObj = {};
		var allDocsDataObj = JSON.parse(localStorageForSectorStockNames) [collectionPath]
		//console.log("getting from localstorage")

		for( var sector in allDocsDataObj )
		{
			var symbolsArray = allDocsDataObj[sector]['Symbols']
			if( symbolsArray==undefined )
			{
				symbolsArray = Object.keys( allDocsDataObj[sector]['data'] )
			}
		  sectorStockNamesObj[ sector ] = symbolsArray.sort() ;
		  //console.log( symbolsArray )
		}
		return sectorStockNamesObj;
	}
	else {
  var collectionRef = db.collection(collectionPath);
  var sectorStockNamesObj = {};

  try {
    const querySnapshot = await collectionRef.get();
	var allDocsDataObj = {}
    querySnapshot.forEach(function(doc) {
		var docData = JSON.parse(doc.data()['data'])
		var symbolsArray = docData['Symbols']
		if( symbolsArray==undefined )
		{
			symbolsArray = Object.keys( docData['data'] )
		}
		allDocsDataObj [doc.id] = docData
      sectorStockNamesObj[doc.id] = symbolsArray.sort() ;
	  //console.log( symbolsArray )
	  
    });
	
  
          // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
               //localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:sectorStockNamesObj} ));
               localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:allDocsDataObj} ));
              break; // Successfully stored the new entry
            } catch (e) {
				document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
              currentAttempt++;
            }
          }
		// Attempt to update localStorage and handle quota exceeded error (Ends Here)
	
    return sectorStockNamesObj;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return null;
  }
  }

}

async function fetchIndicesSectorStockNamesCollectionData( collectionPath ) {

	  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};


	var localStorageForSectorStockNames = localStorage.getItem('sectorStockNames')
	if( localStorageForSectorStockNames!=null && JSON.parse(localStorageForSectorStockNames) [collectionPath]!=undefined )
	{
		 var sectorStockNamesObj = {};
		var allDocsDataObj = JSON.parse(localStorageForSectorStockNames) [collectionPath]
		console.log("getting from localstorage")
		/*
		for( var sector in allDocsDataObj )
		{
			var symbolsArray = allDocsDataObj[sector]['Symbols']
			if( symbolsArray==undefined )
			{
				symbolsArray = Object.keys( allDocsDataObj[sector]['data'] )
			}
		  sectorStockNamesObj[ sector ] = symbolsArray.sort() ;
		  //console.log( symbolsArray )
		}
		*/
		return allDocsDataObj;
	}
	else {
  var collectionRef = db.collection(collectionPath);
  var sectorStockNamesObj = {};

  try {
    const querySnapshot = await collectionRef.get();
	var allDocsDataObj = {}
    querySnapshot.forEach(function(doc) {
		var docData = JSON.parse(doc.data()['data'])
		var symbolsArray = docData['Symbols']
		if( symbolsArray==undefined )
		{
			symbolsArray = Object.keys( docData['data'] )
		}
		allDocsDataObj [doc.id] = docData
      //sectorStockNamesObj[doc.id] = symbolsArray.sort() ;
      sectorStockNamesObj[doc.id] = docData;
	  //console.log( symbolsArray )
	  
    });
	
  
          // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
               //localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:sectorStockNamesObj} ));
               localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:allDocsDataObj} ));
              break; // Successfully stored the new entry
            } catch (e) {
				document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
			  localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));
              currentAttempt++;
            }
          }
		// Attempt to update localStorage and handle quota exceeded error (Ends Here)
	
    return sectorStockNamesObj;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return null;
  }
  }
}

async function fetchDeliveryDataDocData_Previous_28May2023(docPath) {

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

async function fetchDeliveryDataDocData_Previous_till_01May2025(docPath) {

	  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};


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

		
          // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
               	localStorage.setItem('deliveryData', JSON.stringify( {[docPath]:dataObj} ));
              break; // Successfully stored the new entry
            } catch (e) {
				document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
			  localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));
              currentAttempt++;
            }
          }
		  // Attempt to update localStorage and handle quota exceeded error (Ends Here)
		
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

async function fetchDeliveryDataDocData(docPath) {

	  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};


	var localStorageForDeliveryData = localStorage.getItem('deliveryData')
	if( localStorageForDeliveryData!=null && JSON.parse(localStorageForDeliveryData) [docPath]!=undefined )
	{
		return (JSON.parse(localStorageForDeliveryData) [docPath] )
	}
	
	else {
		//var docPath = '/April 2025/30-Apr-2025/delivery_data/part1';
		var collectionPath = docPath.split('/').slice(0, -1).join('/');
		// Result: "April 2025/30-Apr-2025/delivery_data"

  var collectionRef = db.collection(collectionPath);

  try {
	  
    var collectionRef = db.collection(collectionPath);
	/*
    const querySnapshot = await collectionRef.get();
	var allDocsDataObj = {}
    querySnapshot.forEach(function(doc) {
		var docData = JSON.parse(doc.data()['data'])
		var symbolsArray = docData['Symbols']
		if( symbolsArray==undefined )
		{
			symbolsArray = Object.keys( docData['data'] )
		}
		allDocsDataObj [doc.id] = docData
	  //console.log( symbolsArray )
	  
    });
	*/
	//const snapshot = await getDocs(colRef);
	const snapshot = await collectionRef.get();
var allDocsDataObj = {}
  const merged = {};
  for (const doc of snapshot.docs) {
    const dataStr = doc.data().data;
    const chunk = JSON.parse(dataStr);

    for (const [key, value] of Object.entries(chunk)) {
      if (key === 'Symbols') {
        if (!merged.Symbols) merged.Symbols = {};
        Object.assign(merged.Symbols, value);
      } else {
        merged[key] = value; // These should be consistent across all chunks
      }
    }
  }
	allDocsDataObj = { "data": JSON.stringify(merged) }
	//console.log( "20DAV deliveryData", allDocsDataObj )  
  
          // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
               //localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:sectorStockNamesObj} ));
               //localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:allDocsDataObj} ));
			   	localStorage.setItem('deliveryData', JSON.stringify( {[docPath]:allDocsDataObj} ));
              break; // Successfully stored the new entry
            } catch (e) {
				if( document.getElementById('messages') !=null )
					document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
              localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));
              currentAttempt++;
            }
          }
		// Attempt to update localStorage and handle quota exceeded error (Ends Here)
	
    return allDocsDataObj;
  } catch (error) {
    console.log("Error getting documents: ", error);
    return null;
  }
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


//code for fetching intraday charts (STARTS HERE)

function convertIntoSeconds(time) {
		var ts = time.split(':');
		return Date.UTC(1970, 0, 1, ts[0], ts[1], ts[2]) / 1000;
}

	var dateTimeOptions = {
		timeZone: 'Asia/Kolkata',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	};

function fetchIntradayChartFirebaseDocData(docPath, selectedTradingDate ) {
  var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
  var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};
 
  var firebaseIntradayChartsLocalStorage = localStorage.getItem('firebaseFetchedIntradayCharts');
  var intradayChartsDocs = firebaseIntradayChartsLocalStorage ? JSON.parse(firebaseIntradayChartsLocalStorage) : {};


	var currentTimeHMS = new Date().toLocaleString('en-IN', dateTimeOptions).split(' ')[1];
	//context.log.info(`currentTime: ${currentTime}, currentTimeHMS: ${currentTimeHMS}`);
	var currentDate = new Date().toLocaleString('en-IN', dateTimeOptions).split(',')[0];
	var passedTradingDate = new Date( selectedTradingDate ).toLocaleString('en-IN', dateTimeOptions).split(',')[0];
	
	if ( passedTradingDate==currentDate && convertIntoSeconds(currentTimeHMS) > convertIntoSeconds('08:55:00') && convertIntoSeconds(currentTimeHMS) <= convertIntoSeconds('15:35:00') ) 
	 { // fetch new data each time when these conditions meets
	// console.log("current day.. fetching intraday chart data for ",passedTradingDate,"date & docPath is",docPath)
	 var firebaseFetchedIntradayCharts = {};
    var docRef = db.doc(docPath);

    // Retrieve the document from Firebase
    return docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var dataObj = doc.data();

          // Store the fetched document in localStorage
		firebaseFetchedIntradayCharts[docPath] = dataObj;

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

	else if( intradayChartsDocs[docPath] != undefined )
	{
	//console.log("data found in localstorage and returning it")
    return intradayChartsDocs[docPath];
  } else 
  {
  var firebaseFetchedIntradayCharts = {};
    var docRef = db.doc(docPath);

    // Retrieve the document from Firebase
    return docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          var dataObj = doc.data();

          // Store the fetched document in localStorage
         firebaseFetchedIntradayCharts[docPath] = dataObj;

          // Attempt to update localStorage and handle quota exceeded error
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
              localStorage.setItem('firebaseFetchedIntradayCharts', JSON.stringify(firebaseFetchedIntradayCharts));
              break; // Successfully stored the new entry
            } catch (e) {
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
              delete firebaseFetchedDocs[oldestEntryKey];
			  localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));
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

//code for fetching intraday charts (ENDS HERE)



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
  