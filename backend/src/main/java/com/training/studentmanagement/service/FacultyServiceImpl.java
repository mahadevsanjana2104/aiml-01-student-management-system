package com.training.studentmanagement.service;

import com.training.studentmanagement.dto.FacultyDTO;
import com.training.studentmanagement.entity.Faculty;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.exception.StudentNotFoundException;
import com.training.studentmanagement.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyServiceImpl implements FacultyService {

    @Autowired
    private FacultyRepository facultyRepository;

    @Override
    public FacultyDTO addFaculty(FacultyDTO facultyDTO) {

        if (facultyRepository.existsByEmail(facultyDTO.getEmail())) {
            throw new RuntimeException("Faculty email already exists");
        }

        Faculty faculty = mapToEntity(facultyDTO);

        Faculty savedFaculty = facultyRepository.save(faculty);

        return mapToDTO(savedFaculty);
    }

    @Override
    public List<FacultyDTO> getAllFaculty() {

        return facultyRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Override
    public FacultyDTO getFacultyById(Long id) {

        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Faculty not found with id : " + id));

        return mapToDTO(faculty);
    }

    @Override
    public FacultyDTO updateFaculty(Long id, FacultyDTO facultyDTO) {

        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Faculty not found with id : " + id));

        faculty.setName(facultyDTO.getName());
        faculty.setEmail(facultyDTO.getEmail());
        faculty.setPhone(facultyDTO.getPhone());
        faculty.setDepartment(facultyDTO.getDepartment());
        faculty.setDesignation(facultyDTO.getDesignation());

        Faculty updatedFaculty = facultyRepository.save(faculty);

        return mapToDTO(updatedFaculty);
    }

    @Override
    public void deleteFaculty(Long id) {

        Faculty faculty = facultyRepository.findById(id)
                .orElseThrow(() ->
                        new StudentNotFoundException("Faculty not found with id : " + id));

        facultyRepository.delete(faculty);

    }

    private FacultyDTO mapToDTO(Faculty faculty) {

        return FacultyDTO.builder()
                .id(faculty.getId())
                .name(faculty.getName())
                .email(faculty.getEmail())
                .phone(faculty.getPhone())
                .department(faculty.getDepartment())
                .designation(faculty.getDesignation())
                .build();
    }

    private Faculty mapToEntity(FacultyDTO dto) {

        return Faculty.builder()
                .id(dto.getId())
                .name(dto.getName())
                .email(dto.getEmail())
                .phone(dto.getPhone())
                .department(dto.getDepartment())
                .designation(dto.getDesignation())
                .build();
    }
}