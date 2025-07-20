# 🚀 AWS Deployment Guide

This guide will help you deploy your Todo List application to AWS using modern cloud infrastructure.

## 📋 Prerequisites

### 1. AWS Account Setup
- Create an AWS account at [aws.amazon.com](https://aws.amazon.com)
- Set up billing and payment methods
- Create an IAM user with appropriate permissions

### 2. Required Tools
- **AWS CLI**: [Installation Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- **Docker**: [Installation Guide](https://docs.docker.com/get-docker/)
- **Node.js**: [Download](https://nodejs.org/)

### 3. AWS Credentials Configuration
```bash
aws configure
```
Enter your:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., us-east-1)
- Default output format (json)

## 🏗️ Architecture Overview

Our deployment uses the following AWS services:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   S3 Bucket     │    │   Route 53      │
│   (CDN)         │◄──►│   (Frontend)    │    │   (DNS)         │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Application   │    │   ECS Cluster   │    │   RDS Database  │
│   Load Balancer │◄──►│   (Backend)     │◄──►│   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Services Used:
- **CloudFront**: Global CDN for frontend
- **S3**: Static file hosting for React app
- **ECS Fargate**: Containerized backend API
- **RDS**: PostgreSQL database
- **Application Load Balancer**: Traffic distribution
- **VPC**: Network isolation
- **CloudWatch**: Logging and monitoring

## 🚀 Quick Deployment

### Option 1: Automated Deployment (Recommended)

#### For Windows (PowerShell):
```powershell
cd aws
.\deploy.ps1
```

#### For Linux/Mac (Bash):
```bash
cd aws
chmod +x deploy.sh
./deploy.sh
```

### Option 2: Manual Deployment

#### Step 1: Build and Push Backend
```bash
# Build Docker image
cd backend
docker build -t todo-api .

# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag todo-api:latest $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/todo-api:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/todo-api:latest
```

#### Step 2: Build Frontend
```bash
cd frontend
npm run build
```

#### Step 3: Deploy Infrastructure
```bash
cd aws

# Generate secure credentials
DB_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 64)

# Deploy CloudFormation stack
aws cloudformation deploy \
    --template-file cloudformation.yml \
    --stack-name todo-app-production \
    --parameter-overrides \
        Environment=production \
        DBPassword="$DB_PASSWORD" \
        JWTSecret="$JWT_SECRET" \
    --capabilities CAPABILITY_NAMED_IAM \
    --region us-east-1
```

#### Step 4: Deploy Frontend
```bash
# Get S3 bucket name
S3_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name todo-app-production \
    --region us-east-1 \
    --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
    --output text)

# Upload frontend
aws s3 sync ../frontend/dist/ s3://$S3_BUCKET --delete

# Invalidate CloudFront cache
CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Aliases.Items[?contains(@, '$CLOUDFRONT_URL')]].Id" \
    --output text)

aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=production
DB_HOST=your-rds-endpoint.amazonaws.com
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=your-secure-password
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
```

#### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-alb-domain.com
VITE_APP_NAME=Todo List App
VITE_APP_VERSION=1.0.0
```

### Security Considerations

1. **Database Security**:
   - RDS instance in private subnet
   - Security group restricts access
   - Encryption at rest enabled

2. **Application Security**:
   - JWT tokens for authentication
   - HTTPS enforced
   - Input validation
   - CORS configured

3. **Network Security**:
   - VPC with public/private subnets
   - Security groups for traffic control
   - No direct SSH access to containers

## 📊 Monitoring and Logging

### CloudWatch Logs
- Application logs automatically sent to CloudWatch
- Log retention: 30 days
- Log group: `/ecs/production-todo-app`

### Health Checks
- ALB health checks on `/health` endpoint
- ECS service health monitoring
- RDS instance monitoring

### Metrics
- CPU and memory utilization
- Request count and latency
- Error rates
- Database connections

## 🔄 CI/CD Pipeline (Optional)

### GitHub Actions Workflow
```yaml
name: Deploy to AWS
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Deploy to AWS
        run: |
          cd aws
          ./deploy.sh
```

## 💰 Cost Estimation

### Monthly Costs (US East 1)
- **RDS PostgreSQL**: ~$15-25/month
- **ECS Fargate**: ~$20-40/month
- **Application Load Balancer**: ~$20/month
- **CloudFront**: ~$5-10/month
- **S3**: ~$1-2/month
- **Data Transfer**: ~$5-15/month

**Total Estimated Cost**: $66-112/month

### Cost Optimization Tips
1. Use reserved instances for RDS
2. Implement auto-scaling
3. Use CloudFront caching effectively
4. Monitor and optimize resource usage

## 🛠️ Troubleshooting

### Common Issues

#### 1. ECR Login Failed
```bash
# Solution: Re-authenticate
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com
```

#### 2. CloudFormation Stack Failed
```bash
# Check stack events
aws cloudformation describe-stack-events --stack-name todo-app-production

# Delete and recreate if needed
aws cloudformation delete-stack --stack-name todo-app-production
```

#### 3. Frontend Not Loading
```bash
# Check S3 bucket
aws s3 ls s3://your-bucket-name

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

#### 4. Backend API Unreachable
```bash
# Check ECS service status
aws ecs describe-services --cluster production-todo-cluster --services production-todo-service

# Check ALB health
aws elbv2 describe-target-health --target-group-arn YOUR_TARGET_GROUP_ARN
```

## 🧹 Cleanup

To remove all resources:
```bash
# Delete CloudFormation stack
aws cloudformation delete-stack --stack-name todo-app-production

# Delete ECR repository
aws ecr delete-repository --repository-name todo-api --force

# Wait for stack deletion to complete
aws cloudformation wait stack-delete-complete --stack-name todo-app-production
```

## 📞 Support

For issues or questions:
1. Check CloudWatch logs for application errors
2. Review CloudFormation stack events
3. Verify AWS credentials and permissions
4. Ensure all prerequisites are met

## 🎉 Success!

After successful deployment, you'll have:
- ✅ Scalable, production-ready application
- ✅ Global CDN for fast loading
- ✅ Secure database with backups
- ✅ Containerized backend with auto-scaling
- ✅ Monitoring and logging
- ✅ HTTPS encryption
- ✅ High availability across AZs

Your Todo List application is now live on AWS! 🚀 