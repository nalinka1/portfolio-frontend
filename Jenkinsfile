pipeline {
    agent any

    environment {
        // App & Docker settings
        APP_NAME = "portfolio-frontend"
        DOCKER_IMAGE = "portfolio-frontend"  // No username if using local Docker
        DOCKER_TAG = "latest"
        APP_PORT = "3000"  // Next.js default

        // ngrok settings (for webhook debugging)
        NGROK_URL = "https://f708-2402-4000-2200-523-c0a9-21d1-b554-98fc.ngrok-free.app"
    }

    stages {
        // Stage 1: Checkout code
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // Stage 2: Install dependencies (cached)
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --prefer-offline'
            }
        }

        // Stage 3: Build Next.js
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        // Stage 4: Dockerize (optimized for local Docker Desktop)
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

        // Stage 5: Stop old container and run new one
        stage('Deploy Locally') {
            when {
                branch 'develop'
            }
            steps {
                script {
                    sh """
                        # Gracefully stop and remove old container
                        docker stop ${APP_NAME} || true
                        docker rm ${APP_NAME} || true

                        # Run new container (map to host port 3000)
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
            GitHub webhook URL: ${NGROK_URL}/github-webhook/
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