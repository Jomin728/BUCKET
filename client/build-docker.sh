    sh 'docker version'
    sh 'docker build -t SheperdAI-client .'
    sh 'docker image list'
    sh 'docker tag SheperdAI-client jomin729/client:latest'
