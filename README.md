# Web-Dev-Final-Project
This is a project that Emmerson Smith and I came up with in Web Development. This is a full stack website that will be used to allow students to post reviews about their teammates to their professor and their revised comments will then go to their teammates.

**Branch Structure**

We will follow a structured Git workflow to ensure smooth collaboration and a clean, organized repository. Our main branches:

*1. main (Stable Production Code)*
This branch contains the most stable version of our project.
Only fully tested and reviewed code should be merged here.
No one works directly on main, changes are made in other branches first.

*2. development (dev) (Active Development)*
This is the main working branch where we integrate features before pushing them to production.
All new features and bug fixes should be merged here before they go into main.
Regularly sync this branch with main to stay updated.
To merge features you can...
git checkout development
git merge feature-"branch-name" ---- merge the new feature into the dev branch.
git push origin development ---- only do this if everything is working fine.

*3. feature-branch (Feature Development)*
Each new feature gets its own branch, named descriptively:
feature-login-page
feature-user-auth
These branches are created from development and merged back when the feature is complete.
Once merged, the branch can be deleted to keep the repo clean.
To create a feature branch do...
git checkout -b feature-"branch-name"
git commits if any were created. git commit -m "added feature" ---- We only need to do this if we have added code.
git push origin feature-"branch-name" ---- this will create a feature branch


Keeping the repo updated **sync you local repo**
git checkout main
git pull origin main

git checkout development
git pull origin development

git checkout feature-"branch-name"
git merge development
git push origin feature-"branch-name"

**Handling Conflicts**
git status
nano filename.html
git add filename.html
git commit -m "Resolved merge conflict"
git push origin "branch"


