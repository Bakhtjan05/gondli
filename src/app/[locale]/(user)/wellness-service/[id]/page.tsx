import CenterDetails from "../_components/CenterDetails/CenterDetails";

interface PageProps {
  params: { id: string };
}

export default async function CharityEvent({ params }: PageProps) {
  const id = await Promise.resolve(params.id);

  return (
    <main>
      <CenterDetails serviceId={id} />
    </main>
  );
}