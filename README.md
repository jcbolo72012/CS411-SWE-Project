# CS411-SWE-Project
CS411 SWE Project

<strong>App Description (Tentative)</strong>
Our web app allows a user to login through Instacart and Spoonacular to search for recipe and ingredient information  from the Spoonacular API and order selected products via Instacart. The queried recipe(s) and ingredient(s) information are displayed on the reports page and the order will be placed in no time.

<strong>Contents (Tentative)</strong>
The following user stories are updated to reflect the current project version:

UserStory1.md - Login/Logout for personalized account synced with instacart

UserStory2.md - Home Page with Search/Query for recipes

UserStory3.md - Select a recipe and modify recipe

UserStory4.md - Order from Instacart materials

UserStory5.md - Review page for corresponding recipe.

prototypeStackChoice.md - This document is for assignment 3 and descibes the frameworks we considered, and how we came to choose Django and React for the project.

Assignment3_Video.mov - This is the video for assignment 3 showing the working prototype.


<strong>Our Team</strong>
<br>
Yi, Jae Hyo <br>
Bolognino, John,C <br>
Wang, Dawei <br>
Fang, William <br>
Yue, Michael, D <br>
<br>

<strong>Running the Application</strong>
1. Create `keys.conf` in the outermost directory containing one variable, containing your spoonacular & todoist API keys in the form: 
```
SPOONACULAR_API_KEY="YOUR_API_KEY"
TODOIST_CLIENT_ID="YOUR_CLIENT_ID"
TODOIST_CLIENT_SECRET="YOUR_CLIENT_SECRET"
```

2. Run `setup.sh` to setup all libraries. (On Macs, you may need to do `chmod 755 setup.sh` to make the file runnable.)
3. Run `start.sh` to start both the frontend and backend servers.

