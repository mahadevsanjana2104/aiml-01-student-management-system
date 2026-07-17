
package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.CourseSummaryDTO;
import com.training.studentmanagement.dto.StudentDTO;
import com.training.studentmanagement.entity.Course;
import com.training.studentmanagement.entity.Student;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import com.training.studentmanagement.repository.CourseRepository;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private CourseRepository courseRepository;

    @Override
    public StudentDTO addStudent(StudentDTO studentDTO) {

        if(studentRepository.existsByEmail(studentDTO.getEmail())){
            throw new RuntimeException("Email already exists");
        }

        Student student = mapToEntity(studentDTO);

        Student savedStudent = studentRepository.save(student);

        return mapToDTO(savedStudent);
    }

    @Override
    public List<StudentDTO> getAllStudents() {

        return studentRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public StudentDTO getStudentById(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id : " + id));

        return mapToDTO(student);
    }

    @Override
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id : " + id));

        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        student.setPhone(studentDTO.getPhone());
        student.setDepartment(studentDTO.getDepartment());
        student.setCourse(studentDTO.getCourse());
        student.setYear(studentDTO.getYear());
        student.setAddress(studentDTO.getAddress());

        Student updatedStudent = studentRepository.save(student);

        return mapToDTO(updatedStudent);
    }

    @Override
    public void deleteStudent(Long id) {

        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id : " + id));

        studentRepository.delete(student);

    }
    @Override
    public StudentDTO enrollCourse(Long studentId, Long courseId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new StudentNotFoundException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() ->
                        new StudentNotFoundException("Course not found"));

        student.getCourses().add(course);

        studentRepository.save(student);

        return mapToDTO(student);
    }

    // ==========================
    // Mapping Methods
    // ==========================

    private StudentDTO mapToDTO(Student student) {

        return StudentDTO.builder()
                .id(student.getId())
                .firstName(student.getFirstName())
                .lastName(student.getLastName())
                .email(student.getEmail())
                .phone(student.getPhone())
                .department(student.getDepartment())
                .course(student.getCourse())
                .year(student.getYear())
                .address(student.getAddress())
                .courses(
                        student.getCourses()
                                .stream()
                                .map(course -> CourseSummaryDTO.builder()
                                        .id(course.getId())
                                        .courseName(course.getCourseName())
                                        .courseCode(course.getCourseCode())
                                        .build())
                                .toList()
                )
                .build();
    }

    private Student mapToEntity(StudentDTO dto){

        return Student.builder()
                .id(dto.getId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .department(dto.getDepartment())
                .course(dto.getCourse())
                .year(dto.getYear())
                .address(dto.getAddress())
                .build();
    }

}