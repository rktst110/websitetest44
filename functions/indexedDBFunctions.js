
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


// Function to handle the logic of fetching data from the provided path and saving it
// to either IndexedDB (if available) or Web Storage (localStorage) as a fallback
async function fetchAndSaveDataIDB(path, url) {
  try {
    if (isIndexedDBSupported()) {
      if (await isDatabaseAvailable()) {
        const db = await openOrCreateDB();
        if (await isObjectStoreAvailable(db)) {
          const existingData = await checkIfPathAvailableInIDB(path, db);
          if (existingData && Object.keys(existingData).length>0 ) {
            //console.log('Data found in IndexedDB:', existingData);
			allDerivativesDataObj = existingData;
			return existingData;
          } else {
            const fetchedData = await fetchDerivativesCollectionDataOnly( path );
           //console.log('Data fetched from the URL:', fetchedData);
            await saveDataToIDB(path, fetchedData, db);
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
