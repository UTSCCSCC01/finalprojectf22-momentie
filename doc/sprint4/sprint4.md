# Sprint 4
## Goal

 - Finish sprint 4 tasks

System Design

 - CRC cards

 - Software Architecture Diagram

Documentation:

 - Frontend documentation

 - Backend documentation

Complete User Stories assigned to Sprint 4

## User Stories to be Completed, and Task BreakDown

Key Terms to Note

 - database refers to (MongoDB)

 - frontend refers to (React, HTML, CSS)

 - backend refers to (Node, Express)

 - REST API would be done using (Node, Express, Mongoose)



Refer to Trello Board for the User Story ID

MOM-5: As a general user, I want to delete my posts, so that I can feel my posts is under my control.

Story Points: 5

 - Frontend

 -  - Implement delete functionality on each post element.

 - Backend

   - Receive ‘DELETE’ requests on URL /post/id/:postId from the frontend

   - Delete the post with the id specified by the 'postId' parameter from the database.

   - Finally, send 200 on success and 500 if the internal error occurs.

 - Testing

   - Manual Testing on webpage

MOM-10: As a general user, I should be able to view the popular topics discussed in the website, so that I can pick the ones I am interested in.

Story Points: 8

 - Frontend

   - Show post by popular user on home page

   - Show the popular tags added by user on the home page

 - Backend

   - Receive THREE HTTP requests from the frontend:

     - ‘GET’ requests on URL /tag/top from the frontend.

         - Return the top 10 popular tags (those are used most by users) to the frontend.

         - Finally, send 200 on success and 500 if the internal error occurs.

     - 'GET' requests on URL /profile?popularity=true from the frontend.

         - Return the top 5 popular users' profiles to the frontend.

         - Finally, send 200 on success and 500 if the internal error occurs.

     - 'GET' requests on URL /post/user/:username from the frontend.

         - Return one post from each of the top 5 popular users to the frontend.

         - Finally, send 200 on success and 500 if the internal error occurs.

   - Finally, send 200 on success and 500 if the internal error occurs.

 - Testing

   - Manual Testing on webpage

MOM-132: As Lora (a Headhunter) or Jialin Shang (a career seeker) , I want to search for a specific user, so that I can find a profile accuratly.

Story Points: 13

 - Frontend

   - Users can use a search bar to query users with an email or a username from the backend

   - The result is displayed and the user can navigate to the queried users

 - Backend

   - Receive ‘GET’ requests on URL /account/name/:username from the frontend.

   - Return a list of user profiles whose username contains the substring specified by the ‘username’ parameter, sorted by their like value.

   - Finally, send 200 on success and 500 if the internal error occurs.

 - Testing

   - Manual Testing on webpage

   - Postman backend

MOM-131: As Jialin Shang (a career seeker), I should be able to search by multiple tags, so that I can understand how someone gained such experiences.

Story Points: 13

 - Frontend

   - Users can use a search bar to query users with tags that match any in a list of tags from the backend

   - The result is displayed and the user can navigate to the queried users

 - Backend

   - Receive ‘GET’ requests on URL /profile from the frontend.

   - Return a list of user profiles having those tags specified by the ‘tag’ parameter in the payload/body, sorted by their like value.

   - Finally, send 200 on success and 500 if the internal error occurs.

 - Testing

   - Manual testing on webpage

MOM-130: As Jialin Shang (a career seeker), I should be able to search for a career by skill/experience, so that I can be aware of different career routes with my current skill set.

Story Points: 13

 - Frontend

   - Users can use a search bar to query users with experiences or skills that match any in a list of experiences or skills from the backend

   - The result is displayed and the user can navigate to the queried users

 - Backend

   - Receive ‘GET’ requests on URL /account/skill?title from the frontend.

   - Return a list of user profiles having those experiences specified by the ‘title’ parameter, sorted by their like value.

   - Finally, send 200 on success, 404 if the parameter is not provided, and 500 if the internal error occurs.

 - Testing

   - Postman backend

   - Manual testing on webpage

MOM-95: As a general user, I should be able to upload my profile picture so that other users can recognise me better.

Story Points: 13

 - Frontend

   - display the image that user uploads

   - Works with edit’s done and cancel.

 - Backend

   - Receive ‘POST’ requests on URL /profile/upload from the frontend (VIEW).

   - Store the picture data in the database and make it referenced by the user who uploaded it.

   - Finally, send 200 on success, 400 if the picture is not provided, and 500 if the internal error occurs.

 - Testing

   - Postman backend

   - Manual testing on webpage

Team Capacity

TOTAL STORY POINTS: 65

## Details About Tasks Per Member

All

 - Everyone is assigned a particular position from <frontend, controller, backend>. We think frontend would take more time and effort to complete than the backend, so everybody might switch to full-stack during the last few days of the sprint.

 - At least one task done by each member.

See Trello board for more detail about tasks assigned.



## Team Capacity:

As expected from previous sprints, velocity around 60 points is a health amount that the team can do. We do not need to make any change yet.

## Blockers / Spikes

Learning Curve: learning new language (javascript, typescript, nodejs, expressjs, html, css, react) for necessary tasks. 

Time: time is limited. Most of the members have 5+ courses with assignments.

Collaboration: Some group members are working with each other for the same time. Frictions can happen and need to be resolved.

**Participants **

ALL team members (Shaopeng Lin, Xu Zheng, Haoming Hu, Xuen Shen, Yawen Zhang, Yuhan Pan, Jerry Han)  were present for this meeting and have individually contributed to the above goals/plans sufficiently.
