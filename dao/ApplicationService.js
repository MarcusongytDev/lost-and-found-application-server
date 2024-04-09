const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc, query, where } = require("firebase/firestore");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { generateUniqueID } = require("../utils/utils");
const { firebaseConfig } = require("../config/config");
const multer = require("multer");

const app = initializeApp(firebaseConfig);
const firestoreDb = getFirestore();
// Initialize and get reference to cloud storage
const storage = getStorage();
// Initialize multer (multipart form handler)
const upload = multer();


//--------------------------- Above is Firebase Initialisation ---------------------------//
//--------------------------------- Below are API Calls ----------------------------------//

async function getLostItems(req, res, next) {
      try {
            //specify collection to query
            const collectionRef = collection(firestoreDb, "lost-items");
            //empty array containing all lost items in the database
            const allLostItems = [];
            //query the collection
            const q = query(collectionRef);
            //docSnap is the document
            const docSnap = await getDocs(q);

            //push all data in docSnap into finalData array
            docSnap.forEach((doc) => {
                  allLostItems.push(doc.data());
            });
            //return the response in json format
            res.json({
                  allLostItems
            });

      } catch (error) {
            console.log(error);
      }
};

async function postLostItem(req, res, next) {
      try {
            console.log(req.file);
            //generate unique id for new document in lost-items collection in database
            const lostItemRefID = generateUniqueID();
            console.log(lostItemRefID);

            let downloadURL = null;

            if (req.file != null) {
                  //create storageRef for firebase storage bucket
                  const dateTime = Date.now().toString(36);
                  const storageRef = ref(storage, `lost-items-images/${req.file.originalname + "   " + dateTime}`);

                  //create file metadata
                  const metadata = {
                        contentType: req.file.mimetype,
                  };

                  //upload photo file into firebase storage bucket
                  const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
                  downloadURL = await getDownloadURL(snapshot.ref);

                  console.log('File successfully uploaded');
            }

            //populate item body to be pushed into the database (with image url)
            const lostItem = req.body;
            lostItem["ImageURL"] = downloadURL;
            console.log(lostItem);

            //create a document in lost-item collection and set the document body
            const document = doc(firestoreDb, "lost-items", lostItemRefID);
            let dataUpdated = await setDoc(document, lostItem);

            res.send({
                  dataUpdated,
                  message: "Image uploaded to firebase storage",
                  name: req.file.originalname,
                  type: req.file.mimetype,
                  downloadURL: downloadURL,
            });
      } catch (error) {
            console.log(error)
            console.log("Unable to post lost item");
      }
}

async function postLostItemNotice(req, res, next) {
      try {
            //generate unique id for new document in lost-items collection in database
            const lostItemNoticeRefID = generateUniqueID();
            console.log(lostItemNoticeRefID);

            //populate item body to be pushed into the database
            const lostItemNotice = req.body;
            console.log(lostItemNotice);

            //create a document in lost-item collection and set the document body
            const document = doc(firestoreDb, "lost-item-notices", lostItemNoticeRefID);
            let dataUpdated = await setDoc(document, lostItemNotice);

            res.send(dataUpdated);
      } catch (error) {
            console.log(error)
            console.log("Unable to post lost item notice");
      }
}


module.exports = {
      getLostItems,
      postLostItem,
      postLostItemNotice,
}