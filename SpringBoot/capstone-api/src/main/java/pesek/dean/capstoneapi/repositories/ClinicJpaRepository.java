package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pesek.dean.capstoneapi.models.Clinic;

public interface ClinicJpaRepository extends JpaRepository<Clinic, Integer>{

}
