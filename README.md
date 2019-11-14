# gallifrey

A cloudnative image-gallery. It runs on K8S or Docker as Webapp. Images will be stored in s3.
---
# Screenshot
![webapp example screenshot](/assets/frontend.png)
---
# Releases
This app is currently in development and far from usable.
But the newest Images are available on Dockerhub:
- docker pull nicokahlert/gallifrey-frontend:latest
- docker pull nicokahlert/gallifrey-treehouse:latest
---
# Deployment
For deployment on a kubernetes you can use the YAMLs.

If you don't have the infrastructure you can build it via:
```bash
kubectl create -f /deployments/kubernetes/.infra/
```
then edit the configmap in /deployments/kubernetes/treehouse .
And deploy: 
```bash
kubectl create -f /deployments/kubernetes/treehouse/
kubectl create -f /deployments/kubernetes/frontend/
```
