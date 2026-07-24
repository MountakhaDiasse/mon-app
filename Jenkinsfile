pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        IMAGE_NAME = "mountakhadiasse/mon-app"
        IMAGE_TAG  = "v${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                sh 'npm install'
                sh 'npm test'
            }
        }

        stage('Build image Docker') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Push image') {
            steps {
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Déploiement Kubernetes') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-demo', variable: 'KUBECONFIG_FILE')]) {
                    sh 'kubectl --kubeconfig=$KUBECONFIG_FILE set image deployment/mon-app mon-app=${IMAGE_NAME}:${IMAGE_TAG}'
                    sh 'kubectl --kubeconfig=$KUBECONFIG_FILE rollout status deployment/mon-app'
                }
            }
        }

        stage('Vérification') {
            steps {
                withCredentials([file(credentialsId: 'kubeconfig-demo', variable: 'KUBECONFIG_FILE')]) {
                    sh 'kubectl --kubeconfig=$KUBECONFIG_FILE get pods'
                }
            }
        }
    }

    post {
        success { echo "Déploiement réussi : ${IMAGE_NAME}:${IMAGE_TAG}" }
        failure { echo "Échec du pipeline, vérifier les logs." }
    }
}