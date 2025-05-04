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
                    sh '''
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm install ${NODE_VERSION}
                        nvm use ${NODE_VERSION}
                        node --version
                        npm --version
                    '''
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        npm install
                    '''
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh '''
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
                        nvm use ${NODE_VERSION}
                        npm run build
                    '''
                }
            }
        }

        // stage('Test') {
        //     steps {
        //         script {
        //             sh '''
        //                 export NVM_DIR="$HOME/.nvm"
        //                 [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
        //                 nvm use ${NODE_VERSION}
        //                 npm test
        //             '''
        //         }
        //     }
        // }

        stage('Deploy') {
            when {
                branch 'develop'
            }
            steps {
                script {
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
            cleanWs()
        }
    }
}
