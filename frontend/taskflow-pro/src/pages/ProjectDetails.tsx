import { useParams } from "react-router-dom";

export function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">Projeto {id}</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-4">TODO</h2>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-4">DOING</h2>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-4">DONE</h2>
        </div>
      </div>
    </div>
  );
}
