# Gallifrey - the cloudnative image-gallery
It runs on K8S or Docker as Webapp. Images will be stored in s3.

# Screenshot
![webapp example screenshot](/assets/frontend.png)

# Releases
This app is currently in development and far from usable.
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

# Caution:
## this is in heavy development and any help will be really appreciated.
## Thanks for your interest :D
