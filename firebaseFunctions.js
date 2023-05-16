  var firestoreIndexObj ={}
  // Your web app's Firebase configuration
    /*
      var firebaseConfig = {
  apiKey: "AIzaSyD8UWgohYzfdxd2VEJPEPnESv0uKn3l1jE",
  authDomain: "test-b26f9.firebaseapp.com",
  databaseURL: "https://test-b26f9-default-rtdb.firebaseio.com",
  projectId: "test-b26f9",
  storageBucket: "test-b26f9.appspot.com",
  messagingSenderId: "1038914343166",
  appId: "1:1038914343166:web:0884d3c8766712d98115af"
};
    */
    
        
    var firebaseConfig = {
  apiKey: "AIzaSyBXNKL0XqFnP-6ditzU2_Ylim_p9RaKPQ0",
  authDomain: "nse-data-saving-2023-5hf5fgdrg.firebaseapp.com",
  projectId: "nse-data-saving-2023-5hf5fgdrg",
  storageBucket: "nse-data-saving-2023-5hf5fgdrg.appspot.com",
  messagingSenderId: "299919844456",
  appId: "1:299919844456:web:1f7ca6b2574c760b6387dd"
};
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    // Get a reference to the Firestore database
    var db = firebase.firestore();
