## Answers

1. How long did you spend on your solution? 
    > 4 hours
2. How do you build and run your solution? 
    > /server/Nova.Fori.API
    >    - `dotnet run --launch-profile https`
    
    > /client
    >    - `npm run start`
3. What technical and functional assumptions did you make when implementing 
your solution? 
    > I created a single to-do list for each user. I used Bogus.Faker for test data. 

4. Briefly explain your technical design and why do you think is the best 
approach to this problem.
    > I used a memory cache to ensure data integrity on the API side and removed the use of a 
    > response cache. Thus, I was able to update the data in the cache within the session and 
    > list it correctly.

5. If you were unable to complete any user stories, outline why and how would 
you have liked to implement them.
    > I completed all user stories.