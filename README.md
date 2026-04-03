# Simple Multi-Tier App 

## Files:
- `frontend/` - Nginx web server
- `backend/` - Node.js API server
- `k8s/deploy.yaml` - Kubernetes manifests

## Build:
```bash
docker build -t frontend:latest frontend/
docker build -t backend:latest backend/
```

## Deploy:
```bash
kubectl apply -f k8s/deploy.yaml
```

## Access:
```bash
kubectl port-forward svc/frontend 8080:80
# Open: http://localhost:8080
```
