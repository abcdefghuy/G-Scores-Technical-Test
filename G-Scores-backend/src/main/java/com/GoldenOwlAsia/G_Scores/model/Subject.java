package com.GoldenOwlAsia.G_Scores.model;

import java.util.Arrays;
import java.util.List;

public enum Subject {

    TOAN("toan", "Toán"),
    NGU_VAN("ngu_van", "Ngữ Văn"),
    NGOAI_NGU("ngoai_ngu", "Ngoại Ngữ"),
    VAT_LI("vat_li", "Vật Lý"),
    HOA_HOC("hoa_hoc", "Hóa Học"),
    SINH_HOC("sinh_hoc", "Sinh Học"),
    LICH_SU("lich_su", "Lịch Sử"),
    DIA_LI("dia_li", "Địa Lý"),
    GDCD("gdcd", "GDCD");

    private final String columnName;
    private final String displayName;

    Subject(String columnName, String displayName) {
        this.columnName = columnName;
        this.displayName = displayName;
    }

    public String columnName() {
        return columnName;
    }

    public String displayName() {
        return displayName;
    }

    public static Subject fromColumnName(String columnName) {
        return Arrays.stream(values())
                .filter(subject -> subject.columnName.equals(columnName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Unknown subject column: " + columnName));
    }

    public static List<Subject> all() {
        return Arrays.asList(values());
    }
}
