docker stop emissao-de-pedido
docker build -f Dockerfile -t emissao-de-pedido .
docker run -p 80:80 -itd --rm --name emissao-de-pedido emissao-de-pedido
