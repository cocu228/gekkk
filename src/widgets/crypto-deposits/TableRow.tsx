import Button from "@/shared/ui/button/Button";
import React from "react";
import scss from "@/pages/crypto-deposits/style.module.scss";
import {HelperClassName} from "@/shared/lib/helper-class-name";

const styles = new HelperClassName(scss)

const TableRow = ({val}) => {

    return <div className={styles.scss("row TableRow")}>
        <div className="col row-auto justify-start flex h-full">
            <div className="row">
                <div className="col">
                    <img width={17} height={10} src="/img/icon/RateGrowthIcon.svg" alt="UserIcon"/>
                </div>
            </div>
        </div>
        <div className="col h-full">
            <div className="row mb-2 flex items-start">
                <div data-text={"Rate grows"} className="col ellipsis inline-grid">
                    <p className="text-gray-400 text-sm whitespace-nowrap">Rate grows</p>
                </div>
            </div>
            <div className="row">
                <div data-text={val[0]} className="col ellipsis">
                    <p className="font-bold md:!text-fs12 text-normal">{val[0]}</p>
                </div>
            </div>
        </div>
        <div className="col justify-start flex h-full">
            <div className="row">
                <div className="col">
                    <img width={17} height={10} src="/img/icon/RateDropIcon.svg" alt="UserIcon"/>
                </div>
            </div>
        </div>
        <div className="col h-full">
            <div className="row mb-2 flex items-start">
                <div data-text={"Rate drops"} className="col ellipsis inline-grid">
                    <p className="text-gray-400 text-sm whitespace-nowrap">Rate drops</p>
                </div>
            </div>
            <div className="row">
                <div data-text={val[1]} className="col ellipsis inline-grid">
                    <p className="font-bold md:!text-fs12 text-normal">{val[1]}</p>
                </div>
            </div>
        </div>
        <div className="col">
            <Button custom className={styles.scss("Button")}>Open
                deposit</Button>
        </div>
    </div>
}

export default TableRow