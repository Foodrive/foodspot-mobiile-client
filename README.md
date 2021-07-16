# Foodspot Mobile Client

## Getting Started

Step 1: Modify configurations in app.json

```json
{
  ...,
  "extras": {
    "serverUrl": "<FOODSPOT_SERVER_URL>"
  }
}
```

Step 2: Run the client
```shell
npm install # install dependencies
```

## Running Locally
1. Run the graphql server. ([You can find it here](https://github.com/Foodrive/graphql-server))
2. In `serverUrl`, add in `http://<YOUR_PUBLC_IP>:4000`
