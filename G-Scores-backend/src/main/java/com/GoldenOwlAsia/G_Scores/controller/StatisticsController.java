package com.GoldenOwlAsia.G_Scores.controller;

import com.GoldenOwlAsia.G_Scores.dto.res.SubjectStatisticsResponse;
import com.GoldenOwlAsia.G_Scores.dto.res.Top10StudentResponse;
import com.GoldenOwlAsia.G_Scores.service.StatisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/statistics")
@RequiredArgsConstructor
@Tag(name = "Statistics", description = "Statistical data for charts and subject group rankings")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/subjects")
    @Operation(
            summary = "Get per-subject score level distribution",
            description = "Returns student counts in each of the 4 score levels for every subject — suitable for chart rendering"
    )
    public ResponseEntity<List<SubjectStatisticsResponse>> getSubjectStatistics() {
        return ResponseEntity.ok(statisticsService.getSubjectStatistics());
    }

    @GetMapping("/top10/groups")
    @Operation(summary = "List all available subject group codes")
    public ResponseEntity<List<String>> getAvailableGroups() {
        return ResponseEntity.ok(statisticsService.getAllGroupCodes());
    }

    @GetMapping("/top10/{groupCode}")
    @Operation(
            summary = "Get top 10 students for a subject group",
            description = "Ranks students by the sum of the 3 group subjects. Students missing any group subject are excluded."
    )
    public ResponseEntity<List<Top10StudentResponse>> getTop10ByGroup(
            @Parameter(description = "Subject group code (e.g. A00, B00, C00, D01)", example = "A00")
            @PathVariable String groupCode) {
        return ResponseEntity.ok(statisticsService.getTop10ByGroup(groupCode));
    }
}
