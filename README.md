# finalprojectf22-momentie
## Motivation
With the emergence of an overwhelming number of new tools and techniques, as well as the frequent changes in Internet companies, the most common problem that undergraduates have to face is how to make themselves more competitive in the job market, so that they can get their desired job offers. Not only the undergraduates but also those who are pursuing other programs, and people who want to transition to other careers. With all of this, we’ve come up with a product, Momentie (the pronunciation of the word is quite similar to the Cantonese word, 冇问题, which means “don’t worry, it is ok, we’ve got you”), that can help people who are struggling in seeking jobs, transitioning to other jobs. Momentie aims to provide a platform for industry elites to give detailed descriptions and timelines on their progression and people seeking help can easily navigate to topics they are interested in. We want to centralize the scattered career advice/tutorial information around the web into Momentie, which will allow people in the future to have guidance and make their career life easier and stress-free.


## Installation
1. Install [Node.js v18.9.0 (npm 8.15.0)](https://nodejs.org/en/download/current/) or at least Node >= v16.13.0 and NPM => 8.15 

2. Install required dependencies :
   ```powershell
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Start backend (runs on port 5000)
   ```powershell
   cd backend
   
   # production environment
   npm run build
   npm run start 

   # development environment
   npm run build
   npm run dev
   
   ```
4. Start frontend (runs on port 3000)

   ```
   cd frontend
   
   npm run start
   ```

## Contribution
### Do you use gitflow?

Yes.
the master branch contains official/released source code. **DO NOT** direct push to this branch. This is the release branch and the commits of this branch will only come from merging from develop branch or reverting.

develop branch contains developing features && patches. It will be merged into the master once it is tested thoroughly. Develop: **DO NOT** direct push to this branch. This is the development branch and the commits of this branch will only come from merging or reverts of feature branches.

individual feature/bugfix branch contains an exclusive developing feature/bug fix. It will be merged into development once it is done and thoroughly tested. 

### What do you name your branches?
Feature Branches:
- Features:
	- Branch name should follow frontend/backend/[Any other focus]-sprintN-[description]-[Trello ID]. An example would be: “frontend-sprint1-add-profile-picture-MOM-121”
	- Should be branched from develop
- Bug Fixes:<br>
	- Branch name should follow bugfix-frontend/backend/[Any other focus]-sprintN-[description]-[Trello ID]. An example would be "bugfix-backend-sprint2-http-request-blocked-JIRA3001"
	- Should be branched from develop
- Feature branch of feature branches: If you are not the only one working on this branch, communicate with your partners.

## Trello Board Integration
### Boards
- Card Templates: Standards on creating a card
- SprintN Backlog: Contains all User Stories for this sprint
- SprintN-1 Retrospective Tasks: Contains the retrospective tasks from previous sprints
- Story Backlog: All User stories that are not mapped to a sprint
- SprintN Frontend: Tasks for the frontend team in SprintN
- SprintN Backend: Tasks for the frontend team in SprintN
- In Progress: Tasks that have started
- Code Review: Tasks that opened a Pull Request waiting for review
- Done SprintN: The tasks/stories finished during the sprint

### Practices
1. Stories are assigned a story point, a priority, a label of Story Value and a Label for being a user story. Should be parent to the tasks that belong to it. There should be a CoS and a Checklist detail for the CoS.
2. Task are assigned a priority and a label of task. Title follows Templates in Card Templates. Each card should have one member associated. The description should have a brief CoS that matches the one on Github Pull Request. Should be child of the user stories it belong.
3. Tasks should have clear dependency on which ones are blocking which.
4. After Tasks are in progress, Add the github branch into the task.
5. When the task is ready for review, Add the PR into the task
6. Reviewer is the one responsible for moving the card from Code Review to Done.


### Do you use Github issues or another ticketing website?
We also use Trello for tracking the progress.

### Do you use pull requests?
Pull Request Format(subject to change):
	
- Title: [Trello ID]-Few words description, try using past tense.
- Comment:
	- Description on the change in detail
	- Checklist/Metric of success/Testbale for the code reviewer 

**DO NOT** merge the changes on PR by yourself.
Pull requests should be reviewed by Shaopeng Lin or Yawen Zhang, who will be responsible to do a sanity check on code quality and whether the changes are working. They will either approve and merge the branch or request a change if things are incorrect. If you request a change, provide the needed fixes and re-request review.
