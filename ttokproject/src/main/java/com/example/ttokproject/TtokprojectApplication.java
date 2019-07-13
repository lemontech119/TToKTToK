package com.example.ttokproject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TtokprojectApplication {

    @GetMapping("/test")
    public String hello() {
        return "default setting complete";
    }

    public static void main(String[] args) {
        SpringApplication.run(TtokprojectApplication.class, args);
    }

}
