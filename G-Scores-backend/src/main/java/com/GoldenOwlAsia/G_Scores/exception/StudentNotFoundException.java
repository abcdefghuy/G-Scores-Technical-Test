package com.GoldenOwlAsia.G_Scores.exception;

public class StudentNotFoundException extends RuntimeException {

    public StudentNotFoundException(String sbd) {
        super("Student not found with registration number: " + sbd);
    }
}
