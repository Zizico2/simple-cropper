import CropperApp from "../components/CropperApp";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Simple Cropper</h1>
      <CropperApp />
    </main>
  );
}
