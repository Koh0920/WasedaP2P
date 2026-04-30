from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from db_init import Base
from datetime import datetime


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    course_name = Column(String, nullable=False)
    professor_name = Column(String, nullable=False)
    faculty = Column(String, nullable=False)
    department = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    semester = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    file_name = Column(String, nullable=False)
    file_data = Column(Text, nullable=False)  # stores file path on disk
    description = Column(Text, nullable=True)
    upvotes = Column(Integer, default=0, nullable=False)
    downvotes = Column(Integer, default=0, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow, nullable=False)

    uploader_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )

    uploader = relationship("UserModel", backref="notes")


class NoteReport(Base):
    __tablename__ = "note_reports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    note_id = Column(
        Integer,
        ForeignKey("notes.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    reporter_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE"),
        nullable=False,
        index=True
    )
    reason = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)