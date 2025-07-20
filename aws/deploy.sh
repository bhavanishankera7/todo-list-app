#!/bin/bash

# AWS Deployment Script for Todo List Application
# This script deploys the complete application to AWS

set -e

# Configuration
STACK_NAME="todo-app-production"
REGION="us-east-1"
ENVIRONMENT="production"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting AWS Deployment for Todo List Application${NC}"

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo -e "${RED}❌ AWS CLI is not installed. Please install it first.${NC}"
    exit 1
fi

# Check if AWS credentials are configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo -e "${RED}❌ AWS credentials are not configured. Please run 'aws configure' first.${NC}"
    exit 1
fi

# Get AWS Account ID
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✅ AWS Account ID: ${AWS_ACCOUNT_ID}${NC}"

# Create ECR repositories
echo -e "${YELLOW}📦 Creating ECR repositories...${NC}"

# Create backend repository
aws ecr create-repository --repository-name todo-api --region $REGION || echo "Repository already exists"

# Get ECR login token
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Build and push backend image
echo -e "${YELLOW}🔨 Building backend Docker image...${NC}"
cd ../backend
docker build -t todo-api .
docker tag todo-api:latest $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/todo-api:latest
docker push $AWS_ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/todo-api:latest

# Build frontend
echo -e "${YELLOW}🔨 Building frontend...${NC}"
cd ../frontend
npm run build

# Deploy infrastructure with CloudFormation
echo -e "${YELLOW}🏗️  Deploying infrastructure with CloudFormation...${NC}"
cd ../aws

# Generate secure passwords
DB_PASSWORD=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 64)

# Deploy CloudFormation stack
aws cloudformation deploy \
    --template-file cloudformation.yml \
    --stack-name $STACK_NAME \
    --parameter-overrides \
        Environment=$ENVIRONMENT \
        DBPassword="$DB_PASSWORD" \
        JWTSecret="$JWT_SECRET" \
    --capabilities CAPABILITY_NAMED_IAM \
    --region $REGION

# Get stack outputs
echo -e "${YELLOW}📋 Getting deployment outputs...${NC}"
LOAD_BALANCER_DNS=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerDNS`].OutputValue' \
    --output text)

CLOUDFRONT_URL=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' \
    --output text)

S3_BUCKET=$(aws cloudformation describe-stacks \
    --stack-name $STACK_NAME \
    --region $REGION \
    --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' \
    --output text)

# Upload frontend to S3
echo -e "${YELLOW}📤 Uploading frontend to S3...${NC}"
aws s3 sync ../frontend/dist/ s3://$S3_BUCKET --delete

# Invalidate CloudFront cache
echo -e "${YELLOW}🔄 Invalidating CloudFront cache...${NC}"
CLOUDFRONT_DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --query "DistributionList.Items[?Aliases.Items[?contains(@, '$CLOUDFRONT_URL')]].Id" \
    --output text)

aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"

# Update frontend API URL
echo -e "${YELLOW}🔧 Updating frontend API configuration...${NC}"
cd ../frontend
# Create production environment file
cat > .env.production << EOF
VITE_API_BASE_URL=http://$LOAD_BALANCER_DNS
VITE_APP_NAME=Todo List App
VITE_APP_VERSION=1.0.0
EOF

# Rebuild frontend with new API URL
npm run build

# Upload updated frontend
aws s3 sync dist/ s3://$S3_BUCKET --delete

# Final invalidation
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_DISTRIBUTION_ID \
    --paths "/*"

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}🌐 Application URLs:${NC}"
echo -e "${GREEN}Frontend: https://$CLOUDFRONT_URL${NC}"
echo -e "${GREEN}Backend API: http://$LOAD_BALANCER_DNS${NC}"
echo -e "${GREEN}=====================================${NC}"
echo -e "${YELLOW}📝 Important Notes:${NC}"
echo -e "${YELLOW}- Database password: $DB_PASSWORD${NC}"
echo -e "${YELLOW}- JWT Secret: $JWT_SECRET${NC}"
echo -e "${YELLOW}- Save these credentials securely!${NC}"
echo -e "${GREEN}=====================================${NC}" 