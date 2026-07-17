package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.AttendanceDTO;
import com.training.studentmanagement.entity.Attendance;
import com.training.studentmanagement.entity.Course;
import com.training.studentmanagement.entity.Student;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.repository.AttendanceRepository;
import com.training.studentmanagement.repository.CourseRepository;
import com.training.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttendanceServiceImpl implements AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public AttendanceDTO markAttendance(AttendanceDTO dto) {
        if (attendanceRepository.existsByStudentIdAndCourseIdAndDate(
                dto.getStudentId(),
                dto.getCourseId(),
                dto.getDate())) {

            throw new RuntimeException("Attendance already marked for this student.");

        }
        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new StudentNotFoundException("Course not found"));

        if (!student.getCourses().contains(course)) {
            throw new RuntimeException("Student is not enrolled in this course.");
        }

        Attendance attendance = Attendance.builder()
                .student(student)
                .course(course)
                .date(dto.getDate())
                .status(dto.getStatus())
                .build();

        Attendance saved = attendanceRepository.save(attendance);

        return mapToDTO(saved);
    }

    @Override
    public List<AttendanceDTO> getAllAttendance() {

        return attendanceRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public AttendanceDTO getAttendanceById(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Attendance not found"));

        return mapToDTO(attendance);
    }

    @Override
    public AttendanceDTO updateAttendance(Long id, AttendanceDTO dto) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Attendance not found"));

        Student student = studentRepository.findById(dto.getStudentId())
                .orElseThrow(() -> new StudentNotFoundException("Student not found"));

        Course course = courseRepository.findById(dto.getCourseId())
                .orElseThrow(() -> new StudentNotFoundException("Course not found"));

        attendance.setStudent(student);
        attendance.setCourse(course);
        attendance.setDate(dto.getDate());
        attendance.setStatus(dto.getStatus());

        Attendance updated = attendanceRepository.save(attendance);

        return mapToDTO(updated);
    }

    @Override
    public void deleteAttendance(Long id) {

        Attendance attendance = attendanceRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Attendance not found"));

        attendanceRepository.delete(attendance);
    }

    private AttendanceDTO mapToDTO(Attendance attendance) {

        return AttendanceDTO.builder()
                .id(attendance.getId())
                .studentId(attendance.getStudent().getId())
                .courseId(attendance.getCourse().getId())
                .date(attendance.getDate())
                .status(attendance.getStatus())
                .build();
    }
}