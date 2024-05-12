# React Frontend with AWS Amplify (LoanPro Frontend)

## Description

This is the frontend component of the TrueNorth TakeHome project, specifically designed for the client, LoanPro. The application is built using React. To ensure scalability and robustness, the application is deployed on AWS Amplify, a comprehensive cloud platform that enables developers to quickly and easily build secure and scalable web applications.

## Installation

To run this project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/GiulianaEOlmos/LoanPro-frontend-React.git`
2. Navigate to the project directory: `cd LoanPro-frontend-React`
3. Install the dependencies: `npm install`
4. Start the development server: `npm start`

## Usage

Once the development server is running, you can access the application in your web browser at `http://localhost:3000`. Use the provided login credentials to log in and explore the features of the application.

## Deploying with AWS Amplify

To deploy this project with AWS Amplify, follow these steps:

1. Push your code to a Git repository (GitHub, Bitbucket, GitLab, or AWS CodeCommit).
2. Log in to the AWS Management Console and open the Amplify console.
3. Click on "Connect app", then "From version control", and follow the steps to connect your repository.
4. In the "Configure build settings" step, you can specify your build commands. If you're using Create React App, the default settings should work fine.
5. After you've connected your app, click on it in the Amplify console to open the app details page.
6. Click on "Environment variables" in the left sidebar.
7. Click on "Add environment variable". For each variable in your .env file, add a new environment variable with the same name and value.
8. Click on "Save" to save your environment variables.
9. Finally, trigger a new build for your app by clicking on "Trigger build" in the left sidebar, then "Start build".

## env variables

To populate the environment variables `REACT_APP_GET_RECORDS_URL`, `REACT_APP_DELETE_RECORDS_URL`, `REACT_APP_NEW_OPERATION_URL`, and `REACT_APP_LOGIN_URL` in your .env file, you'll first need to deploy your backend.

The backend for this project is located at https://github.com/GiulianaEOlmos/LoanPro-Backend-Serverless. Detailed deployment instructions are provided in the README file of that repository.

After running `serverless deploy` as instructed, you'll see an endpoint URL in your console output. Use this URL to populate the aforementioned environment variables in your .env file for local development, as well as in the build settings on AWS Amplify for production deployment.
