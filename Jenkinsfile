pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
               git branch: 'main', credentialsId: 'git', url: 'git@github.com:souhirkaroui/DevopsFullstack.git'
               sh 'ls -lah'  // Vérifier si le code est bien cloné
             }
        }
        // Continuous Integration
        stage('Build Backend') {
            steps {
                script {
                    dir('backend-souhir') {
                        
                       // sh 'mvn clean install -U'
                        sh 'mvn clean package -DskipTests=true'
                    }
                }       
            }
        }
        
        stage('Test Backend') {
            steps {
                script {
                    dir('backend-souhir') {
                        sh 'mvn test'
                    }
                }
            }
        }

        stage('Docker Build & Push Frontend') {
            steps {
                script {
                    dir('frontend-souhir') {
                        withDockerRegistry(credentialsId: 'DockerHub', url: 'https://index.docker.io/v1/') {
                            sh 'docker build -t souhirkaroui/frontend-souhir .'
                            sh 'docker tag souhirkaroui/frontend-souhir souhirks/frontend'
                            sh 'docker push souhirks/frontend'
                        }
                    }
                    sh 'docker image prune -f' // Nettoyage des anciennes images
                }
            }
        }

        stage('Docker Build & Push Backend') {
            steps {
                script {
                    dir('backend-souhir') {
                        withDockerRegistry(credentialsId: 'DockerHub', url: 'https://index.docker.io/v1/') {
                            sh 'docker build -t souhirkaroui/backend-souhir .'
                            sh 'docker tag souhirkaroui/backend-souhir souhirks/backend'
                            sh 'docker push souhirks/backend'
                        }
                    }
                    sh 'docker image prune -f' // Nettoyage des anciennes images
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withKubeConfig([credentialsId: 'kubeconfig']) { 
                    script {
                        sh 'kubectl apply -f namespace.yaml'
                        sh 'kubectl apply -f backenddeploy.yaml'
                        sh 'kubectl apply -f frontdeploy.yaml'
                        sh 'kubectl apply -f ingress.yaml'
                        
                        // Vérification du déploiement
                        sh 'kubectl rollout status deployment backend-deployment'
                        sh 'kubectl rollout status deployment frontend-deployment'
                    }
                }
            }
        }
    }
}
