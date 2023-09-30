# Data liberation (MongoDB + Apache Kafka)

### Etapas: 

- [ ] Configurar Docker compose com Kafka + MongoDB
- [ ] Configurar conexão entre Kafka Connect e DB/Collection do mongo (source)
- [ ] Criar servico responsável por armazenar dados na Collection de origem (servidor REST)
- [ ] Criar servico que utilizará o tópico alimentado pelo Kafka Connect como fonte de eventos (para sua atualizacão)
- [ ] Dockerizar servicos e adicionar ao Docker Compose


### Requisitos 

Para executar ess

- [Docker](https://docs.docker.com/get-docker/)
- [Git]()


### Referências:

1. [MongoDB Connector for Apache Kafka Tutorials](https://www.mongodb.com/docs/kafka-connector/current/tutorials/tutorial-setup/)
2. [MongoDB Kafka Connector](https://docs.mongodb.com/kafka-connector/current/) online documentation.
3. [Connectors to Kafka](https://docs.confluent.io/home/connect/overview.html)

/////////////
The docker compose in this repository will create an environment that consists of the following:

- Apache Kafka
- Zookeeper
- Apache Kafka Connect
- MongoDB Connector for Apache Kafka (installed in Kafka Connect)
- MongoDB single node replica set

# Starting the Docker environment

To start the baseline tutorial environment execute the run the following command:

```
docker-compose -p mongo-kafka up -d --force-recreate
```

To start an interactive shell, run the following command:

```
docker exec -it mongo1 /bin/bash
```

## Shutting down the Tutorial environment

To stop and remove the Docker environment from your
machine, run the following command:

```
docker-compose -p mongo-kafka down --rmi 'all'
```

#######

Steps:

- docker compose up
- docker compose logs mongo1-setup
