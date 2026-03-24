package com.GoldenOwlAsia.G_Scores.service.impl;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreBandCountsResponse;
import com.GoldenOwlAsia.G_Scores.dto.res.ScoreBandReportResponse;
import com.GoldenOwlAsia.G_Scores.dto.res.SubjectStatisticsResponse;
import com.GoldenOwlAsia.G_Scores.model.Subject;
import com.GoldenOwlAsia.G_Scores.service.ReportService;
import com.GoldenOwlAsia.G_Scores.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final StatisticsService statisticsService;

    @Override
    public ScoreBandReportResponse generateLevelReport(String subject) {
        // Validate subject is one of the allowed subjects
        Subject validSubject = Subject.fromColumnName(subject);
        
        List<SubjectStatisticsResponse> subjectStats = statisticsService.getSubjectStatistics();
        return subjectStats.stream()
                .filter(stats -> stats.subject().equals(subject))
                .map(this::buildSubjectRow)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No statistics found for subject: " + subject));
    }

    private ScoreBandReportResponse buildSubjectRow(SubjectStatisticsResponse stats) {
        return new ScoreBandReportResponse(
                Subject.fromColumnName(stats.subject()),
                new ScoreBandCountsResponse(
                        stats.excellent(),
                        stats.good(),
                        stats.average(),
                        stats.weak()
                ),
                stats.total()
        );
    }
}
