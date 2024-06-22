import { KafkaJS } from "npm:@confluentinc/kafka-javascript";
import {
  SchemaRegistry,
  SchemaType,
} from "npm:@kafkajs/confluent-schema-registry";

import { assert } from "./assert.ts";

const broker = assert(Deno.env.get("UPSTASH_KAFKA_BROKER"));
const schemaRegistry = assert(Deno.env.get("UPSTASH_KAFKA_SCHEMA_REGISTRY"));
const username = assert(Deno.env.get("UPSTASH_KAFKA_USERNAME"));
const password = assert(Deno.env.get("UPSTASH_KAFKA_PASSWORD"));

const clusterConfig: KafkaJS.KafkaConfig = {
  brokers: [broker],
  ssl: true,
  sasl: {
    mechanism: "scram-sha-256",
    username,
    password,
  },
  logLevel: KafkaJS.logLevel.ERROR,
};
const kafka = new KafkaJS.Kafka({
  kafkaJS: clusterConfig,
});

const producer = kafka.producer();
const topic = "YOUR_TOPIC";

const registry = new SchemaRegistry({
  host: schemaRegistry,
  auth: {
    username,
    password,
  },
});

const main = async (): Promise<number> => {
  try {
    await producer.connect();

    const schema = `{
      "type": "record",
      "name": "User",
      "namespace": "com.upstash",
      "fields": [
          {"name": "name", "type": "string"},
          {"name": "favorite_number", "type": "long"}
      ]
      }
    `;
    const { id: schemaId } = await registry.register({
      type: SchemaType.AVRO,
      schema: schema,
    });
    const message = { name: "id", favorite_number: 42 };
    const encodedValue = await registry.encode(schemaId, message);

    await producer.send({
      topic,
      messages: [{ key: "id", value: encodedValue }],
    });

    console.log("Message sent successfully");
    await producer.disconnect();
  } catch (error) {
    console.error(error);
    return 1;
  }
  console.log("Hello, World!");
  return 0;
};

Deno.exit(await main());
