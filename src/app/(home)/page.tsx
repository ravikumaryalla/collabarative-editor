import NavBar from "./NavBar";
import TemplateGallery from "./TemplateGallery";

export default function Home() {
  return (
    <div className="flex h-screen w-screen flex-col">
      <NavBar />
      <div className="mt-14 w-screen  bg-[#F1F3F4]">
        <TemplateGallery />
      </div>
    </div>
  );
}
