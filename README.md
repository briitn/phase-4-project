# Phase-4-project
## Description
This is a chat app that anyone can log in and type a message that will be shown to other users. My chat app has severaal tables that all have a relationship and work together to interact with the database and make my app run. I have a users table that has many posts, which has many post_hashtags(the join table). Through this, each post can have many hashtags and each hashtag can have many posts through the join table. With these relations set up, I can get all the info i need to make my app run.

## Getting started
Before getting started i generated all the resources I needed via rails generate, then setup the tables and relationships i needed. For this app I used react js for my frontend and ruby on rails for the backend.  My frontend will need to send request to the backend and use the responses, which will be users information, posts and hashtags, and renders all of that via the react components.
Using rails to handle my backend is efficient because rails has a lot of methods designed to make interacting with databases via active record simple.

## Goals
My idea for this app was that a user creates an account and logs in with that account and can send messages that will be shown to everyone else. I want the user to stay logged in even after they refresh the page and I will handle that with rails session. I also want users to be able to add a hashtag to each posts and a page that will show every post that has a specifc hashtag added to it.

## Final product and Installation
My final product has a create account page for users to make an account, which is required to make posts. After a user creates an account and signs in succefully with that account they can then make posts. A user can also edit their username and profile picture if they want. Users can aslo add hashtags to posts which they can then click on and see all other posts with that hashtag.
To install begin by running bundle install then rails db:seed to seed the data in the seeds file. Finally, run ra server in one terminal and in another, after navigating to the react file, run npm start for the frontend server.