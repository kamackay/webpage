package com.keithmackay.web;

import com.mongodb.MongoClientOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableMongoAuditing
@SpringBootApplication
public class WebpageMain {

  public static void main(String[] args) {
    SpringApplication.run(WebpageMain.class, args);
  }

  @Bean
  public MongoClientOptions mongoOptions(
      @Value("${spring.data.mongodb.connectTimeout: 5000}") int connectTimeout,
      @Value("${spring.data.mongodb.socketTimeout: 5000}") int socketTimeout,
      @Value("${spring.data.mongodb.maxWaitTime: 5000}") int maxWaitTime,
      @Value("${spring.data.mongodb.serverSelectionTimeout: 5000}") int serverSelectionTimeout) {
    return MongoClientOptions.builder()
        .connectTimeout(connectTimeout)
        .socketTimeout(socketTimeout)
        .maxWaitTime(maxWaitTime)
        .serverSelectionTimeout(serverSelectionTimeout)
        .build();
  }


}
