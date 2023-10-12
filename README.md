

Obtener los certificados del usuario api_client
```shell
docker cp debug-cli:/etc/hyperledger/fabric/local/organizations/peerOrganizations/org1.debugger.com/users/api_client ./api_insurance/wallet

```

Acceder a la linea de comandos del nodo Peer0
```shell
docker exec -it peer0.org1.debugger.com /bin/sh    
```

Logs Nodo Peer0
```shell
docker logs peer0.org1.debugger.com -f 
```
