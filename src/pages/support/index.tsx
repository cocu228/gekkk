import QualityControl from "@/pages/support/components/quality-control";
import SupportHead from "@/pages/support/components/support-head";
import SupportLinks from "@/pages/support/components/support-links";
import "./styles.css"

const Support = () => {
    return (
      <div className="support-container">
          <SupportHead />
          <div className="support-main-container">
              <SupportLinks />
              <QualityControl />
          </div>
      </div>
    );
}

export default Support;