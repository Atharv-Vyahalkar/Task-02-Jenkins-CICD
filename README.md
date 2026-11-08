# Task 2 – Jenkins CI/CD Pipeline Using Docker

## Overview

This project demonstrates the implementation of a basic Continuous Integration and Continuous Deployment (CI/CD) pipeline using Jenkins and Docker. The pipeline automates the process of checking out source code from GitHub, installing dependencies, building a Docker image, running application tests, and deploying the application inside a Docker container.

Jenkins is configured to retrieve the project from GitHub and execute the pipeline defined in the `Jenkinsfile`.

## Objectives

- Set up Jenkins using Docker.
- Integrate Jenkins with GitHub.
- Automate application building and testing.
- Build Docker images through a Jenkins pipeline.
- Deploy the application using Docker containers.
- Configure automatic pipeline execution when code changes are pushed.

## Technologies Used

| Technology | Purpose |
|---|---|
| Jenkins | CI/CD automation |
| Docker | Containerization and deployment |
| Git & GitHub | Source code management |
| Node.js | Application runtime |
| npm | Dependency management and testing |
| PowerShell | Command-line operations |

## Project Structure

```text
Task-02-Jenkins-CICD/
│
├── jenkins/
│   └── Dockerfile
│
├── app.js
├── server.js
├── app.test.js
├── package.json
├── package-lock.json
├── Dockerfile
├── .dockerignore
├── Jenkinsfile
└── README.md
```

## CI/CD Pipeline Workflow

The Jenkins pipeline consists of the following stages:

### 1. Checkout
Retrieves the latest source code from the configured GitHub repository.

### 2. Build
Installs Node.js application dependencies and builds a Docker image.

### 3. Test
Executes application tests using npm to verify the application.

### 4. Deploy
Removes the previous application container, if present, and deploys a new container using the generated Docker image.

## Jenkins Configuration

Jenkins is deployed locally using Docker Desktop.

- Jenkins Dashboard: `http://localhost:8081`
- Jenkins Container: `jenkins`
- Jenkins Persistent Volume: `jenkins_home`
- Jenkins Agent Port: `50000`

A custom Jenkins Docker image is created with Docker CLI support to enable Docker operations from pipeline stages.

## Docker Deployment

The application is deployed using Docker with the following configuration:

- Docker Image: `task2-node-app`
- Container Name: `task2-node-app`
- Application Port: `3000`
- Host Port: `3001`

Application URL:

```text
http://localhost:3001
```

## GitHub Integration

The GitHub repository is connected to Jenkins through the Pipeline from SCM configuration.

The pipeline uses the `Jenkinsfile` stored in the root directory of the repository.

SCM polling is configured to check for code changes approximately every two minutes.

## How to Run

### Prerequisites

- Docker Desktop
- Git
- GitHub account

### Step 1: Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Task-02-Jenkins-CICD
```

### Step 2: Build the Jenkins image

```bash
docker build -t jenkins-docker ./jenkins
```

### Step 3: Start Jenkins

```bash
docker volume create jenkins_home
```

```bash
docker run -d --name jenkins --restart=on-failure --group-add 0 -p 8081:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock jenkins-docker
```

### Step 4: Configure Jenkins

Open `http://localhost:8081`, complete the initial setup, and install the required plugins.

### Step 5: Create a Pipeline Job

Create a new Jenkins Pipeline job and configure:

- Definition: Pipeline script from SCM
- SCM: Git
- Repository URL: Your GitHub repository URL
- Branch: `*/main`
- Script Path: `Jenkinsfile`

### Step 6: Execute the Pipeline

Click **Build Now** in Jenkins to execute the pipeline.

## Expected Outcome

The successful execution of the pipeline automates the following operations:

- Source code retrieval from GitHub.
- Dependency installation.
- Docker image creation.
- Application testing.
- Container deployment.

The deployed application can be accessed through `http://localhost:3001`.

## Learning Outcomes

- Understanding Jenkins and CI/CD concepts.
- Creating and configuring Jenkins pipelines.
- Integrating GitHub with Jenkins.
- Executing Docker commands through Jenkins.
- Automating application testing and deployment.
- Understanding container-based application deployment.

## Conclusion

This project demonstrates a basic CI/CD workflow using Jenkins, GitHub, and Docker. It automates the application build, testing, and deployment process, reducing manual intervention and providing practical experience with DevOps automation.

---

**Internship:** Elevate Labs DevOps Internship  
**Task:** Task 2 – Create a Simple Jenkins Pipeline for CI/CD
