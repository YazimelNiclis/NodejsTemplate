pipeline {
  
  environment {
	REGISTRY = '<url registry>:443'
    REPO_NAME = "${scm.getUserRemoteConfigs()[0].getUrl().tokenize('/').last().split("\\.")[0]}"	
	DOCKER_IMAGE = "${REGISTRY}/${REPO_NAME}"	
    REGISTRY_CREDENTIAL_SET = '<credenciales de usuario registry>'
	REGISTRY_CREDS = credentials('<credenciales de usuario registry>')
    REGISTRY_URI = "https://${REGISTRY}"
    ROOT_DIR = "/home/cidsuser/<nombre/abreviatura del proyecto>/${REPO_NAME}"
	PROXY_SRV = 'http://proxySrv.gobiernocba.gov.ar:8080/' 
	PROXY_DESA = 'http://proxydesa.gobiernocba.gov.ar:8080/'		
	DEPLOY_USR='cidsuser'
	DEPLOY_PORT='22'
	PATH_DOCKERFILE='./Dockerfile'
	PATH_DOCKER_COM='./docker-compose.yml'
  }

  agent any

  stages {
    stage('Build') {
      steps {        
        script {		  
		  lastTagName = sh(returnStdout: true, script: "git tag --list --sort=taggerdate | tail -2 | head -n 1")
		  env.LAST_TAG = lastTagName.split("_")[1]
		  env.CURRENT_TAG = "$TAG_NAME".split("_")[1]
		  env.BRANCH_NAME = "$TAG_NAME".split("_")[0]
		  env.DOCKER_IMAGE_TAG = "$DOCKER_IMAGE:$CURRENT_TAG"
		  env.DOCKER_IMAGE_LATEST = "$DOCKER_IMAGE:latest"
		  echo 'Verificando imágen $DOCKER_IMAGE_TAG ...'
		  env.EXISTS_TAG = sh(script: "docker images -q $DOCKER_IMAGE_TAG", returnStdout: true).trim()
		  echo "EXISTS_TAG:$EXISTS_TAG"
		  if ("$EXISTS_TAG".isEmpty()){
			  echo 'Creando imágen $DOCKER_IMAGE_TAG ...'
			  env.PATH_DEPLOY="deploys/$BRANCH_NAME"
			  sh '''
			  		if [ -d "$PATH_DEPLOY" ]; then
						cp -rf $PATH_DEPLOY/* .
		            fi
			  '''
			  env.OPTS_BUILD_DOCKER="--build-arg http_proxy=${PROXY_SRV} --build-arg https_proxy=${PROXY_SRV} --rm=true --cache-from $DOCKER_IMAGE_LATEST -t $DOCKER_IMAGE_LATEST --file=$PATH_DOCKERFILE ."	
			  sh 'env'
			  dockerInstance = docker.build("$DOCKER_IMAGE_TAG", "$OPTS_BUILD_DOCKER")
		  }else {                                                  
			echo "Existe imágen $DOCKER_IMAGE_TAG"                              
		  } 
        }
      }
    }

    stage('Publish image') {
      steps {        
        script {
		  echo 'Verificando  $DOCKER_IMAGE_TAG imágen ...'
		  if ("$EXISTS_TAG".isEmpty()) {
		  	echo 'Publicando imágen $DOCKER_IMAGE_TAG al registry ...'
			sh 'env'
			docker.withRegistry(REGISTRY_URI, REGISTRY_CREDENTIAL_SET) {
				dockerInstance.push()
				dockerInstance.push("latest")
			}
		  }else {                                                  
			echo "Existe imágen $DOCKER_IMAGE_TAG"                             
		  }  
        }
      }
    }
	
    stage('Deploy') {
      steps {
		script {
		  sh 'env'
		  if (env.TAG_NAME) {
			echo "triggered by the TAG:"                                 
			def ips = ["<ip>"] as String[]
			if ('dev-cba' == "$BRANCH_NAME") {
				ips = ["<ip>","<ip>"] as String[]
			}
			if ('pre-cba' == "$BRANCH_NAME") {
				ips = ["<ip>", "<ip>", "<ip>"] as String[]
			}
			if ('pro-cba' == "$BRANCH_NAME") {
				ips = ["<ip>", "<ip>", "<ip>"] as String[]
			}
			deploy(ips)   			
		  } else {                                                  
			echo "triggered by branch, PR or ..."                              
		  }         		
		}
      }
    }
  }
}


def deploy(String[] args) {
    args.each { 
	  echo "Comenzando despliegue en ...${it}"
	  sh "sed -i 's|\${CI_REGISTRY_IMAGE}|$DOCKER_IMAGE_TAG|' $PATH_DOCKER_COM"
	  sh "sed -i 's|\${CI_PROJECT_NAME}|$REPO_NAME|' $PATH_DOCKER_COM"
	  sh "ssh -o StrictHostKeyChecking=no ${DEPLOY_USR}@${it} -p ${DEPLOY_PORT} 'mkdir -p $ROOT_DIR'"
      sh "scp -P ${DEPLOY_PORT} $PATH_DOCKER_COM cidsuser@${it}:$ROOT_DIR"
	  sh "ssh -o StrictHostKeyChecking=no ${DEPLOY_USR}@${it} -p ${DEPLOY_PORT} 'cat $ROOT_DIR/docker-compose.yml'"
      sh "ssh -o StrictHostKeyChecking=no ${DEPLOY_USR}@${it} -p ${DEPLOY_PORT} 'echo \"$REGISTRY_CREDS_PSW\" | docker login $REGISTRY_URI --username $REGISTRY_CREDS_USR --password-stdin && cd $ROOT_DIR && docker-compose down --remove-orphans --rmi all && docker-compose up --build -d && docker logout'"
	  echo "Despliegue finalizado ${it}"
   }
}
