### Cyverse Challenge ###
#### Todd Wickizer ####


Quick solution to the Cyverse Challenge.


Publisher & subscriber represent 1A and 2A of the challenge. They should be run with Node 12.


The dockerfile represents the build to containerize both of those programs, they are published to


1. toddwickizer/publisher:2
2. toddwickizer/subscriber:2


The Kubernetes file is located in main.yaml. It was only tested using minikube.

Additionally the following command has to be ran to create a mount between the kub vm and the host machine.

```minikube mount myvol/:/mnt1/out```

Once the mount is running, the kub cluster should be able to be created by running


```kubectl apply -f main.yaml```




Quick Concession: 
I'm using the demo nats server instead of the one actually hosted by the kubernets cluster.
