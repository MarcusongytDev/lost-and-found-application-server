const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc, query, where } = require("firebase/firestore");
const { generateUniqueID } = require("../utils/utils");

const firebaseConfig = {
      apiKey: "AIzaSyD-xeDTjRMpcdjhMNBUcBqpKbEYmbr_NyU",
      authDomain: "lost-and-found-applicati-68a3c.firebaseapp.com",
      projectId: "lost-and-found-applicati-68a3c",
      storageBucket: "lost-and-found-applicati-68a3c.appspot.com",
      messagingSenderId: "27040960143",
      appId: "1:27040960143:web:b6a8d403fee4da1c7aeafa",
      measurementId: "G-ZHQP1MEN60"
    };

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore();

//--------------------------- Above is Firebase Initialisation ---------------------------//
//--------------------------------- Below are API Calls ----------------------------------//

async function getLostItems(req, res, next) {
      try {
            //specify collection to query
            const collectionRef = collection(firestoreDb, "lost-items");
            //empty finalData array
            const finalData = [];
            //query the collection
            const q = query(collectionRef);
            //docSnap is the document
            const docSnap = await getDocs(q);

            //push all data in docSnap into finalData array
            docSnap.forEach((doc) => {
                  finalData.push(doc.data());
            });
            //return the response in json format
            res.json({
                  status:"success",
                  data: finalData
            });

      } catch (error) {
            console.log(error);
      }
};

async function postLostItem(req, res, next) {
      try {
            //generate unique id for new document in lost-items collection in database
            const lostItemRefID = generateUniqueID();
            console.log(lostItemRefID);

            //populate item body to be pushed into the database
            const lostItem = req.body;
            console.log(lostItem);

            //create a document in lost-item collection and set the document body
            const document = doc(firestoreDb, "lost-items", lostItemRefID);
            let dataUpdated = await setDoc(document, lostItem);

            res.send(dataUpdated);
      } catch (error) {
            console.log(error)
            console.log("Unable to post lost item");
      }
}


module.exports = {
      getLostItems,
      postLostItem,
}