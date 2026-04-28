from sqlalchemy.orm import Session
from models import Folder, File

# =========================
# Folders & Files
# =========================

def validate_folder_creation(
    db: Session,
    name: str,
    path: str,
    depth: int,
    user_id: int,
):
    # Checking path
    if not path.startswith("/"):
        return False, "Path must start with '/'"
    
    if not path.endswith("/"):
        return False, "Path must end with '/'"

    if path == "/":
        if depth != 0:
            return False, "Root folder depth must be 0"
        return True, None

    normalized = path.rstrip("/")
    parent_path = "/".join(normalized.split("/")[:-1])
    if parent_path == "":
        parent_path = "/"

    parent = db.query(Folder).filter(
        Folder.user_id == user_id,
        Folder.path == parent_path
    ).first()

    if not parent:
        return False, "Parent folder does not exist"

    if depth != parent.depth + 1:
        return False, "Invalid depth"

    if normalized.split("/")[-1] != name:
        return False, "Folder name does not match path"

    exists = db.query(Folder).filter(
        Folder.user_id == user_id,
        Folder.path == path
    ).first()

    if exists:
        return False, "Folder already exists"

    return True, None

def create_folder(db: Session, name: str, path: str, depth: str, user_id: int):
    folder = Folder(
        name=name,
        path=path,
        depth=depth,
        user_id=user_id
    )

    db.add(folder)
    db.commit()
    db.refresh(folder)

    return folder # has folder id, folder name, folder path, user_id

def delete_folder(db: Session, folder_id: int, user_id: int):

   #validate folder actually exists
   #validate user owns the folder
   #delete folder and all its descendants (files and folders)
   # return paths of all deleted folders
    folder = (
        db.query(Folder)
        .filter(
            Folder.id == folder_id,
            Folder.user_id == user_id
        )
        .first()
    )

    if not folder:
        return False, "No folder"
    
    folder_path = folder.path
 
    folders_to_delete = (
        db.query(Folder)
        .filter(
            Folder.user_id == user_id,
            Folder.path.like(f"{folder_path}%")
        )
        .all()
    )

    folder_ids = [f.id for f in folders_to_delete]
    deleted_folders_paths = [f.path for f in folders_to_delete]

    # files_to_delete = (
    #     db.query(File)
    #     .filter(
    #         File.user_id == user_id,
    #         File.parent_folder_id.in_(folder_ids)
    #     )
    #     .all()
    # )

    # deleted_files_name = [f.name for f in files_to_delete]

    (
        db.query(File)
        .filter(
            File.user_id == user_id,
            File.parent_folder_id.in_(folder_ids)
        )
        .delete(synchronize_session=False)
    )

    (
        db.query(Folder)
        .filter(
            Folder.user_id == user_id,
            Folder.path.startswith(folder_path)
        )
        .delete(synchronize_session=False)
    )

    db.commit()

    return True, deleted_folders_paths
        

def get_folder(db: Session, folder_id:int, user_id: int):
   #validate folder actually exists
   #validate user owns the folder
   #return the folder requested
    folder = (
        db.query(Folder)
        .filter(
            Folder.id == folder_id,
            Folder.user_id == user_id
        )
        .first()
    ) 
    
    if not folder:
        return False, "Folder does not exist"
    
    return True, folder

def rename_folder(db: Session, folder_id:int, user_id: int, new_name:str):
   #validate folder actually exists
   #validate user owns the folder
   #change name of folder but also modify the path of the folder and its folder descendents
   #return changes as json (have to decide later a bit complex)
    folder = (
        db.query(Folder)
        .filter(
            Folder.id == folder_id,
            Folder.user_id == user_id
        )
        .first()
    )

    if not folder:
        return False, "Folder does not exist"
        
    old_path = folder.path

    parent_path = "/".join(old_path.rstrip("/").split("/")[:-1]) + "/"

    new_path = f"{parent_path}{new_name}/"

    conflict = (
        db.query(Folder)
        .filter(
            Folder.user_id == user_id,
            Folder.path.startswith(new_path),
            ~Folder.path.startswith(old_path)
        )
        .first()
    )

    if conflict:
        return False, "Folder conflict detected: destination already has folders"
    
    descendants_folders = (
        db.query(Folder)
        .filter(
            Folder.user_id == user_id,
            Folder.path.startswith(old_path)
        )
        .all()
    )
    descendants_folders_list = []

    for f in descendants_folders:
        prev_path = f.path
        f.path = f.path.replace(old_path, new_path, 1)
        descendants_folders_list.append({
            "old_path" : prev_path, 
            "new_path" : f.path
        })

    folder.name = new_name

    db.commit()

    return True, {
        "old_path": old_path,
        "new_path": new_path,
        "descendants": descendants_folders_list
    }
