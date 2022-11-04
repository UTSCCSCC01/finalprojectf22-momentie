# Sprint 2
## Goal
 - Finish sprint 3 tasks

System Design
 - Update CRC cards
 - Update Software Architecture Diagram
Documentation:
 - Update Frontend documentation
 - Update Backend documentation

Complete User Stories assigned to Sprint 3

## User Stories to be Completed, and Task BreakDown

Refer to Trello Board for the User Story ID

#### MOM-8: As Lora (a Headhunter) or Jialin Shang (a career seeker), I should be able to visit other’s profiles, so that I can better understand other people’s past experiences.
Story Points: 5
  - Frontend
    - Add route parameter to profile page allowing navigation.
    - Disable edit when on other people’s profile
  - Testing
    - Manual Testing on webpage 

#### MOM-44: As a general user, I should be able to rate a profile by quality, so that other people can avoid the bad ones and identify the good ones.
Story Points: 3
  - Frontend
    - Rating enabled on other people’s profile but not on yourself.
  - Testing
    - Manual Testing on webpage

#### MOM-4: As Steph Delly (a career expert), I want to make new posts, so that I can share my thoughts and experiences that otherwise cannot easily fit into my profile.
Story Points: 13
  - Frontend
    - Create post component
    - Create section on profile to display posts
    - Allow user to add post on their own profile.
  - Backend
    - Receive ‘POST’ request on URL /post from the frontend (View).
    - Create a post object in the database. And send the newly created data back to the frontend (View), wrapped in JSON.
    - Signal 200 on success, 4xx on failure.
  - Testing
    - Manual Testing on webpage
    - Postman backend

#### MOM-14: As Steph Delly (a career expert), I should be able to provide great detail on my timelines, so that viewers can see the mistakes I made, advice I would want to give, etc.
Story Points: 13
  - Frontend
    - Create a company name, a location, and a position type field on the experience timeline.
    - Use JSON to store the new fields in content.
  - Testing
    - Manual testing on webpage

#### MOM-70: As a general user, I want to have a home page where I can have a search bar and recommended products.
Story Points: 8
  - Frontend
    - Create a homepage draft
    - Let home icon be able to navigate between profile and home
  - Backend
    - Return the most popular 10 tags back to the frontend(View).
    - Receive ‘PATCH’ request on URL /tag/top from the frontend (View).
    - Send the most popular 10 tags data back to the frontend (view), wrapped in JSON.
    - Finally, send 200 signal back to the frontend (View) on success. Otherwise, send 500 signal on internal internet error.
  - Testing
    - Postman backend
    - Manual testing on webpage

MOM-38: Sprint2 Retrospective Points: 8

Team Capacity
TOTAL STORY POINTS: 52 Next sprint, refer to burndown for changes in capacity/velocity.

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
