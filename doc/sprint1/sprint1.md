# Sprint 1

## Goal
To Learn
 - Everyone must know the basics of:
   - React
   - JavaScript/(Potentially TypeScript)
   - HTML/CSS
   - MongoDB
   - Node/Express

Set up the MERN Stack
 - React(Frontend)
   - to export the Figma to HTML/CSS (try)
        - define the necessary components required
   - If we cannot export the Figma to HTML/CSS
        - start constructing the Frontend based on the Figma
 - MongoDB (Backend)
   - Discuss the optimum schemas for our database
   - (Controller Team) Build a boilerplate for our REST API using Node and Express

System Design
 - CRC cards
 - Software Architecture Diagram

Documentation:
 - Frontend documentation
 - Backend documentation

Complete User Stories assigned to Sprint 1

## User Stories to be Completed, and Task BreakDown
Key Terms to Note</br>
database refers to (MongoDB)</br>
frontend refers to (React, HTML, CSS)</br>
backend refers to (Node, Express)</br>
REST API would be done using (Node, Express, Mongoose)</br>

Refer to Jira Board for the User Story ID</br>

**MOM-4: As a general user, I want to sign in, so that I can have my own profile and playground. (Basic Expectation)**
</br>Story Points: 3
 - Frontend
   - Make a form so that the user can enter their credentials to sign in
   - Make sure the user input is valid
        - email address is correctly formatted
        - password is strong enough
   - Load the profile page if the user logged in successfully
 - Backend
   - Receive ‘POST’ requests on URL account/login from the frontend (View) and retrieve email and password from the requests.
   - Authenticate users’ identity using passportjs
        - emails are unique
   - Notify the frontend that users are authenticated.
   - Finally, send 200 signal back to the frontend (View) on success. Otherwise, send 401 signal on failure.
 - Testing
   - Postman
   - Manual Testing on webpage

**MOM-5:As Steph Delly (a career expert) or Jialin Shang (a career seeker), I want to have a basic profile page with an about/description section, so that I can give people a brief overview of my career(education/career experience) (Basic Expectation)**
</br>Story Points: 8
 - Frontend
   - Make a page so that the use can view their profile in detail
 - Backend
   - Receive ‘GET’ request on URL /profile from the frontend (View), retrieve email from parameters of the requests.
   - Send user profile data based on email parameter back to frontend (view) wrapped in json.
   - Finally, send 200 signal back to the frontend (View) on success. Otherwise, send 501 signal on failure.
 - Testing
   - Manual Testing on webpage
   - Postman backend

**MOM-3: As a general user, I want to create an account, so that I can get access to more services provided by the website. (Basic Expectation)**
</br>Story Points: 8
 - Frontend
   - Make a form so that the user can enter their credentials to register
   - Make sure the user input is valid
   - Load the login page if the user register successfully
   - Alert user if the username already exist
 - Backend
   - Receive ‘PUT’ request on URL account/signup from the frontend (View), retrieve email and password parameters from the requests.
   - Create such an user data based on the parameters and store them into the database.
   - Finally, send 200 signal back to the frontend (View) on success.
   - Send 401 signal if user does not fill in required fields.
   - Send 409 signal if register failed.
 - Testing
   - Manual Testing on webpage
   - Postman backend

**MOM-24: As a general user, I want to sign out, so that I can switch an account. (Basic Expectation)**
</br>Story Points: 2
 - Frontend
   - User can click the logout button to switch account
 - Backend
   - Receive ‘POST’ requests on URL account/logout from the frontend  (View), close the session and complete logout.
   - Send code 200 back to the frontend (View) on success.
   - Send code 409 on failure
 - Testing
   - Postman backend
   - Manual testing on webpage

**Team Capacity**
 - TOTAL STORY POINTS: 21

## Details About Tasks Per Member
All
 - Everyone is assigned a particular position from <frontend, controller, backend>. We think frontend would take more time and effort to complete than the backend, so everybody might switch to full-stack during the last few days of the sprint.
 - At least one task done by each member.
See Jira board for more detail about tasks assigned.

## Team Capacity:
We will take a guess of 60 hours.  We will use this sprint and JIRA to identify an estimated capacity.

## Blockers / Spikes
Learning Curve: learning new language (javascript, typescript, nodejs, expressjs, html, css, react) for necessary tasks. 
</br>Time: time is limited. Most of the members have 5+ courses with assignments.
</br>Collaboration: Some group members are working with each other for the same time. Frictions can happen and need to be resolved.
## Participants
ALL team members (Shaopeng Lin, Xu Zheng, Haoming Hu, Xuen Shen, Yawen Zhang, Yuhan Pan, Jerry Han)  were present for this meeting and have individually contributed to the above goals/plans sufficiently.
 

