const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc, query, where } = require("firebase/firestore");

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

async function getLostItems(req, res, next) {
      try {
            const collectionRef = collection(firestoreDb, "lost-items");
            const finalData = [];
            const q = query(collectionRef);

            const docSnap = await getDocs(q);

            docSnap.forEach((doc) => {
                  finalData.push(doc.data());
            });
            res.json({
                  status:"success",
                  data: finalData
            });
            //return finalData
      } catch (error) {
            console.log(error);
      }
};

async function postLostItem(req, res, next) {
      try {
            const body = req.body;
            console.log(body.category);
            res.send("Successful");


            const collectionRef = collection(firestoreDb, "lost-items");

      } catch (error) {
            console.log(error);
      }
}

// const uploadLostItem = async (data) => {
//       console.log(data);
//       const dataToUpload = data;
//       try {
//             const document = doc(firestoreDb, "lost-items", Date.now().toString(36) + Math.random().toString(36).slice(2));
//             let dataUpdated = await setDoc(document, dataToUpload);
//             return dataUpdated;
//       } catch (error) {
//             console.log(error);
//       }
// };



module.exports = {
      getLostItems,
      postLostItem,
}