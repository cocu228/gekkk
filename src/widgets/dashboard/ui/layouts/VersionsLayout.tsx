import versions from "@/../versions.json";
import VersionCard from "@/widgets/dashboard/ui/cards/version-card/VersionCard";

function AppVersions() {
  return (
    <div className='wrapper'>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-call */}
      {versions[import.meta.env.VITE_APP_TYPE]?.map(ver => <VersionCard key={ver.version} version={ver} />)}
    </div>
  );
}

export default AppVersions;
