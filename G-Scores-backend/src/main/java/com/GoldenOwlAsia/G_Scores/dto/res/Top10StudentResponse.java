package com.GoldenOwlAsia.G_Scores.dto.res;

import java.util.Map;

public record Top10StudentResponse(
        int rank,
        String sbd,
        Map<String, Double> scores,
        double groupTotal
) {}
