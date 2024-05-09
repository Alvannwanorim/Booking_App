import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <CategorySearch />
      <DoctorList />
    </div>
  );
}
