package com.GoldenOwlAsia.G_Scores.model;

import java.util.Arrays;
import java.util.List;

public enum SubjectGroup {

    A00("toan", "vat_li", "hoa_hoc"),
    A01("toan", "vat_li", "ngoai_ngu"),
    A02("toan", "vat_li", "sinh_hoc"),
    B00("toan", "hoa_hoc", "sinh_hoc"),
    B03("toan", "sinh_hoc", "ngu_van"),
    C00("ngu_van", "lich_su", "dia_li"),
    C01("ngu_van", "toan", "vat_li"),
    C03("ngu_van", "toan", "lich_su"),
    D01("toan", "ngu_van", "ngoai_ngu"),
    D07("toan", "hoa_hoc", "ngoai_ngu"),
    D14("ngu_van", "lich_su", "ngoai_ngu");

    private final String subject1;
    private final String subject2;
    private final String subject3;

    SubjectGroup(String subject1, String subject2, String subject3) {
        this.subject1 = subject1;
        this.subject2 = subject2;
        this.subject3 = subject3;
    }

    public List<String> subjects() {
        return List.of(subject1, subject2, subject3);
    }

    public static SubjectGroup fromCode(String code) {
        return Arrays.stream(values())
                .filter(group -> group.name().equalsIgnoreCase(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid group code: '" + code + "'. Valid codes: " + allCodes()
                ));
    }

    public static List<String> allCodes() {
        return Arrays.stream(values()).map(SubjectGroup::name).toList();
    }
}
