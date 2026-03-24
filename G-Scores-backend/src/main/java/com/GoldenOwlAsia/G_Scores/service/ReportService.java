package com.GoldenOwlAsia.G_Scores.service;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreBandReportResponse;

public interface ReportService {

    ScoreBandReportResponse generateLevelReport(String subject);
}
