import java.text.SimpleDateFormat
def version = ""

def addToDescription(message) {
    echo "adding to description : ${message}"
    def description = currentBuild.description ?: ""
    currentBuild.description = description != null && description.trim().length() > 0 ? "${description}<br>${message}" : message
}

node("docker") {

    stage('Checkout') {
        checkout scm
        step([$class: 'StashNotifier'])
    }
    
    stage("version") {
        def timestamp = new SimpleDateFormat("yyyyMMdd.Hmm").format(new Date())
        def gitCommitNumber = sh(returnStdout: true, script: "git rev-list --count HEAD").trim()
        versjon = "${gitCommitNumber}.${timestamp}"

        echo "Build version: ${versjon}"
        addToDescription("Version: ${versjon}")
    }

    stage("publish") {
        sh("docker build --build-arg VERSION=${versjon} .")
    }

    stage("git tag") {
        sh "git tag -a ${versjon} -m ${versjon} HEAD"
        sh "git push --tags"
    }
}