const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, doc, setDoc, query, where } = require("firebase/firestore");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const { generateUniqueID } = require("../utils/utils");
const { firebaseConfig } = require("../config/config");
const multer = require("multer");
const { generateItemTags } = require("./GeminiAITaggingService");
const { sendEmail } = require("./MailingService");


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

async function getLostItemNotices() {
      try {
            const collectionRef = collection(firestoreDb, "lost-item-notices");
            const allLostItemNotices = [];
            const q = query(collectionRef);
            const docSnap = await getDocs(q);

            docSnap.forEach((doc) => {
                  allLostItemNotices.push(doc.data());
            });

            return allLostItemNotices;
      } catch (error) {
            console.log(error);
      }
};

async function checkForMatch(allLostItemNotices, lostItem) {

      //array of notices that match the lostItem's tags
      let matchedNotices = [];

      try {
            //for all lost item notice in allLostItemNotices array
            for (notice in allLostItemNotices) {
                  //console.log(allLostItemNotices[notice]);
                  //set a match count as 0
                  let matchCount = 0;
                  // for each itemFilter tag in the lost item notice
                  for (noticeTag in allLostItemNotices[notice].itemFilters) {
                        // for each itemFilter tag in the posted lost item
                        for (itemTag in lostItem.itemFilters) {
                              //console.log(allLostItemNotices[notice].itemFilters[noticeTag]);
                              // increment the matchCount by1 if the item tag is matched
                              if (lostItem.itemFilters[itemTag] == allLostItemNotices[notice].itemFilters[noticeTag]) {
                                    matchCount++;
                              }
                        }
                  }
                  // if the matched tags are more than or equal to 4, log a match
                  if (matchCount >= 4) {
                        //console.log("Matched!");
                        matchedNotices.push(allLostItemNotices[notice]);
                  } else {
                        //console.log("No match");
                  }
            }

            return(matchedNotices);

      } catch (error) {
            console.log(error);
      }
};

async function postLostItem(req, res, next) {
      try {
            //console.log(req.file);
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

            // try to use Gemini's AI to tag image item
            try {
                  // Get Gemini's AI generated tags for the item asynchronusly before appending to lostItem
                  let GeminiItemTags = await generateItemTags(req.file, req.file.mimetype);
                  console.log(GeminiItemTags);

                  // Add Gemini's AI generated tags to the lostItem as a property
                  lostItem.itemFilters = GeminiItemTags;
                  console.log(lostItem);
            } catch (error) {
                  console.log("Gemini unable to generate filters.");
                  console.log(error);
            }

            //create a document in lost-item collection and set the document body
            const document = doc(firestoreDb, "lost-items", lostItemRefID);
            let dataUpdated = await setDoc(document, lostItem);


            // lost item notice matching
            const lostItemNotices = await getLostItemNotices();
            const matchedNotices = await checkForMatch(lostItemNotices, lostItem);
            // console.log(matchedNotices);

            // Send Email to all matched notices
            await sendEmail(lostItem, matchedNotices, req.file);

            res.send({
                  dataUpdated,
                  message: "LostItem uploaded to firebase database, Image uploaded to firebase storage",
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
            console.log(error);
            console.log("Unable to post lost item notice");
      }
}


module.exports = {
      getLostItems,
      postLostItem,
      postLostItemNotice,
}