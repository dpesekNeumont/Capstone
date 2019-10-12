package pesek.dean.capstoneapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pesek.dean.capstoneapi.models.PhoneNumber;

public interface PhoneNumberJpaRepository extends JpaRepository<PhoneNumber, Integer>{

}