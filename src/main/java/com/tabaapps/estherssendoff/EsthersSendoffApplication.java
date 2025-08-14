package com.tabaapps.estherssendoff;

import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.TimeZone;

@SpringBootApplication
public class EsthersSendoffApplication {

    public static void main(String[] args) {
        SpringApplication.run(EsthersSendoffApplication.class, args);
    }

    @PostConstruct
    void init() {
        TimeZone.setDefault(TimeZone.getTimeZone("Africa/Nairobi"));
    }

}
