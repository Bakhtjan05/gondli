
import CenterDetails from "../_components/CenterDetails/CenterDetails";

interface PageProps {
  params: { id: string };
}

export default function CharityEvent({ params }: PageProps) {
  return (
    <main>
      <CenterDetails serviceId={params.id} />
    </main>
  );
}
