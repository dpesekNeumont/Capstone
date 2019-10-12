package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pesek.dean.capstoneapi.models.Doctor;

public interface DoctorJpaRepository extends JpaRepository<Doctor, Integer>{

}
