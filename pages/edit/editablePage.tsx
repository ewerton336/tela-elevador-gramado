import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Importa o CSS do Quill
import axios from 'axios';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditablePageProps {
  onSave: (content: string) => void;
}

const EditablePage: React.FC<EditablePageProps> = ({ onSave }) => {
  const [content, setContent] = useState("");
  const quillRef = useRef<any>();

  const handleSave = () => {
    axios.post('http://localhost:5193/Avisos', { conteudo: content })
      .then(response => {
        alert('Aviso salvo com sucesso:');
      })
      .catch(error => {
        console.error('Erro ao salvar o aviso:', error);
      });
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'font': [] }],
        [{ 'color': [] }, { 'background': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
      />
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
};

export default EditablePage;
