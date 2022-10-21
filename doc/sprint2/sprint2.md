# Sprint 2
## Goal
 - Finish sprint2 tasks

System Design
 - Update CRC cards
 - Update Software Architecture Diagram
Documentation:
 - Update Frontend documentation
 - Update Backend documentation

## User Stories to be Completed, and Task BreakDown

Refer to Trello Board for the User Story ID

#### MOM-9: As Steph Delly (a career expert) or Jialin Shang (a career seeker), I want to edit the basic information on my profile page, so that I can update my current situation.
Story Points: 8
 - Frontend
   - Have edit button.
   - After clicking edit, done and cancel should appear.
   - Save the data and send to backend.
   - Display the new data on frontend.
 - Backend
   - Receive ‘PUT’ requests on URL from the frontend (View) and retrieve necessary data to be updated from the requests’ body.
   - Update the data in the database accordingly, and then send the newly updated data wrapped in json back to the frontend(view).
   - Finally, send 200 signal back to the frontend (View) on success. Otherwise, send 401 signal on failure.
  Testing
   - Postman
   - Manual Testing on webpage 

#### MOM-21:As Steph Delly (a career expert), I should have a timeline of my experiences, so that users can better visualize my progression.
Story Points: 21
 - Frontend
   - Use timeline component in the profile component to display the user timeline
   - Create timeline component
   - Implement edit of timelines with database
 - Backend
   - Receive ‘POST’ request on URL /timeline/create from the frontend (View) to create a new timeline node in the timeline model of the profile.
   - Send the corresponding timeline component data back to frontend (view), wrapped in json.
   - Finally, send 200 signal back to the frontend (View) on success. Otherwise, send 401 or 409 signal on failure.
 - Testing
   - Manual Testing on webpage
   - Postman backend

#### MOM-24: As Steph Delly (a career expert), I want to edit tags of myself, so that I can update my most recent situation.
Story Points: 8
 - Frontend
   - Make a form so that the user create new task	
   - Make sure the user input is valid
   - input is not null
   - make sure tag does exist
 - Backend
   - Receive ‘POST’ request on URL /tag from the frontend (View), retrieve tag data to be created from the requests’ body. Or receive ‘DELETE’ request on URL /tag from the frontend (View), retrieve tag data to be deleted from the requests’ body.
   - Update tag data of the corresponding user in the database, and send the updated data wrapped in json back to frontend(View)
   - Finally, send 200 signal back to the frontend (View) on success.
   - Send 401 signal if user does not log in.
   - Send 403 signal if user does not provide required data.
 - Testing
   - Manual Testing on webpage
   - Postman backend

#### MOM-13: As Steph Delly (a career expert), I should be able to give a development timeline to my skills, so that viewers have a clear idea on how to reach a certain level of competency.
Story Points: 21
 - Frontend
   - Use the same component to create a horizontal timeline for skills.
 - Backend
   - Receive ‘POST’ requests on URL /timeline/edit from the frontend  (View) so as to edit the component of the timeline model.
   - Revise the relevant information and send the timeline information back to the frontend (view), wrapped in json
   - Send code 200 back to the frontend (View) on success.
   - Send code 401 or 409 on failure
 - Testing
   - Postman backend
   - Manual testing on webpage

#### MOM-15: As a general user, I should be able to see my profile ratings, so that I can know how well my profile presents to others.
Story Points: 5
 - Frontend
   - Updates the profile UI, so there is an rating component that users can see their profile rating.
   - Rounding/Averaging the user rating information from database, and display the rating score of current profile and display in the profile page.
 - Backend
   - Receive ‘GET’ requests on URL /profile/like?email from the frontend  (View), retrieve the email data from the http request.
   - Send back like data with corresponding EMAIL wrapped in JSON back to the frontend(View).
   - Send code 200 back to the frontend (View) on success.
   - Send code 500 on failure
 - Testing
   - Postman backend
   - Manual testing on webpage

MOM-38: Sprint1 Retrospective

Team Capacity
TOTAL STORY POINTS: 76

#### Details About Tasks Per Member
All
 - Everyone is assigned a particular position from <frontend, controller, backend>. We think frontend would take more time and effort to complete than the backend, so everybody might switch to full-stack during the last few days of the sprint.
 - At least one task done by each member.
See trello board for more detail about tasks assigned.

## Team Capacity:
We are in a rush for this sprint so we will tryt o reduce points capacity to around 60.
## Blockers / Spikes
Learning Curve: learning new language (javascript, typescript, nodejs, expressjs, html, css, react) for necessary tasks. </br>
Time: time is limited. Most of the members have 5+ courses with assignments. </br>
Collaboration: Some group members are working with each other for the same time. Frictions can happen and need to be resolved.
## Participants
ALL team members (Shaopeng Lin, Xu Zheng, Haoming Hu, Xuen Shen, Yawen Zhang, Yuhan Pan, Jerry Han)  were present for this meeting and have individually contributed to the above goals/plans sufficiently.
