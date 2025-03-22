import { createStore } from '@wsh-2025/client/src/app/createStore';
import { RecommendedSection } from '@wsh-2025/client/src/features/recommended/components/RecommendedSection';
import { useLoaderData } from 'react-router-dom'; // React Router のフックを追加

// prefetch はそのまま維持
export const prefetch = async (store: ReturnType<typeof createStore>) => {
  const modules = await store
    .getState()
    .features.recommended.fetchRecommendedModulesByReferenceId({ referenceId: 'entrance' });
  return { modules };
};

// HomePage は useLoaderData を使ってローダーからのデータを取得
export const HomePage = () => {
  // loaderの戻り値の型を指定
  const { modules } = useLoaderData() as Awaited<ReturnType<typeof prefetch>>;

  return (
    <>
      <title>Home - AremaTV</title>
      <div className="w-full py-[48px]">
        {modules.map((module) => {
          return (
            <div key={module.id} className="mb-[24px] px-[24px]">
              <RecommendedSection module={module} />
            </div>
          );
        })}
      </div>
    </>
  );
};
