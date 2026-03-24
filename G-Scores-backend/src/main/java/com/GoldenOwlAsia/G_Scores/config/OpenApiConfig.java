package com.GoldenOwlAsia.G_Scores.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI gScoresOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("G-Scores API")
                        .description("Vietnam THPT 2024 Exam Score Query System — score lookup, level reports, subject statistics, and group rankings")
                        .version("1.0.0"));
    }
}
