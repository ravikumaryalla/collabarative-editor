import { LoaderIcon } from "lucide-react";
interface FullScreenLoaderProps {
  label?: string;
}

const FullScreenLoader = ({ label }: FullScreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col  justify-center items-center">
      <LoaderIcon className=" size-6 text-muted-foreground animate-spin" />
      {label && <p className="text-sm text-muted-foreground pt-2">{label}</p>}
    </div>
  );
};

export default FullScreenLoader;
