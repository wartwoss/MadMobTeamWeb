import {useTranslations} from 'next-intl';
import Navbar from "../../components/Navbar";
import PageLoader from "../../components/PageLoader";
import ScrollProgress from "../../components/ScrollProgress";

export default function Projects() {
  const t = useTranslations('Projects');

  return (
    <>
      <PageLoader title={t('title')} />
      <ScrollProgress />
      <Navbar />
      <main className="flex flex-col items-center justify-center px-6 py-20">
        <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter">
          {t('title')}
        </h1>
        <p className="max-w-xl text-center font-mono text-lg">
          {t('description')}
        </p>
      </main>
    </>
  );
}