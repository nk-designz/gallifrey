![logo](/assets/logo.svg)
# Gallifrey - the cloudnative image-gallery
It runs on K8S or Docker as Webapp. Images will be stored in s3.

![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/nicokahlert/gallifrey-frontend?style=flat-square&label=Frontend%20Container%20build%20status)
![Docker Cloud Build Status](https://img.shields.io/docker/cloud/build/nicokahlert/gallifrey-treehouse?label=Treehouse%20Container%20build%20status&style=flat-square)
![GitHub](https://img.shields.io/github/license/nk-designz/gallifrey?style=flat-square)
# Screenshot
![webapp example screenshot](/assets/frontend.png)

# Releases
This app is currently in development and far from ready.
But the newest Images are available on Dockerhub:
- docker pull nicokahlert/gallifrey-frontend:latest
- docker pull nicokahlert/gallifrey-treehouse:latest

# Deployment
For deployment on a kubernetes you can use the YAMLs.
For testing purposes [rancher's k3s](https://k3s.io) is really nice.
Create the namespace:
```bash
kubectl create -f /deployments/kubernetes/namespace.yaml
```
Deploy the Authprovider, for example RedHat's Keycloak:
```bash
helm repo add codecentric https://codecentric.github.io/helm-charts
helm install --name keycloak codecentric/keycloak \
  --set keycloak.image.tag=6.0.1 \
  --set keycloak.replicas=3 \
  --set keycloak.username=admin \
  --set keycloak.password=admin \
  --set keycloak.persistence.deployPostgres=true \
  --set keycloak.persistence.dbVendor=postgres \
  --namespace keycloak
```
If you don't have the infrastructure you can build it via:
```bash
kubectl create -f /deployments/kubernetes/gallifrey/backend/.infra/
```
then edit the configmap of treehouse.
__(Ignore if you used the previous command)__
```bash
vim /deployments/kubernetes/gallifrey/backend/treehouse/configmap.yaml
```

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gallifrey-config
  namespace: gallifrey
data:
  config.yaml: |
    s3:
      endpoint_adress: "<s3_endpoint_address>"
      access_key_id: "<access_key_id>"
      secret_access_key: "<access_key>"
      force_path_style: true
      region: "<region>"
      bucket_name: "<bucket_name>"
    metadb:
      endpoint_adress: "<mysql_address>"
      user: "<mysql_user>"
      password: "<mysql_user_password>"
      database: "<mysql_database>"
```
And deploy: 
```bash
kubectl create -f /deployments/kubernetes/gallifrey/backend/treehouse/
kubectl create -f /deployments/kubernetes/gallifrey/frontend/
```
At last we need to point these DNS names to your cluster:
- gallifrey.local
- api.gallifrey.local
- s3.gallifrey.local
## Access your deployment
Go to your favorite browser at http://gallifrey.local

# Architecture
![screenshot_of_deploynemt_visualisation](/assets/arch.png)
# Caution:
this project is in heavy development and any help will be really appreciated.
Thanks for your interest :D
