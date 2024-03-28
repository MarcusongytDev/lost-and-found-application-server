const { uploadData, getData, getFilteredData, getLostItemsData } = require("../FirebaseServices/FirebaseService");

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

  
              return "Hello Get";
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