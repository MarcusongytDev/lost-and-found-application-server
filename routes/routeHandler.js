const { uploadData, getData, getFilteredData, getLostItemsData, uploadLostItem } = require("../FirebaseServices/FirebaseService");
//Test dummy data, DELETE when real data from frontend
const { dummyLostItem } = require("./dummyData");

// handler routes all API calls from app.js to the required function call
async function handler(req, method) {
      try {
          if (method === "GET") {

              const path = req.path;

              if (path === "/test-upload") {
                  await uploadData();
                  return "Success";
              }

              if (path === "/test-get") {
                  const data =  await getData();
                  console.log(data);
                  return JSON.stringify(data);
              }

              if (path === "/test-filtered-get") {
                  console.log(getFilteredData);
                  const data =  await getFilteredData();
                  console.log(data);
                  return JSON.stringify(data);
              }

              if (path === "/get-lost-items") {
                  console.log(getLostItemsData);
                  const data =  await getLostItemsData();
                  console.log(data);
                  return JSON.stringify(data);
              }

              if (path === "/upload-lost-item") {
                  console.log(uploadLostItem);
                  //console.log(dummyLostItem);
                  await uploadLostItem(dummyLostItem);
                  return "Success";
              }


              return "UNSUCCESSFUL";
          }



      //     if (method === "POST") {

      //       const path = req.path;

      //       return "Hello Post";
      //   }


      } catch (error) {
          console.log(error);
      }
};

module.exports = { handler };