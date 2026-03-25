package com.GoldenOwlAsia.G_Scores.service.impl;

import com.GoldenOwlAsia.G_Scores.dto.res.SubjectLevelCounts;
import com.GoldenOwlAsia.G_Scores.dto.res.SubjectStatisticsResponse;
import com.GoldenOwlAsia.G_Scores.dto.res.Top10StudentResponse;
import com.GoldenOwlAsia.G_Scores.model.Subject;
import com.GoldenOwlAsia.G_Scores.model.SubjectGroup;
import com.GoldenOwlAsia.G_Scores.repository.NativeQueryRepository;
import com.GoldenOwlAsia.G_Scores.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatisticsServiceImpl implements StatisticsService {

    private final NativeQueryRepository nativeQueryRepository;

    @Override
    public List<SubjectStatisticsResponse> getSubjectStatistics() {
        var countsMap = nativeQueryRepository.countScoreLevelsForAllSubjects();
        return Subject.all().stream()
                .map(subject -> buildSubjectStatistics(subject, countsMap.get(subject.columnName())))
                .toList();
    }

    @Override
    public SubjectStatisticsResponse getSubjectStatistics(String subjectName) {
        Subject subject = Subject.fromColumnName(subjectName);
        SubjectLevelCounts counts = nativeQueryRepository.countScoreLevelsBySubject(subject.columnName());
        return buildSubjectStatistics(subject, counts);
    }

    @Override
    public List<Top10StudentResponse> getTop10ByGroup(String groupCode) {
        SubjectGroup group = SubjectGroup.fromCode(groupCode);
        return nativeQueryRepository.findTop10ByGroup(group.subjects());
    }

    @Override
    public List<String> getAllGroupCodes() {
        return SubjectGroup.allCodes();
    }

    private SubjectStatisticsResponse buildSubjectStatistics(Subject subject, SubjectLevelCounts counts) {
        if (counts == null) {
            counts = new SubjectLevelCounts(0L, 0L, 0L, 0L);
        }
        long total = counts.excellent() + counts.good() + counts.average() + counts.weak();
        return new SubjectStatisticsResponse(
                subject.columnName(),
                subject.displayName(),
                counts.excellent(),
                counts.good(),
                counts.average(),
                counts.weak(),
                total
        );
    }
}
