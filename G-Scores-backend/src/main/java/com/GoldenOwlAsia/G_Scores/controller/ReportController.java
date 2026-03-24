package com.GoldenOwlAsia.G_Scores.controller;

import com.GoldenOwlAsia.G_Scores.dto.res.ScoreBandReportResponse;
import com.GoldenOwlAsia.G_Scores.service.ReportService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;

import io.swagger.v3.oas.annotations.Parameter;


@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Score level distribution reports across all subjects")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/levels/{subject}")
    @Operation(
            summary = "Get score band report by subject",
            description = "Returns score band distribution for a specific subject (>=8, 6-<8, 4-<6, <4). Subject must be one of: toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd"
    )
    public ResponseEntity<ScoreBandReportResponse> getLevelReport(
            @PathVariable 
            @Parameter(description = "Subject code: toan, ngu_van, ngoai_ngu, vat_li, hoa_hoc, sinh_hoc, lich_su, dia_li, gdcd")
            String subject) {
        return ResponseEntity.ok(reportService.generateLevelReport(subject));
    }
}
