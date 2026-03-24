package com.GoldenOwlAsia.G_Scores.dto.res;

import com.GoldenOwlAsia.G_Scores.model.Subject;

public record ScoreBandReportResponse(
        Subject subject,
        ScoreBandCountsResponse counts,
        long totalWithScore
) {}