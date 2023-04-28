# PDF ChatBot 📄🤖

## Overview

This is the repo for my PDF ChatBot application, an extension of my [ArXiv ChatBot Application](https://github.com/nathanclairmonte/arxiv-bot-ui). This application extends on the ArXiv ChatBot by allowing users to upload their own PDF files to chat with. This functionality is facilitated using [Amazon S3](https://aws.amazon.com/s3/) buckets.

To be able to upload local PDFs, users must first sign in and have their account approved. At a base-level this was just to keep usage at a reasonable level and protect my Amazon credits, but it also allowed me to play around with various authentication methods for Next.js applications.

However, I've included functionality to chat with pre-existing sample PDFs for users who just want to test out the functionality of the app without signing in.

## Tech Stack

This application is powered by [Next.js](https://nextjs.org/docs) and therefore uses [React](https://react.dev/) on the frontend. On the backend, [LangChain JS](https://github.com/hwchase17/langchainjs/), [Next.js API routes](https://nextjs.org/docs/api-routes/introduction) and [Amazon S3 buckets](https://aws.amazon.com/s3/) are used to handle document loading and question answering over a document. To handle user authentication, [NextAuth.js](https://next-auth.js.org/) is used with a [MongoDB](https://www.mongodb.com/) database.

## To use this repo as a base for your own chatbot

1. Fork this repo
2. Start editing the page by modifying `src/pages/index.js`

## Resources

### Next.js

To learn more about Next.js, here are some helpful links:

-   [Next.js Documentation](https://nextjs.org/docs)
-   [Next.js Foundations Course](https://nextjs.org/learn) (provided by Next.js)

### LangChain

To learn more about LangChain JS, here are some helpful links:

-   [LangChain Website](https://langchain.com/)
-   [LangChain JS GitHub Repo](https://github.com/hwchase17/langchainjs/)
-   [LangChain JS Docs](https://js.langchain.com/docs/)
-   [LangChain Blog](https://blog.langchain.dev/langchain-chat/)

## Acknolwedgements

Thank you to Zahid Khawaja ([GitHub](https://github.com/zahidkhawaja)), whose [langchain-chat-nextjs](https://github.com/zahidkhawaja/langchain-chat-nextjs) repo was the initial inspiration for this project.

Also, thank you to James Briggs ([Youtube](https://www.youtube.com/@jamesbriggs), [GitHub](https://github.com/jamescalam)), whose LangChain videos sparked my interest in these topics and led me down this path of discovery.

Finally, thank you to Harrison Chase ([GitHub](https://github.com/hwchase17)) for creating LangChain and the incredible community around it. Both creations make building with LLMs incredibly simple and enjoyable!

## Contact Info

-   [LinkedIn](https://www.linkedin.com/in/nathanclairmonte/)
-   [Twitter](https://twitter.com/cIairmonte)
-   [Website](https://www.nathanclairmonte.dev/)
