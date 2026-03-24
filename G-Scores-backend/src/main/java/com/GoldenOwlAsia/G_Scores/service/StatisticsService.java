package com.GoldenOwlAsia.G_Scores.service;

import java.util.List;

import com.GoldenOwlAsia.G_Scores.dto.res.SubjectStatisticsResponse;
import com.GoldenOwlAsia.G_Scores.dto.res.Top10StudentResponse;

public interface StatisticsService {

    List<SubjectStatisticsResponse> getSubjectStatistics();

    List<Top10StudentResponse> getTop10ByGroup(String groupCode);

    List<String> getAllGroupCodes();
}
