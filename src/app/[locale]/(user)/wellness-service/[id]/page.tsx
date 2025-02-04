import { NextPage } from "next";
import CenterDetails from "../_components/CenterDetails/CenterDetails";

interface PageProps {
  params: {
    id: string;
  };
}

const CharityEvent: NextPage<PageProps> = ({ params }) => {
    const { id } = params;

  return (
    <main>
      <CenterDetails serviceId={id} />
    </main>
  );
};

export default CharityEvent;
