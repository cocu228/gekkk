import {Skeleton} from "antd";
import Card from "@/shared/ui/card/Card";

const SkeletonCard = () => {
    return (
        <Card>
            <Skeleton active/>
        </Card>
    );
}

export default SkeletonCard;