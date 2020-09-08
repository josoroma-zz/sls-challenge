# Serverless Framework Challenge

![SLS](sls-challenge.gif)

## Tool dependencies

```
brew install awscli awscurl awslogs serverless
```

## Create the SLS project or service

```
sls
```

```
Serverless: No project detected. Do you want to create a new one? Yes
Serverless: What do you want to make? AWS Node.js
Serverless: What do you want to call this project? sls-challenge
```

## Add the initial plugins to your project

```
sls plugin install --name serverless-bundle
sls plugin install --name serverless-offline
sls plugin install --name serverless-dotenv-plugin
```

### Bundle

- https://github.com/AnomalyInnovations/serverless-bundle

The serverless-bundle is a Serverless Framework plugin that optimally packages your ES6 or TypeScript Node.js Lambda functions with sensible defaults so you don't have to maintain your own Webpack configs. It uses the serverless-webpack plugin internally.

### Offline

- https://github.com/dherault/serverless-offline

This Serverless plugin emulates AWS λ and API Gateway on your local machine to speed up your development cycles. To do so, it starts an HTTP server that handles the request's lifecycle like APIG does and invokes your handlers.

### .env

- https://github.com/colynb/serverless-dotenv-plugin

Preload environment variables into serverless. Use this plugin if you have variables stored in a .env file that you want loaded into your serverless yaml config. This will allow you to reference them as \${env:VAR_NAME} inside your config and it will load them into your lambdas.

## code package.json

```
{
  "name": "sls-challenge",
  "description": "",
  "version": "0.1.0",
  "dependencies": {},
  "devDependencies": {
    "serverless": "^1.82.0",
    "serverless-bundle": "^3.1.0",
    "serverless-dotenv-plugin": "^3.0.0",
    "serverless-offline": "^6.7.0"
  }
}
```

## code serverless.yml

```
service: sls-challenge

# App and Org for use with dashboard.serverless.com console.
app: slschallengeapp
org: slschallengeorg

frameworkVersion: "1"

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region: us-east-1

custom:
  serverless-offline:
    useChildProcesses: true

functions:
  products-get:
    handler: src/products/get.main
    events:
      - http:
          path: products/{id}
          method: get
          cors: true
          # authorizer: aws_iam

plugins:
  - serverless-bundle
  - serverless-offline
  - serverless-dotenv-plugin
```
