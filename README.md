# Test-Application

## **EDIT**
The current master branch stays as is. The reason is simply that my time was up. 

I created a branch called *master-after-timed-effort*, where the rest is going to be continuisly merged with the branches as I progress.

Really love Nest.js and the easy tutorial allowing me to better understand the behind the curtains hands-on.

## **EDIT END**

This is a test for me to practice creating an application within a given timeframe.

For now I decided for a Todo Application, again. This time it is a fullstack application.

These are my initial thoughts on technology being considered:

Frontend:

+ React, since I have enough experience working with it already.
+ TypeScript, because I enjoy knowing what I need for a function and can expect back in return at the very least and it tends to not blow up in face when deployed.
+ TailwindCSS, the utility classes and mobile first approach allows me to quickly iterate on the screen sizes and design. ONE caveat: 
  + The extra and the modified screen size settings didn't work well with VITE and they are still working on it.
  + SO not sure about it meshing well with Nest.js

Backend:

+ Nest.js is a backend frameworkt that is inspired by angular. Never used Nest.js before, but Angular was neat when I followed their tutorial
+ Postgres SQL in Docker, I do not have the time for the most steps required to make this work locally, a Docker image is a welcome alternative despite my RAM getting thwacked.
+ Furthermore, I have to think of tables and relationships, all things I haven't done aside of MongoDB in a long time.

## How does it go right now?

Badly, but only timewise. The moments I can spend on it and tinker away is a blast as I am learning a lot.
I think I finally understood the backend a bit better than when I followed a curriculum on the backend that was just based on node.js.
The security and lying around environment variables leave a lot to be desired, but I will deal with them in due time as they do not contain any sensible information.
For now it should be a proof of concept and just to test it.

## I know it's not production ready, but I want to test it regardless the state

+ Get yourself an api tester/design suite like postman or insomnia. Curl works too if you know how to use it.
  + the root folder has an exported collection you can import called `Todo-api.postman_collection.json` to test
+ Get docker, maybe also docker-compose
+ Get node and npm, just install node.js that is LTS or latest.
+ Get Git if you haven't already or download this as a zip file.
+ when you are inside the root folder open the terminal with two tabs or split into two subwindows enter these commands:
  + `docker-compose up` 
    + to create a container based on the docker-compose.yml in the root folder
  + `npm install` in a free terminal to install the required packages
  + `npm run jest` and wait until the project is built
  + The project is accessible via api calls over the browser or the applications that are focused on doing just that. Please refer to the connection.json.
+ Now, if you have imported the postman_collection, you should be able to create todos without a frontend:
  + Use x-www-form-urlencoded bodies, or raw.
  + To create a todo
    + `http://localhost:3000/api/todos`, creates a todo if you supply the information, title(max 15characters), description,, status, notes (optional, can be null). 
      + must be POST Method
    + `http://localhost:3000/api/todos` returns all todos
      + Must be GET method
    + `http://localhost:3000/api/todos/:id` allows updating the particular todo
      + [:id] is a placeholder for the todo with the respective Primary Key.
      +  enter the necessary information that you want to change and send it
         +  Must be PATCH method
   + `http://localhost:3000/api/todos/:id` removes the particular todo
     + [:id] is a placeholder for the todo's primary key number
       + Must be DELETE method
   + `http://localhost:3000/api/auth/register` registers a new user
     + username(not empty), password (hashed, saltlength is 16)
     + Post method
     + Please take in mind, that this is not finished yet, security might be compromised if you simply take this and don't refactor it. 
+ To see the results after calling these apis, try these steps and make sure the dev-db container we created with docker-compose is running:
  + Open a terminal
  + Enter `docker exec -it todo-api-dev-db-1 bash`
    + You will be getting something like this in return:
      + `root@f44ae9afa4c8:/#`, you are in the terminal of the image now
  + Enter `psql -U postgres nest`
    + -U stands for username, which is postgres here
    + nest afterwards is for the database in postgres
      + `nest=#` should be shown in your terminal prompt
  + `\dt` shows you the tables in the database
  + `select * from todos;` should return you the todos.
    + do NOT forget the `;` it signals the end of your prompt or query.
  + To leave the psql terminal, enter `exit`.
  + To leave the docker terminal, enter `exit`
    + if this doesn't wok, enter `CTRL + D`, works almost everytime.


## User stories

User stories will be added, modified, crossed out for completion:
There will be actual stories first, so I can become more concise:

Todos:
Backend:
+ Write todos -> Done
+ repeat todos -> Not yet 
+ remove todos -> Done
+ set deadlines to todos -> Not yet
+ add notes to todos -> done
+ move todos into a list -> not yet
+ move todos into another list -> not yet
+ some todos are required in multiple lists ->not yet
+ if I remove the todo, it's reference is removed from all lists. -> Not yet
+ Authentication -> WIP
+ Assign the user the todos or lists of todos -> Not yet
+ Get to the frontend -> WIP


## List of problems I enountered:

