pipeline {
    agent any

    environment {
        // App settings
        APP_NAME = "portfolio-frontend"
        APP_PORT = "3000"  // Next.js default port

        // Docker settings
        DOCKER_IMAGE = "portfolio-frontend"  // No username needed for local Docker
        DOCKER_TAG = "latest"

        // Node.js version
        NODE_VERSION = "20"
    }

    stages {
        // Stage 1: Install Node.js via NVM (critical fix)
        stage('Setup Node.js') {
            steps {
                script {
                    sh '''
                        # Install NVM if not present
                        if ! command -v nvm &> /dev/null; then
                            curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
                        fi

                        # Load NVM
                        export NVM_DIR="$HOME/.nvm"
                        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"

                        # Install and use Node.js
                        nvm install ${NODE_VERSION} --latest-npm
                        nvm use ${NODE_VERSION}
                        node --version
                        npm --version
                    '''
                }
            }
        }

        // Stage 2: Checkout code (runs for all branches)
        stage('Checkout') {
            when {
                branch 'develop'
            }
            steps {
                checkout scm
            }
        }

        // Stage 3: Install dependencies (cached)
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --prefer-offline'
            }
        }

        // Stage 4: Build Next.js app
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        // Stage 5: Build Docker image
        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} \\
                            --build-arg NODE_ENV=production \\
                            .
                    """
                }
            }
        }

        // Stage 6: Deploy (branch-specific)
        stage('Deploy Locally') {
            when {
                branch 'develop'  // Only deploy from develop branch
            }
            steps {
                script {
                    sh """
                        # Stop and remove old container
                        docker stop ${APP_NAME} || true
                        docker rm ${APP_NAME} || true

                        # Run new container
                        docker run -d \\
                            --name ${APP_NAME} \\
                            -p ${APP_PORT}:3000 \\
                            -e NODE_ENV=production \\
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }
    }

    post {
        success {
            echo """
            ✅ Successfully deployed!
            Access your Next.js app: http://localhost:${APP_PORT}
            """
        }
        failure {
            echo "❌ Pipeline failed! Check logs above."
        }
        always {
            cleanWs()
        }
    }
}