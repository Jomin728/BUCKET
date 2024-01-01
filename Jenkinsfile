pipeline {
    agent any
    stages {
      stage('Git Clone')
      {
          steps{
             echo "Cloning from git"
             git branch: 'main', url: 'https://github.com/Jomin728/ShepherdAI.git'
             echo "Git repo is cloned succesfully"

          }
      }
      stage('Build')
      {
          steps{
            echo "Hello Building"
          }
      }
    }
}