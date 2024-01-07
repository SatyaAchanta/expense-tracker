
[Link to frontend masters course](https://frontendmasters.com/courses/fullstack-app-next-v3/)

[Link to Github Repo for this course](https://github.com/Hendrixer/fullstack-ai-nextjs)

[Link to Vector Embeddings from openai blog](https://openai.com/blog/introducing-text-and-code-embeddings)



## Technologies and Frameworks

- NextJs
- use node >= 18.17.0
- [Clerk](https://clerk.com/) - for Authentication
	- [Clerk Homepage](npm install @clerk/nextjs)
- Tailwind CSS intellisense plugin from VSCode


## Highlights

-  What are we doing ?
	- Journal App called "Mood", and using AI , it will try to determine what the mood of journal entry is.
	- App gives sentimental analysis and sum up your mood on that day using LLM
	- What my day like yesterday , week or month
- `middleware.ts`
	- Sits in the root of the app
	- This is from clerk's authentication procedure.
	- this file determines which routes can be left publicly and for open access and which routes can be secured

###  `Planet Scale`
	- serverless SQL database
	- works in serverless environments
	- We will `prisma` as ORM for `planet scale` DB
	- `pscale auth login` ~ to login into pscale DB from local
	- `pscale branch create <db_name> <branch_name>`
	- `pscale connect <db_name> <branch_name> --port 3309`
		- We need to connect to branch locally to use the DB by local app development
		- We need to stop and start this whenever connection broken to our app
### `prisma`

ORM that helps us to connect to our DB. Prisma is not a DB, instead its just a tool that lets us use functions to connect to DB we want

- `npm install @prisma/client`
- `npm install prisma --save-dev`
- `npx prisma init`

- After running above commands, we should be seeing  `prisma` :luc_folder: in our app.
- Never run migrations form prisma if you using `planet scale` (PS). PS does migrations by itself


	### Steps:
	
	- Create schema/table in `schema.prisma`
	- Push that schema to `planet scale` using `npx prisma push db`
		- this will push all the schema changes to the DB
	- Refer [prsima documentation with NextJs](https://www.prisma.io/docs/nextjs)

- Now we need to sync `clerk` user with our user in `planet scale`
- `npx prisma studio` ~ to verify whether your db changes are in prisma ORM locally
	- We still need to push the changes to `planet scale` DB




## Important points:

- any HTML events in NextJS app should be `client side` component.
	- we cannot make those events as part of server side components
	- interactivity required JS
- We **cannot** pass function as props between server components and client components because functions cannot be serialized over the internet
-  `react-autosave`
	- Useful package to auto save.
- **AI: LLM**:
	- Basic level language level model
	- GPT: Generative pre-trained transformer
	- LangChain: An API for LLMs
	- `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` - Open AI API
		- add this to your `.env.local` file
		- make sure `.env` files are added to `.gitignore`
- **ZOD**:
	- Why we use it ?
	- Learn more about ZOD later, learn about its application and usefulness in real world



## Vector Database

- Vector
	- Array of numbers between 0 and 1
	- Collection of data stores in mathematical representations


## Deployment

 - Update build command to `npx prisma generate && next build`
 - Go to clerk and switch to production mode
	 - Select `Close Development instance`
- Go to `planetscale` DB and perform below steps
	- Make sure `promote to production` is enabled under main branch -> settings icon
- Under `branches` tab -> select `dev` branch
	- On right side, add message and hit `Create Deploy Request`
	- Hit `Deploy Changes` whenever button shows up
	- Now all changes should be in `main` branch
	- Now, In `main branch`
		- Hit `Ready to connect your database`
			- Select `prisma` application
			- Give your password `<unique name>`
			- `planet scale` should be generating `UN & PW`, also `connection string`
			- copy the connection string and go to `vercel` and paste the string under Environment vars
			- Repeat the same thing with `.env` files string in your app
			- **Note**: you dont need to copy key and value separately.  Just copy whole `.env` file content and paste it in `vercel` and boom.