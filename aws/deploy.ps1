# AWS Deployment Script for Todo List Application (PowerShell)
# This script deploys the complete application to AWS

param(
    [string]$StackName = "todo-app-production",
    [string]$Region = "us-east-1",
    [string]$Environment = "production"
)

# Error handling
$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting AWS Deployment for Todo List Application" -ForegroundColor Green

# Check if AWS CLI is installed
try {
    aws --version | Out-Null
    Write-Host "✅ AWS CLI is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS CLI is not installed. Please install it first." -ForegroundColor Red
    exit 1
}

# Check if AWS credentials are configured
try {
    aws sts get-caller-identity | Out-Null
    Write-Host "✅ AWS credentials are configured" -ForegroundColor Green
} catch {
    Write-Host "❌ AWS credentials are not configured. Please run 'aws configure' first." -ForegroundColor Red
    exit 1
}

# Get AWS Account ID
$AWS_ACCOUNT_ID = aws sts get-caller-identity --query Account --output text
Write-Host "✅ AWS Account ID: $AWS_ACCOUNT_ID" -ForegroundColor Green

# Create ECR repositories
Write-Host "📦 Creating ECR repositories..." -ForegroundColor Yellow

# Create backend repository
try {
    aws ecr create-repository --repository-name todo-api --region $Region
    Write-Host "✅ Created ECR repository: todo-api" -ForegroundColor Green
} catch {
    Write-Host "ℹ️  ECR repository already exists" -ForegroundColor Yellow
}

# Get ECR login token
Write-Host "🔐 Logging into ECR..." -ForegroundColor Yellow
aws ecr get-login-password --region $Region | docker login --username AWS --password-stdin "$AWS_ACCOUNT_ID.dkr.ecr.$Region.amazonaws.com"

# Build and push backend image
Write-Host "🔨 Building backend Docker image..." -ForegroundColor Yellow
Set-Location ../backend
docker build -t todo-api .
docker tag todo-api:latest "$AWS_ACCOUNT_ID.dkr.ecr.$Region.amazonaws.com/todo-api:latest"
docker push "$AWS_ACCOUNT_ID.dkr.ecr.$Region.amazonaws.com/todo-api:latest"

# Build frontend
Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
Set-Location ../frontend
npm run build

# Deploy infrastructure with CloudFormation
Write-Host "🏗️  Deploying infrastructure with CloudFormation..." -ForegroundColor Yellow
Set-Location ../aws

# Generate secure passwords
$DB_PASSWORD = -join ((33..126) | Get-Random -Count 32 | ForEach-Object {[char]$_})
$JWT_SECRET = -join ((33..126) | Get-Random -Count 64 | ForEach-Object {[char]$_})

# Deploy CloudFormation stack
aws cloudformation deploy `
    --template-file cloudformation.yml `
    --stack-name $StackName `
    --parameter-overrides Environment=$Environment DBPassword="$DB_PASSWORD" JWTSecret="$JWT_SECRET" `
    --capabilities CAPABILITY_NAMED_IAM `
    --region $Region

# Get stack outputs
Write-Host "📋 Getting deployment outputs..." -ForegroundColor Yellow
$LOAD_BALANCER_DNS = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query 'Stacks[0].Outputs[?OutputKey==`LoadBalancerDNS`].OutputValue' --output text
$CLOUDFRONT_URL = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query 'Stacks[0].Outputs[?OutputKey==`CloudFrontURL`].OutputValue' --output text
$S3_BUCKET = aws cloudformation describe-stacks --stack-name $StackName --region $Region --query 'Stacks[0].Outputs[?OutputKey==`S3BucketName`].OutputValue' --output text

# Upload frontend to S3
Write-Host "📤 Uploading frontend to S3..." -ForegroundColor Yellow
aws s3 sync ../frontend/dist/ s3://$S3_BUCKET --delete

# Invalidate CloudFront cache
Write-Host "🔄 Invalidating CloudFront cache..." -ForegroundColor Yellow
$CLOUDFRONT_DISTRIBUTION_ID = aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$CLOUDFRONT_URL')]].Id" --output text
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

# Update frontend API URL
Write-Host "🔧 Updating frontend API configuration..." -ForegroundColor Yellow
Set-Location ../frontend

# Create production environment file
@"
VITE_API_BASE_URL=http://$LOAD_BALANCER_DNS
VITE_APP_NAME=Todo List App
VITE_APP_VERSION=1.0.0
"@ | Out-File -FilePath .env.production -Encoding UTF8

# Rebuild frontend with new API URL
npm run build

# Upload updated frontend
aws s3 sync dist/ s3://$S3_BUCKET --delete

# Final invalidation
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host "🌐 Application URLs:" -ForegroundColor Green
Write-Host "Frontend: https://$CLOUDFRONT_URL" -ForegroundColor Green
Write-Host "Backend API: http://$LOAD_BALANCER_DNS" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host "📝 Important Notes:" -ForegroundColor Yellow
Write-Host "- Database password: $DB_PASSWORD" -ForegroundColor Yellow
Write-Host "- JWT Secret: $JWT_SECRET" -ForegroundColor Yellow
Write-Host "- Save these credentials securely!" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Green 