# Seesaw Assessment

## Getting Started

### Welcome to my Seesaw Automation Testing Take Home Assessment.  I hope you find it to meet and exceed your expectations.


1. First and foremost, copy and clone this repository and add it to your local machine in the directory of your choosing

2. If you do not have Node or NPM set up on your machine, you can use [the following tutorial](https://blog.teamtreehouse.com/install-node-js-npm-mac) for Mac

2. After you've added it to your local machine, run the following command to get your testing framework ready and install all of the necessary packages
```
npm install
``` 

## How To Run Your Tests

[Cypress](https://docs.cypress.io/guides/overview/why-cypress) is the testing framework that I chose for my testing. You can either run them from your command line, or if you prefer, Cypress offers a handy console that you can open up to run the tests, and utilize many built in tools for inspecting and visualizing the output of the test

To open up the Cypress Console, run: 
```
npm run cy:open
```
	
And wait for it to populate the console.  From there, you can either run each test on it's own, or run all tests available.  Though we are not testing any UI automation, one of the other great features of Cypress is that you can also choose from the selection of browsers that are currently available on your machine that are compatible.

To run a test from the command line, while you're in the "seesawAssessment" directory, run:
```
npm run cy:run
```
This will run all tests and provide output in your terminal


## Why I Chose Cypress

Cypress is a new(ish) testing framework that seems to have become the standard for many engineering teams as it provides virtually everything you'd need out of the box to get end-to-end tests going.  It comes with a handy UI console that allows you to run and view your tests in real time, and has additional features such as step-by-step viewing of your tests with visual context for each step, the ability to change which browser you are testing on the fly, open up your IDE to the code that is being used during any particular test straight from the console, and more.

Cypress has a great deal of well written documentation and a nice community for support.
