title: Docker: Mount a host volume / directory
tags: unix,docker,docker-volumes

If you want to give a Docker container access to a direcory on your host system, you need to use volumes, the -v argument to docker run:

    docker.io run -t -i -v /var/:/host_var/:ro ubuntu /bin/bash
    
This command will mount the host's /var/ directory as /host_var/ in the container with read only access.
