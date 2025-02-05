
import { useParams } from "next/navigation";
import CenterDetails from "../_components/CenterDetails/CenterDetails";



export default function CharityEvent() {
  const params = useParams(); // Получаем параметры из URL
  const id = params?.id as string;

  return (
    <main>
      <CenterDetails serviceId={id} />
    </main>
  );
}