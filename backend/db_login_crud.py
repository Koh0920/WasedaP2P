from sqlalchemy.orm import Session
from models import UserModel, UserRole, Folder, File
from passlib.context import CryptContext


# Password hashing
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# =========================
# Login & Sign up
# =========================

# Find a user_id by username
def get_user_id(db: Session, username: str):
    data = db.query(UserModel).filter(UserModel.username == username).first()
    if data:
        return data.id
    return None

# Find a user by user_id
def get_user_by_id(db: Session, user_id: int):
    return db.query(UserModel).filter(UserModel.id == user_id).first()

# Get all users
def get_users(db:Session):
    return db.query(UserModel).all()

# Get a user's role
def get_user_role(db: Session, user_id: int):
    data = db.query(UserModel).filter(UserModel.id == user_id).first()
    if data:
        return data.role
    return None

# Delete an user
def delete_user(db: Session, username: str, password: str):
    user = db.query(UserModel).filter(UserModel.username == username).first()
    if not user:
        return False

    if not pwd_context.verify(password, user.hashed_password):
        return False

    db.delete(user)
    db.commit()
    return True

# Add new user
def create_user(db: Session, username: str, full_name: str | None, email: str, password: str):    
    hashed_password = pwd_context.hash(password)
    new_user = UserModel(
        username=username, 
        full_name=full_name, 
        email=email, 
        hashed_password=hashed_password, 
        role=UserRole.user
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    root_folder = Folder(
        name = username,
        path = f"/",
        depth = 0,
        user_id = new_user.id,
    )

    db.add(root_folder)
    db.commit()
    
    print(f"User created: {new_user.email}, Role in DB: {new_user.role}")
    
    return new_user
