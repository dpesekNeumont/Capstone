package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pesek.dean.capstoneapi.models.Patient;

public interface PatientJpaRepository extends JpaRepository<Patient, Integer>{

//	@Query("SELECT p FROM Patient WHERE p.firstName = :firstName AND p.lastName = :lastName")
//	List<Patient> findByFirstNameAndLastName(@Param("firstName")String firstName, @Param("lastName")String lastName);
}
