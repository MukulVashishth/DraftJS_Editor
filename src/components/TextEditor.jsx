/* eslint-disable react/prop-types */
import { Editor, RichUtils } from "draft-js";

const TextEditor = ({ editorState, onEditorStateChange }) => {
  const handleBeforeInput = (input) => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const blockKey = selection.getStartKey();
    const block = currentContent.getBlockForKey(blockKey);
    const text = block.getText();

    if (text === "#" && input === " ") {
      applyHeadingStyle();
      return "handled";
    } else if (text === "*" && input === " ") {
      applyBoldStyle();
      return "handled";
    } else if (text === "**" && input === " ") {
      applyRedStyle();
      return "handled";
    } else if (text === "***" && input === " ") {
      applyUnderlineStyle();
      return "handled";
    }
    return "not-handled";
  };

  const applyHeadingStyle = () => {
    onEditorStateChange(RichUtils.toggleBlockType(editorState, "header-one"));
  };
  const applyBoldStyle = () => {
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  const applyRedStyle = () => {
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, "RED"));
  };
  const applyUnderlineStyle = () => {
    onEditorStateChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const customStyleMap = {
    RED: { color: "red" },
  };

  return (
    <Editor
      editorState={editorState}
      onChange={onEditorStateChange}
      handleBeforeInput={handleBeforeInput}
      customStyleMap={customStyleMap}
    />
  );
};

export default TextEditor;
