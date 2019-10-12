package pesek.dean.capstoneapi.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import pesek.dean.capstoneapi.models.Doctor;
import pesek.dean.capstoneapi.models.Patient;

public interface DoctorJpaRepository extends JpaRepository<Doctor, Integer>{
	
}
