export interface Project {
  id: string;
  name: string;
  user_id: string;
  created_at: string;
}

export interface CreateProjectDTO {
  name: string;
}

export interface UpdateProjectDTO {
  name: string;
}

export interface DeleteProjectDTO {
  id: string;
}
