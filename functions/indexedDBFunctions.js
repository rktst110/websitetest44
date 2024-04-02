
var DatabaseName = 'DatabaseOIV'
var ObjectStoreName = 'ObjectStoreOIV'

async function fetchDerivativesCollectionDataOnly( collectionPath ) 
{

    //const snapshot = await firebase.firestore().collection('/July 2023/26-Jul-2023/all_derivatives/11:36:00/11:36:00').get()
    var snapshot = await firebase.firestore().collection( collectionPath ).get()
    var documents = {};
   snapshot.forEach(doc => {
	    var fetchedData = doc.data()
	   //console.log("doc.data()",fetchedData)
	  if(fetchedData['data']!=undefined)
	  {
		   documents[doc.id] = fetchedData;
	  }
	  else
	  {
		  for( var symbol in fetchedData )
		  {
			  documents[symbol] = {
				  "data": fetchedData[symbol]
			  }
		  }
	  }
      // var document = { [doc.id]: doc.data() };
       //documents.push(document);
	  
    })
    	//console.log( documents )
    return documents;
	
}

// Function to check if IndexedDB is supported by the browser
function isIndexedDBSupported() {
  return 'indexedDB' in window;
}

// Function to open or create the IndexedDB database and object store
function openOrCreateDB() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DatabaseName, 1);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(ObjectStoreName)) {
        db.createObjectStore(ObjectStoreName);
      }
    };

    request.onerror = () => {
      reject('Error opening IndexedDB');
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      resolve(db);
    };
  });
}

// Function to check if the "YourDatabaseName" database is available in IndexedDB
async function isDatabaseAvailable() {
  try {
    const db = await openOrCreateDB();
    db.close();
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if the "YourObjectStoreName" object store exists in the database
async function isObjectStoreAvailable(db) {
  return db.objectStoreNames.contains(ObjectStoreName);
}

// Function to check if the data for a given path is available in IndexedDB
async function checkIfPathAvailableInIDB(path, db) {
  return new Promise((resolve, reject) => {
    if (!isObjectStoreAvailable(db)) {
      resolve(null);
      return;
    }

    const transaction = db.transaction([ObjectStoreName], 'readonly');
    const objectStore = transaction.objectStore(ObjectStoreName);

    const getRequest = objectStore.get(path);

    getRequest.onsuccess = () => {
      if (getRequest.result) {
        // Data for the path is available in IndexedDB
        resolve(getRequest.result);
      } else {
        // Data for the path is not available in IndexedDB
        resolve(null);
      }
    };

    getRequest.onerror = () => {
      reject('Error checking path in IndexedDB');
    };
  });
}

// Function to save data into IndexedDB with the provided path
async function saveDataToIDB(path, data, db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([ObjectStoreName], 'readwrite');
    const objectStore = transaction.objectStore(ObjectStoreName);

    const putRequest = objectStore.put(data, path);

    putRequest.onsuccess = () => {
      resolve('Data saved to IndexedDB successfully');
    };

    putRequest.onerror = () => {
      reject('Error saving data to IndexedDB');
    };
  });
}

function getCurrentDate() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = months[currentDate.getMonth()];
    const year = currentDate.getFullYear();
    return `${day}-${month}-${year}`;
}



