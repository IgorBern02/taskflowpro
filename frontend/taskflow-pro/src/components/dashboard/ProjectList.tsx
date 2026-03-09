import { ProjectItem } from "./ProjectItem";

type Props = {
  projects: any[];
  onOpen: (id: string) => void;
  onEdit: (project: any) => void;
  onDelete: (project: any) => void;
};

export function ProjectList({ projects, onOpen, onEdit, onDelete }: Props) {
  return (
    <ul className="space-y-3">
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          onOpen={onOpen}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
