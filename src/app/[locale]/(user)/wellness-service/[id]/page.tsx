import CenterDetails from "../_components/CenterDetails/CenterDetails";

interface Params {
  params: {
    id: string;
  };
}

export default function CharityEvent({ params }: Params) {
  return (
    <main>
      <CenterDetails serviceId={params.id} />
    </main>
  );
}