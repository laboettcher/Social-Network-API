# NoSQL Social Network API
![Github license](https://img.shields.io/badge/license-MIT-blue.svg)

## Description

This challenge was to build an API for a social network app where users can add friends, create and share "thoughts," and react to their friends’ thoughts.

## Tabe of Contents

* [User Story](#user-story)

* [Acceptance Criteria](#acceptance-criteria)

* [Installation](#installation)

* [Usage](#usage)

* [Mock-Up](#mock-up)

* [Walkthrough Video](#walkthrough-video)

* [License](#license)

* [References](#references)

## User Story

```
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation

```
npm i
npm i express
npm i mongoose
npm i dotenv
npm i node
```

## Usage

After installing the above packages, run ```npm start``` in the terminal and begin testing routes in Insomnia.

## Mock-Up

![Untitled_ Mar 11, 2023 9_32 PM](https://user-images.githubusercontent.com/114205917/224526756-aa4de692-dc34-4162-b6b5-7a43d881caa8.gif)

## Walkthrough Video

The full walkthrough can be viewed [here](https://drive.google.com/file/d/1HPQf2p-w7ZWIJR7958BputPWgmsvToiq/view).

## License 

```
 MIT
``` 

## References

* [Code Magazine](https://www.codemag.com/Article/2107051/Test-Your-REST-APIs-Using-Insomnia-REST-Client)

* [Free Code Camp](https://www.freecodecamp.org/news/format-dates-with-ordinal-number-suffixes-javascript/)

* [MDN](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes)

* [MDN2](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