The usual problem of thinking how easy a project can be, but forget that it might contain very new, somewhat foreign concepts to you.

I was currently going through a video tutorial for a crud app, which I would and extend, deviate from it for my own needs. As time went on, I realized that I needed a more basic approach as I got overwhelmed by the sheer information I got from it.

Tried to stay on it, repeatedly. I just didn't get it. 
I needed a more basic approach as I also read the docs as time permitted.

Then I found a tutorial that was divided by several parts and a much smaller scope that made me decide to use it as a learning experience to the backend and template as I tried to do things a bit differently by using a docker container for a sql database and small changes I'd like to see as foundation as I get more knowledgable.

## thoughts while learning the previous Tutorial(s):

+ what are the difference between typeorm and prisma? (hour 1)
+ i read into the typeorm docs and decided to use them to create and then place the entity and models into the same folder that share the names. Prisma seems easier to work with.
+ I have after a while realized that nest.js has some extra changes implented that work just better for this framework's goals. Decided to read more on the nest.js SQL (TypeORM) tutorial.
+ I wrote the entity models, like suggested in the typeorm tutorial, but it might not be needed?!
+ restart computer due to docker probably not working as intended
+ While trying to reconnect the postgres server to the tutorial projct, I had issues with it working because of the setup that I applied without a basic PRACTICAL knowledge.
  + port was set to 5432, but it was set up as 5432:5434. Open port for psql on 5432 and get information out from 5432 of the docker image?
  + the other settings were not secure at all. For the sake of just learning, I will go along with it and then create an .env file for it or a constants.ts file. Both are to be ignored for git.
+ After putting the correct information in, it seems to work. But I want to verify it did. If I understood the docs correctly, it already created tables and columns based on the entities.
  + I verified that nothing worked. In fact, due to not using git to version and committing each change, I was unable to reset it to a point I could enjoyably turned back the time.
  + Relented and used nest g resource [name]. Itt still didn't synchronize.
    + Went ahead and joined the nest discord server and after some hours of trying to fix it, I finally crystalized what my problem really is and lo and behold:https://github.com/typeorm/typeorm/issues/9004 their glob doesn't work on windows with newer versions. Greaaaaat teethpulling haha.
      + Whatever, just use the entities themselves. I am done being fancy schmancy. All this sophistication just lead to me trying to solve a problem that held back progress.
+ Added the auth back after finally getting this entites to work. I really like it tho.
+ got introduced formally to the barrel(?) return experience. Like it.
+ The Api call doesn't work as I expected. No return of the information I give the body. Need to accept that so I can go fuirther
+ Got introdued to pipes to validate the incoming information and it seems to work
+ I am trying to work on the validation problem and now I realized that I tried to use queries to check the body. Let this be a lesson for  me
+ I also am met with errors connecting the docker instance, when using it sometimes. I don't know about the why and how, but this will be VERY difficult to deal with when you go from development to production and need to considerably change the database already filled with sensible required data.
+ Had some problem with finding the right method to select by the id. StackOverflow suggested me to try FindOneBy instead of findOne
  + (method) `Repository<TodoEntity>.findOneBy(where: FindOptionsWhere<TodoEntity> | FindOptionsWhere<TodoEntity>[]): Promise<TodoEntity>`
  + (method) `Repository<TodoEntity>.findOne(options: FindOneOptions<TodoEntity>): Promise<TodoEntity>`
+ Date is not an optionional value in Postgres so far. Had to make the date non-optional. Probably better this way
+ I am verifying these api calls so far with postman api. Testing the outcome at least.
+ Started creating the user folder and auth folder. It is definitely different from just creating new tables and the general crud work with todos
+ Got introduced to making my own pipes that are being used when I pass ValidationPipe to the body of my post method in auth.
  + I like it, but you just can't get there probably on planning alone.
+ The instructor used bcrypt, but that's not safe enough for me. I read into the documents and realized that argon2 might be better.
+ Salt rounds are 16 as default and comes with its own salt, perfect.
  + I just found out that the code was NOT as secure as I assumed. WAS
+ I need to understand what salting means
  + got it:
    + Hashing is basically using an algorithm to turn the password into unintelligble gibberish
    + Salting it means, that you add a string off a certain weight (here 16 bytes) to make it even more intelligble
    + The latter allows for different users to have the same password, but returning a different, unique hash referencing to each user.
    + Still not a good idea. Maybe make it so, that users have to use at least 8 characters or ten, instead of my trivial idea of limiting the use of the same password to make sure everyone has a different password and give hackers ideas what password to test. And maybe increase the salt to 24 because I am paranoid.
  + Argon2 allows me to make easier choices on verifying and hashing code, so I can remove the column salted that was introduced in the tutoria. Very nifty.
+ Had a problem with the pipe and resolved it by accessing the value array. This is not good at all, but I don't understand the concept fully yet either....
+ I.... didn't commit the code correctly.... that's a bummer.
  + I will "finish" this part of the application, push it and then try to continue working on it more meticulously.

