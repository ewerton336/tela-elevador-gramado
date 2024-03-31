import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Importa o CSS do Quill
import { Endpoints } from "../../src/app/components/endponts/endponts";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Footer from "@/app/components/footer/footer";
import { useTheme } from "@/app/contexts/theme-context";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });


interface EditablePageProps {
  onSave: (content: string) => void;
}

const EditablePage: React.FC<EditablePageProps> = ({ onSave }) => {
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSave = async () => {
    try {
      const response = await Endpoints.salvarAviso(content);
      alert('Aviso salvo com sucesso:');
      router.push("/");
    } catch (error) {
      console.error('Erro ao salvar o aviso:', error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'header': '5' }, { 'header': '6' }, { 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'color': [] }, { 'background': [] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'align': '' }, { 'align': 'center' }, { 'align': 'right' }, { 'align': 'justify' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };

  const formats = [
    'header',
    'font',
    'size',
    'color',
    'background',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'link',
    'image',
    'clean',
  ];

  return (
    <div style={{ width: "800px", margin: "0 auto" }}>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Digite seu texto aqui..."
        style={{ height: "500px", marginBottom: "20px" }} 
      />
      <Button variant="contained" color="primary" onClick={handleSave} style={{ marginBottom: "20px" }}>
        Salvar
      </Button>
      <Footer/>
    </div>
  );
};

export default EditablePage;
