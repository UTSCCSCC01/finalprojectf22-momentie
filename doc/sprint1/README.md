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
4. Start frontend (go to finalprojectf22-momentie/frontend/src/LoginPage/Login.html)

   ```
   #right click and click "Open in Default Browsers (Alt + B)
   ```

## Contribution
### Do you use gitflow?
[Github Process](https://docs.google.com/document/d/1wo8c4RdI67wcYsZ6mEC2RVEnHDcnPcPNomcEHfWH7ZQ/edit?usp=sharing)

Yes.
the master branch contains official/released source code. **DO NOT** direct push to this branch. This is the release branch and the commits of this branch will only come from merging from develop branch or reverting.

develop branch contains developing features && patches. It will be merged into the master once it is tested thoroughly. Develop: **DO NOT** direct push to this branch. This is the development branch and the commits of this branch will only come from merging or reverts of feature branches.

individual feature/bugfix branch contains an exclusive developing feature/bug fix. It will be merged into development once it is done and thoroughly tested. 

### What do you name your branches?
Feature Branches:
- Features:
	- Branch name should follow [Area of focus]-[short description]-[JIRA Issue]. An example would be: “frontend-add-profile-picture-JIRA-3000”
	- Should not be branched from main
- Bug Fixes:<br>
	- Branch name should follow bugfix [Area of focus]-[short description]-[JIRA Issue]. An example would be bugfix-backend-http-request-blocked-JIRA3001
	- Should not be branched from main
- Feature branch of feature branches: If you are not the only one working on this branch, communicate with your partners.

### Do you use Github issues or another ticketing website?
We also use Jira for tracking the progress.

### Do you use pull requests?
Pull Request Format(subject to change):
	
- Title: [JIRA Issue]: Short description, try using past tense.
- Comment:
	- Link to JIRA Issue
	- Changes: List your changes
	- Usage(Optional): Explain how to use your new change to help the team to test the change.
	- Further Information(Optional)

**DO NOT** merge the changes on PR by yourself.
Pull requests should be reviewed by Shaopeng Lin or Yawen Zhang, who will be responsible to do a sanity check on code quality and whether the changes are working. They will either approve and merge the branch or request a change if things are incorrect. If you request a change, provide the needed fixes and re-request review.
