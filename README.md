# SC2006 Team Varghes Server Side Repository

## Foraged Web Application

<div>
<img src="http://img.shields.io/badge/Javascript-fcd400?style=flat-square&logo=javascript&logoColor=black" alt="Javascript">
<img src="https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
<img src="https://img.shields.io/badge/Express.js-17202C?style=flat-square&logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=flat-square" alt="Typescript">
<img src="https://img.shields.io/badge/firebase-ffca28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase">
<img src="https://img.shields.io/badge/.ENV-ECD53F?logo=dotenv&logoColor=black&style=flat-square" alt=".env">
<img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?logo=googlegemini&logoColor=fff&style=flat-square" alt="Gemini">
<img src="https://img.shields.io/badge/Google%20Maps-4285F4?logo=googlemaps&logoColor=fff&style=flat-square" alt="GoogleMaps">
</div>

<img src="" alt="cover" style="width:600px;height:auto;">

### Team Members:

- [Marcus Ong](https://github.com/MarcusongytDev)
- [Luo Maoyuan](https://github.com/LuoMaoyuan01)
- [Xavier Tan]()
- [Rhea George]()
- [Phoebe Lee]()
- [Poh Qi Bin]()

---

## Environment Set up for Local Deployment

This server side code is developed with [Node JS](https://nodejs.org/en) and tested on [Visual Studio Code](https://code.visualstudio.com/).

**To run the application:**  
First, clone the repository into your local device, the directory should look something like this:

```
├── LOST-AND-FOUND-APPLICATION-SERVER
|   ├── config
|   ├── dao
|   ├── routes
|   ├── tempImageFileHolder
|   ├── utils
```

Initialise your `.env` file. Check `.env.example` for the environment variables required.

You will require:

- [Firebase](https://firebase.google.com/) API Key and Configs
- [Google Maps](https://developers.google.com/maps/documentation/javascript/get-api-key) API Key
- [Google Gemini](https://ai.google.dev/?gad_source=1&gclid=CjwKCAjwoPOwBhAeEiwAJuXRhy3XzNtf1ThkVI3MWBa3K789yMGHrlzUP6rowlD7Rnh_i_D5kpzx4hoC63IQAvD_BwE) API Key
- [Gmail](https://support.google.com/mail/answer/185833?hl=en) Email and App Password

Note: There are free tier for all the services listed above.

Next, set up the server, in the terminal:

```
cd lost-and-found-application-server
npm i
npm run dev
```

The following package dependencies may need to be installed:

```
npm i express
npm i cors
npm i firebase
npm i dotenv
npm i multer
npm i @google/generative-ai
npm i nodemailer
npm i mailgen
```

For developer dependencies, we recommend installing Nodemon for restarting server each save:

```
npm i nodemon
```
---

### Section 1: Introduction

Foraged is a holistic web application designed to facilitate the lost and found process. The primary goal of Foraged is to streamline the typical lost and found process actions into a seamless experience for our users, whether they are item losers or item finders.

This repository contains the server side source code for the Foraged web application. The server handles the following core functionalities: Database related operations, Image tagging using AI image recognition, Encapsulated application functions and our Automated emailing system.

---

### Section 2: Features

#### 2.1 Image tagging using Google Gemini AI Image Recognition and Generative AI

Our server automatically tags images uploaded into the system with keyword tags that are used for various functions, such as; filtering by keywords, matching of lost item notices to posted lost items and many more. This is accomplished by leveraging Google's Gemini API. Through meticulous prompt engineering and micro-training of the Gemini Pro Vision implementation, we have achieved a resultant response from Gemini that we are able to use 99% of the time to populate any image with keyword tags.

#### 2.2 Database Operations using Firebase

Our server also handles all database related operations. All database related operations such as reads and writes are performed securely in the server side.

#### 2.3 Automated Emailing System

Our server also provides an automated emailing system, which is activated whenever the AI generated image tags of a posted item matches the image tags (>50% threshold) of a placed lost item notice in the system. The server generates an email using Mailgen and sends the email to the user who's lost item notice has been matched using Nodemailer.

---

### Section 3: Software Design Principles

#### 3.1 Data Access Object (DAO) Design Pattern

We use the DAO pattern to abstract and encapsulate the details of how our data is saved, retrieved, updated, or deleted in our database, shielding the rest of the applciation from the specific database implementation. By centralizing all database-related code within dedicated DAO files, the rest of our application does not need to scatter database operations throughout the codebase. Instead, the DAO pattern provides a set of generic methods that can be applied for different operations, allowing us to use similat database access patterns across various parts of the application.

#### 3.2 High Cohesion and Loose Coupling

Our software architecture is intentionally structured to operate with distinct frontend and backend applications. This deliberate separation enables a high degree of loose coupling within our system. As a result, we have the flexibility to seamlessly transition between different frontend and backend technology stacks without incurring the significant costs associated with such changes.

#### 3.3 Single Responsibility Principle

Our server side code distinctly seperates its unique operations into seperate files to achieve Single Responsibility. For example, the responsibilities of "Image Tagging" and "Emailing" are sperated into 2 different service files, where each service file handles its sole responsibility. The method(s) in these files are then abstracted by other files during the implementation, allowing us to achieve a highly reusable and maintainable codebase.

---

_Submission: This repository is submitted to Nanyang Technological University Singapore as a project for module SC2006_

<h3 align="center">Reference</h3>

[1]: [_Gemini API Developer Documentation_](https://ai.google.dev/docs?_gl=1*16hsjp5*_up*MQ..&gclid=CjwKCAjwoPOwBhAeEiwAJuXRhwIG-NapKjJ9W1lYBclHR5rBqk2Oh0luWpzv2rekvgiEzJVCvzkCgxoCs1UQAvD_BwE)  
[2]: [_Firebase API Developer Documentation_](https://firebase.google.com/docs)  
[3]: [_Nodemailer Developer Documentation_](https://www.nodemailer.com/)  
[4]: [_Mailgen Developer Documentation_](https://www.npmjs.com/package/mailgen)  
[5]: [_Live Demo Video_](https://youtu.be/jEnTqqM4Ykk)
