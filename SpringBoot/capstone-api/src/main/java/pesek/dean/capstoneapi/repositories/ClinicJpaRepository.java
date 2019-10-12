package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import pesek.dean.capstoneapi.models.Clinic;

public interface ClinicJpaRepository extends JpaRepository<Clinic, Integer>{

	@Query("SELECT c FROM Clinic WHERE c.doctor = :dotcorId")
	Clinic findByDoctor(@Param("dotcorId")int dotcorId);
	
	@Query("SELECT c.numOfRooms FROM Clinic WHERE c.id = :clinicId")
	int getNumOfRooms(@Param("clinicId")int clinicId);
}
