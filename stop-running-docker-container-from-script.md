title: Docker: Stop a running docker container from a script
tags: docker

If you want to stop a docker container from a script, you may not know the container id or name, so `docker stop` may be insufficient.

With `gawk` and `grep`, however, you can get around that.

    docker ps | grep IMAGE_NAME | gawk '{print $1}' | xargs docker stop || true

This firstly lists all the running containers.

Then it searches for any line with IMAGE_NAME in it.

Then it sends it to `gawk` and we print the container id.

Then we send that to `docker stop`. 

Finally we return 'true' so as not to halt a script if it can't find such a container.
