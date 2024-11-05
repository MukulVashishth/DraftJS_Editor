import "./App.css";
import Title from "./components/Title";
import Button from "./components/Button";
import TextEditor from "./components/TextEditor";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { useState } from "react";

function App() {
  const [editorState, setEditorState] = useState(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      const contentState = convertFromRaw(JSON.parse(savedContent));
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  const saveContent = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    localStorage.setItem("editorContent", JSON.stringify(rawContentState));
    alert("Content saved!");
  };

  return (
    <div className="App">
      <div className="header">
        <Title text="Demo Editor By Mukul" className="title" />
        <Button label="Save" onClick={saveContent} />
      </div>
      <div className="editor-container">
        <TextEditor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
    </div>
  );
}

export default App;
