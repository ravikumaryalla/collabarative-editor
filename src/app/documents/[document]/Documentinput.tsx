import { BsCloudCheck } from "react-icons/bs";
const Documentinput = () => {
  return (
    <div className="flex gap-2 items-center">
      <span className="text-lg truncate font-semibold">Untitled Document</span>
      <BsCloudCheck size={20} />
    </div>
  );
};

export default Documentinput;
