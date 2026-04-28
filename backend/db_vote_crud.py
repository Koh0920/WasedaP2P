from sqlalchemy.orm import Session
from sqlalchemy import and_
from models import Vote, Folder, File
from typing import Optional
from datetime import datetime


# =========================
# Votes CRUD Operations
# =========================

def get_vote(
    db: Session, 
    user_id: int, 
    votable_type: str, 
    votable_id: int
) -> Optional[Vote]:
    """Get a specific vote by user and votable item"""
    return db.query(Vote).filter(
        and_(
            Vote.user_id == user_id,
            Vote.votable_type == votable_type,
            Vote.votable_id == votable_id
        )
    ).first()


def create_vote(
    db: Session, 
    user_id: int,
    votable_type: str,
    votable_id: int,
    vote_value: int
) -> Vote:
    """Create a new vote"""
    vote = Vote(
        user_id=user_id,
        votable_type=votable_type,
        votable_id=votable_id,
        vote_value=vote_value
    )
    db.add(vote)
    db.commit()
    db.refresh(vote)
    return vote


def update_vote(
    db: Session, 
    vote: Vote, 
    vote_value: int
) -> Vote:
    """Update an existing vote"""
    vote.vote_value = vote_value
    vote.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(vote)
    return vote


def delete_vote(db: Session, vote: Vote) -> None:
    """Delete a vote"""
    db.delete(vote)
    db.commit()


def get_vote_stats(
    db: Session, 
    votable_type: str, 
    votable_id: int,
    user_id: Optional[int] = None
) -> dict:
    """Get voting statistics for an item"""
    votes = db.query(Vote).filter(
        and_(
            Vote.votable_type == votable_type,
            Vote.votable_id == votable_id
        )
    ).all()
    
    upvote_count = sum(1 for v in votes if v.vote_value == 1)
    downvote_count = sum(1 for v in votes if v.vote_value == -1)
    
    user_vote = None
    if user_id:
        user_vote_obj = next((v for v in votes if v.user_id == user_id), None)
        user_vote = user_vote_obj.vote_value if user_vote_obj else None
    
    return {
        "upvote_count": upvote_count,
        "downvote_count": downvote_count,
        "score": upvote_count - downvote_count,
        "user_vote": user_vote
    }


def update_votable_counts(
    db: Session,
    votable_type: str,
    votable_id: int
):
    """Update cached vote counts on the votable item"""
    model_map = {
        "file": File,
        "folder": Folder,
    }
    
    model = model_map.get(votable_type)
    if not model:
        return False, f"Invalid votable_type: {votable_type}"
    
    item = db.query(model).filter(model.id == votable_id).first()
    if not item:
        return False, f"{votable_type.capitalize()} not found"
    
    stats = get_vote_stats(db, votable_type, votable_id)
    item.upvote_count = stats["upvote_count"]
    item.downvote_count = stats["downvote_count"]
    db.commit()
    
    return True, "Vote counts updated"


def validate_votable_exists(
    db: Session, 
    votable_type: str, 
    votable_id: int,
    user_id: int
):
    """Validate that the votable item exists and user has access"""
    model_map = {
        "file": File,
        "folder": Folder,
    }
    
    model = model_map.get(votable_type)
    if not model:
        return False, f"Invalid votable_type: {votable_type}"
    
    item = db.query(model).filter(
        model.id == votable_id,
        model.user_id == user_id
    ).first()
    
    if not item:
        return False, f"{votable_type.capitalize()} not found or access denied"
    
    return True, item


def get_user_votes(
    db: Session,
    user_id: int,
    skip: int = 0,
    limit: int = 100
):
    """Get all votes by a user"""
    votes = db.query(Vote).filter(
        Vote.user_id == user_id
    ).offset(skip).limit(limit).all()
    
    return votes
