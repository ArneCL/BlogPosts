title: Docker: install Java8 autoamtically on ubuntu/debian
tags: docker,java

If you want to create a docker image with Java, then there's a problem: it'll ask you manually confirm that you agree to the terms and conditions.

To automatically do this, add some `debconf-set-selections` to your script.

So the steps are now update, install software properties utils, add the webupd8team repo, set the debconf selections, update again, install java.

    apt-get update
    apt-get -y install software-properties-common
    add-apt-repository -y ppa:webupd8team/java
    echo debconf shared/accepted-oracle-license-v1-1 select true | debconf-set-selections
    echo debconf shared/accepted-oracle-license-v1-1 seen true | debconf-set-selections
    apt-get update
    apt-get -y install oracle-java8-installer
