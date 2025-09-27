import Editor from "./Editor";
import ToolBar from "./ToolBar";
const Document = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <ToolBar />
      <Editor />
    </div>
  );
};

export default Document;
