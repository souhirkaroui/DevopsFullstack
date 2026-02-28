pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
               git branch: 'main', credentialsId: 'git', url: 'git@github.com:souhirkaroui/DevopsFullstack.git'
               sh 'ls -lah'  // Vérifier si le code est bien cloné
             }
        }

        stage('Build Backend') {
            steps {
                script {
                    dir('backend-souhir') {
                        sh 'mvn clean package -DskipTests=true'
                    }
                }
            }
        }

        stage('Test Backend') {
            steps {
                script {
                    dir('backend-souhir') {
                        sh 'mvn test package -DskipTests=true'
                    }
                }       
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend-souhir') {
                    sh 'npm install'
                    sh 'ng build --configuration production'
                }
            }
        }
        
        stage('Test Frontend') {
            steps {
                dir('frontend-souhir') {
                    sh 'npm run test -- --watch=false --browsers=ChromeHeadless'
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

                //  Namespace
                sh 'kubectl apply -f namespace.yaml'

                //  Database
                dir('database') {
                    sh 'kubectl apply -f mysql-secret.yaml'
                    sh 'kubectl apply -f mysql-storage.yaml'
                    sh 'kubectl apply -f mysql-deployment.yaml'
                    sh 'kubectl apply -f mysql-svc.yaml'

                    // Attente que MySQL soit Ready
                    sh 'kubectl rollout status deployment/mysql --timeout=120s'
                }

                // Backend
                dir('backend-souhir') {
                    sh 'kubectl apply -f backenddeploy.yaml'

                    // Attente que le backend soit Ready
                    sh 'kubectl rollout status deployment/backend-deployment --timeout=120s'
                }

                // Frontend
                dir('frontend-souhir') {
                    sh 'kubectl apply -f frontdeploy.yaml'

                    // Attente que le frontend soit Ready
                    sh 'kubectl rollout status deployment/frontend-deployment --timeout=120s'
                }

                // Ingress
              sh 'kubectl apply -f ingress.yaml'
               
            }
        }
    }
}
    }

}
