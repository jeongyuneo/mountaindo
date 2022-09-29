package com.hanssarang.backend.util;

import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.regex.Pattern;

import static com.hanssarang.backend.common.domain.ErrorMessage.WRONG_PATH;

@RequiredArgsConstructor
public enum PathUtil {

    LINESTRING("LINESTRING") {
        @Override
        public boolean isCompleted(String path, double latitude, double longitude) {
            String coordinate = PATH_TYPE.matcher(path).replaceAll(DELETE);
            String[] lines = PARENTHESIS.matcher(coordinate).replaceAll(DELETE).split(COORDINATE_DELIMITER);
            return isInEndPoint(lines[lines.length - 1], latitude, longitude);
        }
    },
    MULTILINESTRING("MULTILINESTRING") {
        @Override
        public boolean isCompleted(String path, double latitude, double longitude) {
            String coordinate = PATH_TYPE.matcher(path).replaceAll(DELETE);
            String[] lines = MULTI_PARENTHESIS.matcher(coordinate).replaceAll(DELETE).split(MULTILINESTRING_COORDINATE_DELIMITER);
            return Arrays.stream(lines)
                    .map(line -> line.split(COORDINATE_DELIMITER))
                    .anyMatch(line -> isInEndPoint(line[line.length - 1], latitude, longitude));
        }
    };

    private static final String PATH_DELIMITER = " ";
    private static final String COORDINATE_DELIMITER = ", ";
    private static final String MULTILINESTRING_COORDINATE_DELIMITER = "\\), \\(";
    private static final String DELETE = "";
    private static final int TYPE = 0;
    private static final int LATITUDE = 0;
    private static final int LONGITUDE = 1;
    private static final Pattern PARENTHESIS = Pattern.compile("[()]");
    private static final Pattern MULTI_PARENTHESIS = Pattern.compile("[()]{2,}");
    private static final Pattern PATH_TYPE = Pattern.compile("(LINESTRING)|(MULTILINESTRING)[ ]");

    private final String type;

    public abstract boolean isCompleted(String path, double latitude, double longitude);

    public static PathUtil find(String path) {
        return Arrays.stream(values())
                .filter(value -> value.type.equals(path.split(PATH_DELIMITER)[TYPE]))
                .findAny()
                .orElseThrow(() -> new IllegalArgumentException(WRONG_PATH));
    }

    protected boolean isInEndPoint(String path, double latitude2, double longitude2) {
        double latitude1 = getCoordinate(path, LATITUDE);
        double longitude1 = getCoordinate(path, LONGITUDE);
        double theta = longitude1 - longitude2;
        double distance = Math.sin(toRadians(latitude1)) * Math.sin(toRadians(latitude2)) + Math.cos(toRadians(latitude1)) * Math.cos(toRadians(latitude2)) * Math.cos(toRadians(theta));
        return (toDegrees(Math.acos(distance)) * 60 * 1.1515) * 1609.344 < 10;
    }

    private double getCoordinate(String path, int coordinateInfo) {
        return Double.parseDouble(path.split(PATH_DELIMITER)[coordinateInfo]);
    }

    private double toRadians(double degree) {
        return (degree * Math.PI / 180.0);
    }

    private double toDegrees(double radian) {
        return (radian * 180 / Math.PI);
    }
}
