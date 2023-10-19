

# Extraer Wallet de un usuario

```shell
docker cp debug-cli:/etc/hyperledger/fabric/local/organizations/peerOrganizations/org1.debugger.com/users/api_client ./api_insurance/wallet

```

# Logs Nodo Peer0
```shell
docker logs peer0.org1.debugger.com -f 
```