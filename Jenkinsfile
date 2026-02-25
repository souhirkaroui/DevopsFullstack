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
                        sh 'mvn clean package -DskipTests=true'
                    }
                }
            }
        }
        stage('Test Backend') {
            steps {
                script {
                    dir('backend-souhir') {
                        
                       // sh 'mvn clean install -U'
                        sh 'mvn test package -DskipTests=true'
                    }
                }       
            }
        }
         stage('Build Frontend') {
            steps {
                dir('frontend-souhir') {
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

                //  Namespace (TOUJOURS EN PREMIER)
                sh 'kubectl apply -f namespace.yaml'

                //  Database (secret + storage + deployment)
                dir('database') {
                    sh 'kubectl apply -f mysql-secret.yaml'
                    sh 'kubectl apply -f mysql-storage.yaml'
                    sh 'kubectl apply -f mysql-deployment.yaml'
                }

                // Backend
                dir('backend-souhir') {
                    sh 'kubectl apply -f backenddeploy.yaml'
                }

                //  Frontend
                dir('frontend-souhir') {
                    sh 'kubectl apply -f frontdeploy.yaml'
                }

                //  Ingress
                sh 'kubectl apply -f ingress.yaml'

                //  Vérification
                sh 'kubectl rollout status deployment mysql -n my-app'
                sh 'kubectl rollout status deployment backend -n my-app'
                sh 'kubectl rollout status deployment front -n my-app'
            }
        }
    }
  }
 }
}
