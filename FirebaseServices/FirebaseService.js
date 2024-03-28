// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc, query, where } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-xeDTjRMpcdjhMNBUcBqpKbEYmbr_NyU",
  authDomain: "lost-and-found-applicati-68a3c.firebaseapp.com",
  projectId: "lost-and-found-applicati-68a3c",
  storageBucket: "lost-and-found-applicati-68a3c.appspot.com",
  messagingSenderId: "27040960143",
  appId: "1:27040960143:web:b6a8d403fee4da1c7aeafa",
  measurementId: "G-ZHQP1MEN60"
};


// Initialize Firebase
let app;
let firestoreDb;

const initializeFirebaseApp = () => {
      try {
            app = initializeApp(firebaseConfig);
            firestoreDb = getFirestore();
            return app;
      } catch (error) {
            console.log(error);
      }
}

//---------------------------  Above are initialization ---------------------------//
//---------------------------  Below are function calls ---------------------------//


// Template for getting all data from a collection in Firebase
const getData = async (from, to) => {
      try {
            const collectionRef = collection(firestoreDb, "test");
            const finalData = [];
            const q = query(collectionRef);

            const docSnap = await getDocs(q);

            docSnap.forEach((doc) => {
                  finalData.push(doc.data());
            });
            return finalData;
      } catch (error) {
            console.log(error);
      }
};

// Template for a filtered get from a collection in Firebase
const getFilteredData = async (from, to) => {
      try {
            const collectionRef = collection(firestoreDb, "test");
            const finalData = [];
            const q = query(
                  collectionRef,
                  where("key2", "==", 456)
            );

            const docSnap = await getDocs(q);

            docSnap.forEach((doc) => {
                  finalData.push(doc.data());
            });
            return finalData;
      } catch (error) {
            console.log(error);
      }
};

//Template for an upload dummy data to a collection in Firebase
const uploadData = async () => {
      const dataToUpload = {
            key1: "test",
            key2: 123,
            key3: new Date(),
      };
      try {
            const document = doc(firestoreDb, "test", "some-testing-unique-id");
            let dataUpdated = await setDoc(document, dataToUpload);
            return dataUpdated;
      } catch (error) {
            console.log(error);
      }
};

// Get all Lost Items from the lost-items collection in the database
const getLostItemsData = async (from, to) => {
      try {
            const collectionRef = collection(firestoreDb, "lost-items");
            const finalData = [];
            const q = query(collectionRef);

            const docSnap = await getDocs(q);

            docSnap.forEach((doc) => {
                  finalData.push(doc.data());
            });
            return finalData;
      } catch (error) {
            console.log(error);
      }
};

// Upload a lost item into the lost-item collection in the database
const uploadLostItem = async (data) => {
      console.log(data);
      const dataToUpload = data;
      try {
            const document = doc(firestoreDb, "lost-items", Date.now().toString(36) + Math.random().toString(36).slice(2));
            let dataUpdated = await setDoc(document, dataToUpload);
            return dataUpdated;
      } catch (error) {
            console.log(error);
      }
};




const getFirebaseApp = () => app;

module.exports = {
      initializeFirebaseApp,
      getFirebaseApp,
      firestoreDb,
      uploadData,
      getData,
      getFilteredData,
      getLostItemsData,
      uploadLostItem,
};