import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Importa o CSS do Quill

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditablePageProps {
  onSave: (content: string) => void;
}

const EditablePage: React.FC<EditablePageProps> = ({ onSave }) => {
  const [content, setContent] = useState("");

  const handleSave = () => {
    onSave(content);
  };

  return (
    <div>
      <ReactQuill theme="snow" value={content} onChange={setContent} />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default EditablePage;
