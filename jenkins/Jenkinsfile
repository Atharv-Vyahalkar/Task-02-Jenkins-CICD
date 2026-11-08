
pipeline {
    agent any

    triggers {
        pollSCM('H/2 * * * *')
    }

    environment {
        IMAGE_NAME = 'task2-node-app'
        CONTAINER_NAME = 'task2-node-app'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Installing dependencies...'

                sh '''
                    docker run --rm \
                    --volumes-from jenkins \
                    -w "$WORKSPACE" \
                    node:20-alpine npm ci
                '''

                echo 'Building Docker image...'

                sh 'docker build -t task2-node-app:${BUILD_NUMBER} .'
            }
        }

        stage('Test') {
            steps {
                echo 'Running application tests...'

                sh '''
                    docker run --rm \
                    --volumes-from jenkins \
                    -w "$WORKSPACE" \
                    node:20-alpine npm test
                '''
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying application...'

                sh '''
                    docker rm -f task2-node-app || true

                    docker run -d \
                    --name task2-node-app \
                    -p 3001:3000 \
                    task2-node-app:${BUILD_NUMBER}
                '''
            }
        }
    }

    post {
        success {
            echo 'CI/CD Pipeline completed successfully!'
        }

        failure {
            echo 'CI/CD Pipeline failed. Check the console output.'
        }
    }
}
