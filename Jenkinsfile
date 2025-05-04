pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        GITHUB_BRANCH = 'develop'
    }

    stages {
        stage('Checkout') {
            when {
                branch 'develop'
            }
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                script {
                    // Install Node.js
                    nodejs(nodeJSInstallationName: "node-${NODE_VERSION}") {
                        sh 'node --version'
                        sh 'npm --version'
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: "node-${NODE_VERSION}") {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: "node-${NODE_VERSION}") {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    nodejs(nodeJSInstallationName: "node-${NODE_VERSION}") {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    // Add your deployment steps here
                    // For example, copying files to a server or deploying to a cloud service
                    echo 'Deploying to server...'
                    // Add actual deployment commands based on your setup
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Application has been built and deployed.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for details.'
        }
        always {
            // Clean workspace after build
            cleanWs()
        }
    }
}