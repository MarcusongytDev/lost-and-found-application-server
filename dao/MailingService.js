const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const { gmailConfig, getRGeocodeAPI } = require("../config/config");
const { promises } = require("fs");
const fs = promises;
const dirPath = "tempImageFileHolder";
const fileName = "image.jpg";


async function sendEmail(lostItem, matchedLostNotices, file) {

      // add image to dirPath
      const internalImagePath = dirPath + "/" + fileName;

      // Write file to tempImageFileHolder
      fs.writeFile(internalImagePath, file.buffer, (error) => {
            if (error) {
                  console.log(error);
            } else {
                  console.log("Image saved successfully");
            };
      });

      // Set itemLocation to named address using reverse geocoding from Google Maps' API
      let RGeocodeAPIURL = getRGeocodeAPI(lostItem["location"][1], lostItem["location"][2]);
      let itemLocation = await fetch(RGeocodeAPIURL).then((res) => {
            return res.json();
      }).then( (data) => {
            return data["results"][1]["formatted_address"];
      }).catch( (error) => {
            console.log(error);
      })

      let itemName = lostItem["name"];
      let itemDescription = lostItem["description"];

      for (notice in matchedLostNotices) {

            let losterName = matchedLostNotices[notice].name;
            let receiverEmail = matchedLostNotices[notice].email;

            // Set config as gmailconfig from configs folder and .env
            let config = gmailConfig;
            // Initialize transporter
            let transporter = nodemailer.createTransport(config);

            // Initialize Mail Generator
            let MailGenerator = new Mailgen({
                  theme: "default",
                  product : {
                        name : "Foraged",
                        link : "https://mailgen.js/",
                  }
            });

            // response is the html content used by MailGenerator
            let response = {
                  body: {
                        name : losterName,
                        intro : "We have found a potential match for your missing item!",
                        table : {
                              data : [
                                    {
                                          item : itemName,
                                          description : itemDescription,
                                          location : itemLocation,
                                    }
                              ]
                        },
                        action: {
                              instructions: 'View this item in the Foraged web application here:',
                              button: {
                              color: '#3f5a36', // Optional action button color
                              text: 'View your item',
                              link: 'https://mailgen.js/confirm?s=d9729feb74992cc3482b350163a1a010'
                              }
                        },

                        outro: "We hope you have found your item!"
                  }
            }
            // Generate the html mail content
            let mail = MailGenerator.generate(response);
            
            // Create message to be send in email
            let message = {
                  from : "foragedco@gmail.com",
                  to : receiverEmail,
                  subject : "Lost Item has been matched",
                  html : mail,
                  //Below for embedded image
                  //html : mail + '<img src="cid:image"/>',
                  attachments : [
                        {
                              filename : "itemImage.jpeg",     // File on disk as an attachment
                              path : internalImagePath,         // Path to file
                              //cid : "image"
                        }
                  ]
            }

            // Send the mail
            transporter.sendMail(message).then(() => {
                  console.log("Email has been sent");
            }).catch(error => {
                  console.log(error);
            });
      }

}

module.exports = {
      sendEmail,
};