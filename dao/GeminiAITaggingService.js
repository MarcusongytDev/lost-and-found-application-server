const { GoogleGenerativeAI } = require("@google/generative-ai");
const { dir, error } = require("console");
require("dotenv").config();
const { promises } = require("fs");
const { path } = require("path");
const internal = require("stream");

const fs = promises;
const dirPath = "tempImageFileHolder";
const fileName = "image.jpg";

// Configuration
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const generationConfig = { temperature: 0.9, topP: 1, topK: 1, maxOutputTokens: 4096 };

// Initialise Model
const model = genAI.getGenerativeModel({ model: "gemini-pro-vision", generationConfig });

// Generate Content
async function generateItemTags(file, imageMimeType) {
      try {
            console.log(file);

            // //create tempImageFileHolder
            // if (!fs.existsSync(dirPath)) {
            //       fs.mkdirSync(dirPath);
            // }
            // add image to dirPath
            const internalImagePath = dirPath + "/" + fileName;
            //fs.mkdir(internalImagePath);

            fs.writeFile(internalImagePath, file.buffer, (error) => {
                  if (error) {
                        console.log(error);
                  } else {
                        console.log("Image saved successfully");
                  };
            });


            // Load Image and convert to base64
            const imagePath = internalImagePath;
            const imageData = await fs.readFile(imagePath);
            const imageBase64 = imageData.toString('base64');

            // Define Parts
            const promptConfig = [
                  { text: "Provide 8 words that describe this image, delimeted by ONLY commas. For example: bottle,plastic,green,translucent,reusable,wide-mouth,nalgene,medium-size :\n" },
                  {
                        inlineData: {
                              mimeType: imageMimeType,
                              data: imageBase64
                        }
                  },
            ];

            // Generate content using both text and image input
            const result = await model.generateContent({ contents: [{ role: "user", parts: promptConfig }] });
            const response = await result.response;

            //populate an object containing the item's tags
            const tagsArray = response.text().replaceAll(' ','').split(",");
            let itemTags = {};
            let index = 0;
            for (tag in tagsArray) {
                  itemTags[index] = tagsArray[tag];
                  index++;
            }

            console.log(itemTags);
            return itemTags;
      } catch (error) {
            console.error('Error generating content:', error);
      }
}

module.exports = {
      generateItemTags,
};