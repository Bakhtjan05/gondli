import CenterDetails from "../_components/CenterDetails/CenterDetails";

interface Params {
  params: {
    id: string;
  };
}

export default function CharityEvent({ params }: Params) {
  const { id } = params;

  return (
    <main>
      <CenterDetails serviceId={id} /> {/* Передаем ID в CenterDetails */}
    </main>
  );
}