package com.GoldenOwlAsia.G_Scores.dto.res;

public record SubjectStatisticsResponse(
        String subject,
        String displayName,
        long excellent,
        long good,
        long average,
        long weak,
        long total
) {}
