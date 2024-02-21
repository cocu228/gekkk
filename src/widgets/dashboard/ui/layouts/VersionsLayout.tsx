import versions from '@/../versions.json';
import VersionCard from "@/widgets/dashboard/ui/cards/version-card/VersionCard";

function AppVersions() {
    return (
        <div className="wrapper">
            {versions.map((ver) => <VersionCard key={ver.version} version={ver}/>)}
        </div>
    );
}

export default AppVersions;