// Function to handle the logic of fetching data from the provided path and saving it
// to either IndexedDB (if available) or Web Storage (localStorage) as a fallback
async function fetchAndSaveDataIDB(path, url) {
  try {
    if (isIndexedDBSupported()) {
      if (await isDatabaseAvailable()) {
        const db = await openOrCreateDB();
        if (await isObjectStoreAvailable(db)) {
          const existingData = await checkIfPathAvailableInIDB(path, db);
          if (existingData && Object.keys(existingData).length>0 && path.includes('/all_derivatives/') ) {
            //console.log('Data found in IndexedDB:', existingData);
			allDerivativesDataObj = existingData;
			return existingData;
          }
		  else if (existingData && path.includes('/Delivery_Data/')  ) {
            //console.log('Data found in IndexedDB:', existingData);
			allDerivativesDataObj = existingData;
			return existingData;
          }
		  else {
            const fetchedData = await fetchDerivativesCollectionDataOnly( path );
           //console.log('Data fetched from the URL:', fetchedData);
            //await saveDataToIDB(path, fetchedData, db);
			
			// Example usage:
			var currentDate = getCurrentDate(); // Output: e.g., "26-Mar-2024"

			
			if( path.includes('/Delivery_Data/') ) // only for Delivery_Data
			{
				if( path.split('Delivery_Data/')[1].replace(/\//g,'') == currentDate && Object.keys(fetchedData).length>0 )
				//if( path.split('Delivery_Data/')[1].replace(/\//g,'') != currentDate )
				{
					// if Delivery_Data date is equals to current date 
					// and fetchedData object is not empty like this "{}" 
					// only then save delivery data object 
					await saveDataToIDB(path, fetchedData, db);
				}
				else if( new Date(path.split('Delivery_Data/')[1].replace(/\//g,'')) < new Date(currentDate) )
				{
					// if Delivery_Data date is not equals to current date  
					// then save delivery data object even data is empty like this "{}"
					await saveDataToIDB(path, fetchedData, db);
				}
			}
			else // this is for all derivatives
			{
				await saveDataToIDB(path, fetchedData, db);
			}
			
            //console.log('Data saved to IndexedDB with path:', path);
			allDerivativesDataObj = fetchedData;
			return fetchedData;
          }
        } else {
          console.log('Object store "YourObjectStoreName" not available in IndexedDB.');
        }
      } else {
        console.log('Database "YourDatabaseName" not available in IndexedDB.');
      }
    } else {
      console.log('IndexedDB is not supported in this browser.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to clear IndexedDB
function clearIndexedDB( passedDatabaseName ) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(passedDatabaseName);

    request.onsuccess = () => {
      resolve("IndexedDB cleared successfully.");
    };

    request.onerror = (event) => {
      reject("Error clearing IndexedDB: " + event.target.errorCode);
    };
  });
}

function askClearIDB()
{

  if (confirm("Do you really want to clear Indexed Database ?") == true) {
    //text = "You pressed OK!";
	
// Usage example:
//const databaseName = "your_database_name"; // Replace with the name of your IndexedDB database
//const databaseName = DatabaseName; // Replace with the name of your IndexedDB database
clearIndexedDB( DatabaseName )
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.error(error);
  });


  } else {
    //text = "You canceled!";
  }

}


//var a=await getMarker() 
//console.log(a)


//EOD Delivery Data Functions(Starts Here)


async function previousTradingDateObj( passedPrevDays=1, passedDate, useCurrentDateDelivery=false )
{
	//var returnedDataObj = await previousTradingDateObj2( 1, '29-Dec-2023' )
	 var loopCondition = true
	 var numberCounter = 0
	 var retryCounter = 0 // retry for any date only 3 times to exit from infinite loop
	 var specifiedPreviousDatesObj = {}
	 var selectedDate = passedDate; 
	 while( loopCondition )
	 {
		 /*
		 if( numberCounter==0 && retryCounter ==0 && useCurrentDateDelivery==false )
		 { // 		 
			 selectedDate = passedDate; 
			 //retryCounter = 0
		 }
		 else if(  numberCounter!=0 || retryCounter >2 ) { // if already retried 3 times then use next trading date
			 //selectedDate = formatDate(new Date(new Date('02-Feb-2023')-1)) ; 
			 selectedDate = formatDate(new Date(new Date(selectedDate)-1)); 
			 retryCounter = 0 
		 }
		 
		 */
		 if( useCurrentDateDelivery==false || numberCounter!=0 || retryCounter >1 ) { // if already retried 3 times then use next trading date
			 //selectedDate = formatDate(new Date(new Date('02-Feb-2023')-1)) ; 
			 selectedDate = formatDate(new Date(new Date(selectedDate)-1)); 
			 retryCounter = 0 
		 }
		 
		 //console.log("selectedDate",selectedDate)
		 var monthYear = getMonthYearFromDate(selectedDate); // Output: "December 2023"
		 
		 //var docPath = '/December 2023/Delivery_Data/29-Dec-2023'
		 var docPath = '/'+monthYear+'/Delivery_Data/'+selectedDate
		 
		 //var allDerivativesDataArray = await fetchDerivativesCollectionData( docPathForSpurts )
		 var deliveryDataObj = await fetchAndSaveDataIDB( docPath );
		 //console.log(deliveryDataObj)
		 
		 if( Object.keys(deliveryDataObj).length>0 )
		 {
			 deliveryDataObj = JSON.parse(deliveryDataObj[ selectedDate ]['data'])
			 specifiedPreviousDatesObj[ selectedDate ] = deliveryDataObj
			 
			 if( ( Number(passedPrevDays) -1 )==numberCounter )
			 { // if got specifed previous trading days data then exit from loop
				 loopCondition = false
			 }
			 
			 numberCounter++;
		 }
		 
		 retryCounter ++;
		 if( 2*Number( passedPrevDays )==retryCounter )
		 {
			// if we don't get data after so many retries then then exit from loop
				 loopCondition = false
		 }
		//console.log("retryCounter",retryCounter, selectedDate )
		
	 }
	 //console.log("specifiedPreviousDatesObj", specifiedPreviousDatesObj)
	 return specifiedPreviousDatesObj;
	 
	 
function formatDate(date) {
	date = new Date(date)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const day = String(date.getDate()).padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getMonthYearFromDate(date) {
	date = new Date(date)
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
}

	// await sleep(200)
 } //  async function previousTradingDateObj( passedPrevDays=1 ) ENDS HERE
 

async function fetchCalculatedEODDeliveryData( collectionPath ) {
  try {
  
	var firebaseFetchedDocsLocalStorage = localStorage.getItem('firebaseFetchedDocs');
	var firebaseFetchedDocs = firebaseFetchedDocsLocalStorage ? JSON.parse(firebaseFetchedDocsLocalStorage) : {};

	var selectedMonthYear = document.getElementById('monthYear').value
	var selectedTradingDate = document.getElementById('tradingDate').value
	var selectedAvgDays
	if( document.getElementById("avgDays") )
		selectedAvgDays = Number( document.getElementById("avgDays").value )
	else
		selectedAvgDays = 10
	
	var useCurrentDateDelivery
	if( document.getElementById("useCurrentDateDelivery") )
		useCurrentDateDelivery = ( document.getElementById('useCurrentDateDelivery').checked==true )
	else
		useCurrentDateDelivery = false
	
	collectionPath = collectionPath+selectedAvgDays+useCurrentDateDelivery
	
	var localStorageForCalculatedEODDeliveryData = localStorage.getItem('calculatedEODDeliveryData')
	if( localStorageForCalculatedEODDeliveryData!=null && JSON.parse(localStorageForCalculatedEODDeliveryData) [collectionPath]!=undefined )
	{
		 var sectorStockNamesObj = {};
		var allDocsDataObj = JSON.parse(localStorageForCalculatedEODDeliveryData) [collectionPath]
		console.log("getting from localstorage")
		return allDocsDataObj;
	}
	else {
  //var collectionRef = db.collection(collectionPath);
  var sectorStockNamesObj = {};

	
	var returnedDateWiseObj  = await previousTradingDateObj( Number(selectedAvgDays)+1, selectedTradingDate, useCurrentDateDelivery )
	
	var selectedDeliveryTradingDate =  Object.keys(returnedDateWiseObj)[0]
	//var selectedDateDeliveryObj = returnedDateWiseObj[ Object.keys(returnedDateWiseObj)[0] ]['Symbols']
	var selectedDateDeliveryObj = returnedDateWiseObj[ selectedDeliveryTradingDate ]['Symbols']
	
	
	var aggergatedDeliveryQntyObj = {}
	for ( var date in returnedDateWiseObj )
	{
		//if( date!=selectedTradingDate && date!= undefined)
		if( date!=selectedDeliveryTradingDate && date!= undefined)
		{
			var dateObj = returnedDateWiseObj[ date ]['Symbols']
			for( var stockName in dateObj )
			{
				var symbolObj = dateObj[ stockName ] //for short-handing
				if( symbolObj != undefined )
				{
					//11: "deliverable_quantity"
					if( aggergatedDeliveryQntyObj[ stockName ] ==undefined )
					{
						//aggergatedDeliveryQntyObj[ stockName ] = symbolObj[ 'deliverable_quantity' ]
						aggergatedDeliveryQntyObj[ stockName ] = {
							'deliverable_quantity': symbolObj[ 'deliverable_quantity' ],
							'deliverable_percentage': symbolObj[ 'deliverable_percentage' ]
						}
						
					}
					else
					{
						//aggergatedDeliveryQntyObj[ stockName ] += symbolObj[ 'deliverable_quantity' ]
						aggergatedDeliveryQntyObj[ stockName ]['deliverable_quantity'] += symbolObj[ 'deliverable_quantity' ]
						aggergatedDeliveryQntyObj[ stockName ]['deliverable_percentage'] += symbolObj[ 'deliverable_percentage' ]
					}
					
				}

			}
		}
		
	}
	
	//console.log("aggergatedDeliveryQntyObj",aggergatedDeliveryQntyObj)
	for( var symbol in selectedDateDeliveryObj )
	{
		var symbolObj = selectedDateDeliveryObj[symbol] //for short-handing
		//console.log( symbol )
		if( aggergatedDeliveryQntyObj[ symbol ] )
		{
		var averageDeliveryQuantity = (  symbolObj['deliverable_quantity'] / ( aggergatedDeliveryQntyObj[ symbol ]['deliverable_quantity'] / Number(selectedAvgDays) ) ).toFixed(2)
		var averageDeliveryPercentage = (  symbolObj['deliverable_percentage'] / ( aggergatedDeliveryQntyObj[ symbol ]['deliverable_percentage'] / Number(selectedAvgDays) ) ).toFixed(2)
		
		aggergatedDeliveryQntyObj[ symbol ] = {
			"averageDeliveryQuantity":averageDeliveryQuantity,
			"averageDeliveryPercentage":averageDeliveryPercentage,
		}
		}
	}
	
  try {
   
          // Attempt to update localStorage and handle quota exceeded error (Starts Here)
          var maxAttempts = Object.keys(firebaseFetchedDocs).length;
          var currentAttempt = 0;

          while (currentAttempt < maxAttempts) {
            try {
               //localStorage.setItem('sectorStockNames', JSON.stringify( {[collectionPath]:sectorStockNamesObj} ));
               //localStorage.setItem('calculatedEODDeliveryData', JSON.stringify( {[collectionPath]:JSON.stringify(aggergatedDeliveryQntyObj) } ));
               localStorage.setItem('calculatedEODDeliveryData', JSON.stringify( {[collectionPath]:aggergatedDeliveryQntyObj } ));
              break; // Successfully stored the new entry
            } catch (e) {
			console.log(e)
				//document.getElementById('messages').innerHTML = e;
              // Remove oldest entry
              var oldestEntryKey = Object.keys(firebaseFetchedDocs)[0];
			  //console.log("oldestEntryKey", oldestEntryKey)
              delete firebaseFetchedDocs[oldestEntryKey];
			  //console.log("firebaseFetchedDocs", firebaseFetchedDocs)
			  localStorage.setItem('firebaseFetchedDocs', JSON.stringify(firebaseFetchedDocs));
              currentAttempt++;
            }
          }
		// Attempt to update localStorage and handle quota exceeded error (Ends Here)
	
    return aggergatedDeliveryQntyObj;
  } catch (error) {
    console.log("Error getting documents: ", error);
    //return null;
    return {};
  }
  }
  
   } catch (error) {
    console.log("Error getting documents: ", error);
    //return null;
    return {};
  }
  
}

//EOD Delivery Data Functions(Ends Here)