package com.codegym.internship.document.repository;

import com.codegym.internship.document.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, Long> {

    List<Document> findByInternProfileIdOrderByUploadedAtDesc(Long internProfileId);
}
