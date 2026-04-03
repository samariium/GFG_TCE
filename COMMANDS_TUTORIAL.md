# Full Commands Tutorial - Single Dockerfile App

This document gives complete copy-paste commands to build, push, deploy, run, update, and clean up your app.

Kubernetes environment used in this assignment: Minikube.

This version uses one Dockerfile for the whole application.

## 1. Go To Project Folder

```powershell
cd "C:\Users\Samar Singh\Desktop\GFG TCE_3"
```

## 2. Prerequisites Check

```powershell
docker --version
kubectl version --client
minikube version
minikube status
kubectl get nodes
```

If `kubectl get nodes` shows at least one node, cluster is ready.

If Minikube is not running, start it:

```powershell
minikube start
```

## 3. Build The Single Docker Image

```powershell
docker build -t samariium/multi-tier-app:latest .
```

Check images:

```powershell
docker images | findstr samariium
```

## 4. Push Image To Docker Hub

```powershell
docker login
docker push samariium/multi-tier-app:latest
```

If you are using Minikube and do not want to push to Docker Hub, load the image into Minikube instead:

```powershell
minikube image load samariium/multi-tier-app:latest
```

## 5. Deploy To Kubernetes

From root folder:

```powershell
kubectl apply -f k8s/deploy.yaml
```

Or from `k8s` folder:

```powershell
cd k8s
kubectl apply -f deploy.yaml
cd ..
```

## 6. Verify Deployment

```powershell
kubectl get deployments
kubectl get svc
kubectl get pods
```

Watch until all pods are `Running` and `1/1`:

```powershell
kubectl get pods -w
```

## 7. Access Frontend In Browser

Start port-forward in one terminal:

```powershell
kubectl port-forward svc/app 8080:80
```

Open:

```text
http://localhost:8080
```

Then click `Get Data from Backend` button.

## 8. Test Backend Directly (Optional)

In another terminal:

```powershell
kubectl port-forward svc/app 3000:80
```

Then test:

```powershell
curl http://localhost:3000/api/data
curl http://localhost:3000/api/health
```

## 9. Update After Code Changes

Whenever you modify frontend or backend:

```powershell
docker build -t samariium/multi-tier-app:latest .
docker push samariium/multi-tier-app:latest
kubectl rollout restart deployment/app
kubectl rollout status deployment/app --timeout=180s
```

## 10. Debug Commands

```powershell
kubectl get pods
kubectl get svc
kubectl logs -l app=app
kubectl describe pod <pod-name>
```

## 11. Common Issues

### A) `ImagePullBackOff` or `ErrImagePull`

Cause: image not pushed or wrong image name.

Fix:

```powershell
docker push samariium/multi-tier-app:latest
kubectl rollout restart deployment/app
```

### B) Port-forward fails on 8080

Try different local port:

```powershell
kubectl port-forward svc/app 9090:80
```

Open `http://localhost:9090`.

### C) Old pods showing `Terminating`

Normal during rolling update. Wait 10-30 seconds.

## 12. Cleanup (Delete App)

```powershell
kubectl delete -f k8s/deploy.yaml
```

Optional remove local images:

```powershell
docker rmi samariium/multi-tier-app:latest
```

## 13. Push New Source Code To GitHub

```powershell
git add .
git commit -m "Update application"
git push
```

Done. This is the full command workflow for your assignment.
