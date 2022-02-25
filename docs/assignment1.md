CS411 Team Project Ideas


1. Recipe Recommendation + Instacart Purchase Groceries

Description: 
A cooking web application that would allow users to find and cook recipes, make modifications, and order ingredients to their cart. Users could search for a certain recipe or get recommendations on what to cook and filter recipes based on diet, ingredients, etc. Users could then see reviews on recipes for those that are already made, and when deciding to cook, allow them to modify the recipe as they see fit and add the ingredients into a cart. Then, they could order their ingredients using Instacart and another payment system, and deliver them directly to home and start cooking. After cooking, they could write a review telling how the recipe went.

APIs
Instacart API to order ingredients https://docs.instacart.com/connect/api/  — Requires 3rd Party Authentication
Spoonacular Recipes — https://rapidapi.com/spoonacular/api/recipe-food-nutrition 
Payment system (only if needed)

Database Information
Profile information
Cart Information
Reviews
Orders

3rd Party Authentication
Using OAuth to authenticate a user’s Instacart account (and possibly another to link their payment system).

Decoupled Architecture
Frontend : JavaScript
Backend : ?


2. Personalized Music 

Description: 
A music application that would recommend personalized music playlists given a speech input. The user would be able to give an audio input to the computer/browser, and then an AI would turn it into text. Then, we would run it through IBM Watson sentiment analysis to try and find the sentiment. Finally, using that analysis we would compile a playlist using spotify music to create a customized playlist based on the user’s perceived mood.


2 Public Datasets/APIs
-  Spotify Dataset (https://www.kaggle.com/mrmorj/dataset-of-songs-in-spotify, Most definitely need to add on )
- Voice Datasets (https://github.com/jim-schwoebel/voice_datasets ) #May not be necessary
- IBM Watson AlchemyLanguage API

Database stores the following:
Personal/Account Information
audio inputs, 
corresponding texts, 
sentiments, and 
Previous recommendations

3rd Party Authentication
- Personal account on the web app and Spotify. 
- Tentative Idea: Connect with Spotify App and generate the recommended playlist on Spotify .

Decoupled Structure for the website
- Frontend (Tentative):  Python (Streamlit) or Javascript
- Backend: 

Misc - Other Analysis tools
Sentiment Analysis Tools:
* IBM Watson Sentiment Analysis.
* Lexalytics.
* Critical Mention.
* Brandwatch.
* Social Mention.
* Sentiment Analyzer.
* MAXG.
* Social Searcher.
* Rosette
