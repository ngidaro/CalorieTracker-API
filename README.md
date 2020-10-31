# CalorieTracker-API

How to run the api:

- First download mongodb: https://www.mongodb.com/try
- Next on your local machine create a folder called "Databases"
- In the "Databases" folder, create a new folder "CalorieTracker"
- In command line (or terminal for mac) go to the "Databases" folder and type the command>    mongod --dbpath CalorieTracker
- Minimize the window (don't exit it)
- Next open your preferred IDE (mine is Visual Studio Code) and open the CalorieTracker-API project

- Side note: Go online and dowload nodejs : https://nodejs.org/en/download/
- Once thats successfully installed, go back to your CalorieTracker-API project (IDE) and in the terminal of the IDE type 
the command>    npm install

- Once that's done, in the terminal type the command>   npm run devstart
- Running this command should connect you to your local mongodb database that your previously did in command line (mongod --dbpath ...)

- Make sure a message is displayed in the IDE console saying that the API has succesfully connected to the Database.
- You can now minimize this windown (DO NOT EXIT)

- Now open your CalorieTracker project in AndroidStudio.
- Go to the VolleyRequestContainer file (CalorieTracker/app/src/main/java/com/example/calorietracker/VolleyRequestContainer.java)
- Change the IP address on line 22 to your IP address.
- To get the IP address for windows, follow this tutorial: https://www.avast.com/c-how-to-find-ip-address
- For mac, go to the wifi icon on the top bar of your screen, press "open network preferences" and the IP will be shown on the right below where it shows "status:connected".
- So on line 22 in the androidstudio project, the string should be "http://<yourIPaddress>:3333"
