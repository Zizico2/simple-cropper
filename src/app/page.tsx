import CropperApp from "../components/CropperApp";

export default async function Home() {
  return (
    <main className="max-w-[600px] mr-auto sm:mx-auto p-6 pr-12 sm:pr-6 relative page-edge-fade">
      <h1 className="text-center mb-4 text-[1.3rem]">Simple Cropper</h1>
      <CropperApp />
    </main>
  );
}
