import { NextPage } from "next";
import CenterDetails from "../_components/CenterDetails/CenterDetails";

interface PageProps {
  params: {
    id: string;
  };
}

const CharityEvent: NextPage<PageProps> = ({ params }) => {
  return (
    <main>
      <CenterDetails serviceId={params.id} />
    </main>
  );
};

export default CharityEvent;
