# deno-microservice-kafka-example

Experiment to find out how it feels to do micro services with Deno.

## Tested

- [x] [Zod](https://zod.dev/). Just works with native deno support
- [x] npm package support
- [ ] Kafka produce and consume with new KafkaJS-compatible
      [librdkafka-based](https://github.com/Blizzard/node-rdkafka) client
- [ ] Kafka schema registry with Avro
- [ ] Structured logging with standard syslog levels
- [ ] Unit testing
- [ ] Container image
- [ ] K8s liveliness probes

## Links

- [New KafkaJS-compatible client library](https://github.com/confluentinc/confluent-kafka-javascript)
- [Schema Registry](https://github.com/kafkajs/confluent-schema-registry)
- [Example using both together on Node.js](https://github.com/confluentinc/confluent-kafka-javascript/blob/dev_early_access_development_branch/examples/kafkajs/sr.js)
- [librdkafka configuration options](https://github.com/confluentinc/librdkafka/blob/master/CONFIGURATION.md)
- [Health Endpoint Monitoring pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/health-endpoint-monitoring)
- [Configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
