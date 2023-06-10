import React from 'react';
import {HelperClassName} from "@/shared/lib/helper-class-name";
import scss from "./style.module.scss"

const styles = new HelperClassName(scss)
function CardsGrid({children}: any) {
    return (
        <div className={styles.scss("Grid")}>
            {children}
        </div>
    );
}

export default CardsGrid;