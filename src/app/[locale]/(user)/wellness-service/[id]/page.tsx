
import CenterDetails from "../_components/CenterDetails/CenterDetails";

export default function CharityEvent({ params }: { params: { id: string } }) {
  return (
    <main>
      <CenterDetails serviceId={params.id} />
    </main>
  );
}
