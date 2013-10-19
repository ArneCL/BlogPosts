title: Installing Docker in Debian (testing/Jessie)
tags: unix, unix-debian, docker

You need to be running a 3.10 kernel or above, hence the need for Jessie and the installation of that kernel.

You need to install golang, and specially 1.2 or above else you'll get ipv6 errors, too. Get it from golang.org

You also need to have lxc and aufs-tools

    apt-get install lxc aufs-tools

Then you need to setup your GOPATH environmental variable.

    export GOPATH=/your/go/directory
    
Then inside your $GOPATH, you need to create a src/github.com/dotcloud directory.

    cd $GOPAth
    mkdir -p src/github.com/dotcloud/
    cd src/github.com/dotcloud
    
It's into here that we'll pull the docker source from git.

    git clone https://github.com/dotcloud/docker
    
Then cd into the docker directory to use golang to pull all the dependencies and install docker into your GOPATH's bin directory

    cd docker
    go get -v github.com/dotcloud/docker/...
    go install -v github.com/dotcloud/docker/...
    
(The three dots mean do this for all the packages under said directory)

You should be able to run docker via

    $GOPATH/bin/docker
    
Before you can run a docker image you need to mount cgroups. Put this in your /etc/fstab

    none        /cgroup        cgroup        defaults    0    0
    
And then run

    mount -a
    
You also need to enable ipv4 forwarding else your container won't be able to talk to the outside world.

    sysctl -w net.ipv4.ip_forward=1
    
Finally you need to run docker as a daemon, and as root, too.

    $GOPATH/bin/docker -d &
    2013/10/19 23:15:48 WARNING: cgroup mountpoint not found for memory
    2013/10/19 23:15:48 Listening for HTTP on /var/run/docker.sock (unix)

Now you can issue a pull request to get the base 120MB ubuntu container from the internet.

    $GOPATH/bin/docker pull ubuntu
    
After it's downloaded it all, you can now use that container.

    $GOPATH/bin/docker run ubuntu echo 'omg'
    
This should product something like

    2013/10/19 23:22:55 POST /v1.6/containers/create
    2013/10/19 23:22:55 POST /v1.6/containers/3fe0676d7e00/attach?stderr=1&stdout=1&stream=1
    2013/10/19 23:22:55 POST /v1.6/containers/3fe0676d7e00/start
    omg
    2013/10/19 23:22:55 GET /v1.6/containers/3fe0676d7e00/json
