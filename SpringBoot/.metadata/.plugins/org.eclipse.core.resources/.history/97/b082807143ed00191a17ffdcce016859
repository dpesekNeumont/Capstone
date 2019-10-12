package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pesek.dean.capstoneapi.models.Address;
import pesek.dean.capstoneapi.models.Email;

public interface EmailJpaRepository extends JpaRepository<Email, Integer>{

	@Query("SELECT a FROM Address WHERE a.patient = :patientId")
	Address findByPatient(@Param("patientId")int patientId);
	
	@Query("SELECT a FROM Address WHERE a.doctor = :dotcorId")
	Address findByDoctor(@Param("dotcorId")int dotcorId);
}
