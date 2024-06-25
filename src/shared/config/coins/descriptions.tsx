import ETokensConst from './constants';
import {scrollToTop} from "@/shared/lib/helpers";
import {NavigateFunction} from "react-router-dom";
import {AccountRights} from "@/shared/config/mask-account-rights";
import {IWalletInfo} from "@/shared/store/accounts/accounts";
import {useTranslation} from 'react-i18next';
import { IS_GEKKARD_APP } from '@/shared/lib';

export function getTokenDescriptions(navigate: NavigateFunction, account: IWalletInfo | null) {
    const gekkardUrl = import.meta.env.VITE_GEKKARD_URL;
    const {t} = useTranslation();

    return {
        [ETokensConst.ONEINCH]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("oneinch.unites")}
            </p>

            <p className='mb-3'>
                {t("oneinch.exchange")}
            </p>

            <div className='font-bold mt-3'>dApp</div>

            <p>
                {t("oneinch.app")}
            </p>

            <div className='font-bold mt-3'>{t("oneinch.wallet")}</div>

            <p>
                {t("oneinch.digital")}
            </p>

            <div className='font-bold mt-3'>{t("oneinch.protocol")}</div>

            <p>
                {t("oneinch.liquidity")}
            </p>

            <div className='font-bold mt-3'>{t("oneinch.order")}</div>

            <p>
                {t("oneinch.allows")}
            </p>

            <div className='font-bold mt-3'>{t("oneinch.governance")}</div>

            <p>
                {t("oneinch.autonomous")}
            </p>
        </div>,

        [ETokensConst.AAVE]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("aave.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("aave.overcollateralized")}
            </p>

            <p className='mb-3'>
                {t("aave.native")}
            </p>
        </div>,

        [ETokensConst.AGLD]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("agld.randomized")}
            </p>

            <p className='mb-3'>
                {t("agld.launched")}
            </p>

            <div className='font-bold'>{t("agld.founders")}</div>

            <p className='mb-3'>
                {t("agld.protocol")}
            </p>

            <div className='font-bold mb-2'>{t("agld.adventure")}</div>

            <p className='mb-3'>
                {t("agld.approach")}
            </p>

            <p className='mb-3'>
                {t("agld.reputable")}
            </p>

            <div className='font-bold mb-2'>{t("agld.many")}</div>

            <p className='mb-3'>
                {t("agld.supply")}
            </p>

            <div className='font-bold mb-2'>{t("agld.secured")}</div>

            <p className='mb-3'>
                {t("agld.provide")}
            </p>

            <p>
                {t("agld.applications")}
            </p>
        </div>,

        [ETokensConst.ANKR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ankr.developer")}
            </p>

            <p className='mb-3'>
                {t("ankr.computing")}
            </p>

            <div className='font-bold mb-2'>{t("ankr.token")}</div>

            <p>
                {t("ankr.utility")}
            </p>
        </div>,

        [ETokensConst.APE]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ape.governance")}
            </p>

            <p className='mb-3'>
                {t("ape.framework")}
            </p>

            <p className='mb-3'>
                {t("ape.allowing")}
            </p>

            <p className='mb-3'>
                {t("ape.access")}
            </p>

            <p>
                {t("ape.gifted")}
            </p>
        </div>,

        [ETokensConst.ANT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("ant.aragon_is")}
            </p>
        </div>,

        [ETokensConst.ARPA]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("arpa.separate")}
            </p>

            <p>
                {t("arpa.blockchains")}
            </p>
        </div>,

        [ETokensConst.AVAX]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("avax.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("avax.provide")}
            </p>

            <p>
                {t("avax.competitor")}
            </p>
        </div>,

        [ETokensConst.AXS]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("axs.gaming")}
            </p>

            <p>
                {t("axs.governance")}
            </p>
        </div>,

        [ETokensConst.ADA]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ada.third_generation")}
            </p>

            <p className='mb-3'>
                {t("ada.co_founder")}
            </p>

            <p>
                {t("ada.blockchain_platform")}
            </p>
        </div>,

        [ETokensConst.ATOM]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("atom.ecosystem")}
            </p>

            <p>
                {t("atom.cryptocurrency")}
            </p>
        </div>,

        [ETokensConst.BAL]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("bal.portfolio")}
            </p>

            <p className='mb-3'>
                {t("bal.network")}
            </p>

            <p className='mb-3'>
                {t("bal.allocations")}
            </p>

            <p className='mb-3'>
                {t("bal.platform")}
            </p>

            <p className='mb-3'>
                {t("bal.mission")}
            </p>

            <p>
                {t("bal.governance")}
            </p>
        </div>,

        [ETokensConst.BAND]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("band.connecting")}
            </p>

            <p className='mb-3'>
                {t("band.instead")}
            </p>

            <p className='mb-2'>
                {t("band.attempts")}
            </p>

            <ol className='pl-[25px] list-decimal mb-3'>
                <li className='mb-1'>
                    {t("band.centralization")}
                </li>

                <li className='mb-1'>
                    {t("band.solutions")}
                </li>

                <li className='mb-1'>
                    {t("band.pricey")}
                </li>
            </ol>

            <p className='mb-2'>{t("band.advantages")}</p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    {t("band.decentralization")}
                </li>

                <li className='mb-1'>
                    {t("band.scripts")}
                </li>

                <li className='mb-1'>
                    {t("band.interested")}
                </li>
            </ul>

            <p>{t("band.based")}</p>
        </div>,

        [ETokensConst.BICO]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("bico.developer")}
            </p>

            <p>
                {t("bico.platform")}
            </p>
        </div>,

        [ETokensConst.BLZ]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("blz.blockchain")}
            </p>

            <p className='mb-2'>{t("blz.features")}</p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>{t("blz.fast")}</li>
                <li className='mb-1'>{t("blz.decentralized")}</li>
                <li className='mb-1'>{t("blz.defi")}</li>
                <li className='mb-1'>{t("blz.high")}</li>
            </ul>

            <p className='mb-3'>
                {t("blz.efficient")}
            </p>

            <p className='mb-3'>
                {t("blz.experienced")}
            </p>

            <p>
                {t("blz.key")}
            </p>
        </div>,

        [ETokensConst.BNT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("bnt.collection")}
            </p>

            <p className='mb-3'>
                {t("bnt.based")}
            </p>

            <p className='mb-3'>
                {t("bnt.center")}
            </p>

            <p>
                {t("bnt.collects")}
            </p>
        </div>,

        [ETokensConst.BTT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("btt.technology")}
            </p>

            <p className='mb-3'>
                {t("btt.portion")}
            </p>

            <p className='mb-3'>
                {t("btt.occurs")}
            </p>

            <p className='mb-3'>
                {t("btt.pieces")}
            </p>

            <p className='mb-3'>
                {t("btt.allow")}
            </p>

            <p className='mb-3'>
                {t("btt.directly")}
            </p>

            <p>
                {t("btt.cryptographic")}
            </p>
        </div>,

        [ETokensConst.C98]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("c98.platform")}
            </p>

            <p className='mb-2'>
                {t("c98.governance")}
            </p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    {t("c98.providers")}
                </li>

                <li className='mb-1'>
                    {t("c98.holders")}
                </li>

                <li className='mb-1'>
                    {t("c98.bifurcated")}
                </li>
            </ul>
        </div>,

        [ETokensConst.COMP]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("comp.govern")}
            </p>

            <div className='font-bold mb-2'>{t("comp.begin")}</div>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    {t("comp.lend")}
                </li>

                <li className='mb-1'>
                    {t("comp.share")}
                </li>
            </ul>

            <p>
                {t("comp.interact")}
            </p>
        </div>,

        [ETokensConst.CRV]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("crv.widely")}
            </p>

            <p>
                {t("crv.about")}
            </p>
        </div>,

        [ETokensConst.CTSI]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ctsi.utility")}
            </p>

            <p className='mb-3'>
                {t("ctsi.staking")}
            </p>

            <p>
                {t("ctsi.secured")}
            </p>
        </div>,

        [ETokensConst.CVC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("cvc.ecosystem")}
            </p>

            <p className='mb-3'>
                {t("cvc.experience")}
            </p>

            <p>
                {t("cvc.support")}
            </p>
        </div>,

        [ETokensConst.DASH]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("dash.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("dash.mainstream")}
            </p>

            <p className='mb-2'>
                {t("dash.broader")}
            </p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    {t("dash.transaction")}
                </li>

                <li className='mb-1'>
                    {t("dash.costs")}
                </li>

                <li className='mb-1'>
                    {t("dash.secures")}
                </li>
            </ul>

            <p className='mb-3'>
                {t("dash.native")}
            </p>

            <p>
                {t("dash.supply")}
            </p>
        </div>,

        [ETokensConst.ENJ]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("enj.community")}
            </p>

            <p>
                {t("enj.platform")}
            </p>
        </div>,

        [ETokensConst.ENS]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ens.system")}
            </p>

            <p className='mb-3'>
                {t("ens.registrar")}
            </p>

            <p className='mb-3'>
                {t("ens.resolvers")}
            </p>

            <p className='mb-3'>
                {t("ens.understand")}
            </p>

            <p className='mb-3'>
                {t("ens.enables")}
            </p>

            <p>
                {t("ens.autonomous")}
            </p>
        </div>,

        [ETokensConst.EOS]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("eos.leveraging")}
            </p>

            <p className='mb-3'>
                {t("eos.features")}
            </p>

            <p className='mb-3'>
               {t("eos.infrastructure")}
            </p>

            <p>
                {t("eos.native")}
            </p>
        </div>,

        [ETokensConst.FIL]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("fil.introduces")}
            </p>

            <p className='mb-3'>
                {t("fil.clients")}
            </p>

            <p className='mb-3'>
                {t("fil.data")}
            </p>

            <p>{t("fil.cryptocurrency")}</p>
        </div>,

        [ETokensConst.GALA]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("gala.secured")}
            </p>

            <p className='mb-3'>
                {t("gala.participants")}
            </p>

            <p className='mb-3'>
                {t("gala.desires")}
            </p>

            <p>
                {t("gala.backbone")}
            </p>
        </div>,

        [ETokensConst.GRT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("grt.indexing")}
            </p>

            <p className='mb-3'>
                {t("grt.complex")}
            </p>

            <p>
                {t("grt.native")}
            </p>
        </div>,

        [ETokensConst.ICX]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("icx.protocol")}
            </p>

            <p className='mb-3'>
                {t("icx.remove")}
            </p>

            <p className='mb-3'>
                {t("icx.essentially")}
            </p>

            <p>
                {t("icx.supports")}
            </p>
        </div>,

        [ETokensConst.IDEX]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("idex.hybrid")}
            </p>

            <p className='mb-3'>
                {t("idex.aspects")}
            </p>

            <p className='mb-3'>
                {t("idex.contract")}
            </p>

            <p className='mb-3'>
                {t("idex.economics")}
            </p>

            <p className='mb-3'>
                {t("idex.record")}
            </p>

            <p>
                {t("idex.placed")}
            </p>
        </div>,

        [ETokensConst.INJ]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("inj.blockchain")}
            </p>

            <p className='mb-3'>
                {t("inj.infrastructure")}
            </p>

            <p className='mb-3'>
                {t("inj.interoperable")}
            </p>

            <p>
                {t("inj.ecosystem")}
            </p>
        </div>,

        [ETokensConst.USDT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("tether_info_p1")}
            </p>

            <p className='mb-3'>
                {t("tether_info_p2")}
            </p>

            <p>
                {t("tether_info_p3")}
            </p>
        </div>,

        [ETokensConst.BCH]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("bch.important")}
            </p>

            <p className='mb-3'>
                {t("bch.factions")}
            </p>

            <p>
                {t("bch.began")}
            </p>
        </div>,

        [ETokensConst.KNC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("knc.liquidity")}
            </p>

            <p className='mb-3'>
                {t("knc.transactions")}
            </p>

            <p className='mb-3'>
                {t("knc.issue")}
            </p>

            <p>
                {t("knc.governance")}
            </p>
        </div>,

        [ETokensConst.KSM]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ksm.scalable")}
            </p>

            <p className='mb-3'>
                {t("ksm.developers")}
            </p>

            <p>
                {t("ksm.native")}
            </p>
        </div>,

        [ETokensConst.LPT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("lpt.decentralized")}
            </p>

            <p className='mb-3'>
                {t("lpt.website")}
            </p>

            <p className='mb-3'>
                {t("lpt.creators")}
            </p>

            <p>
                {t("lpt.rewarding")}
            </p>
        </div>,

        [ETokensConst.LRC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("lrc.describes")}
            </p>

            <p className='mb-3'>
                {t("lrc.trading")}
            </p>

            <p className='mb-3'>
                {t("lrc.purpose")}
            </p>

            <p>
                {t("lrc.seeks")}
            </p>
        </div>,

        [ETokensConst.MASK]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("mask.gateway")}
            </p>

            <p className='mb-3'>
                {t("mask.aiming")}
            </p>

            <p className='mb-3'>
                {t("mask.solve")}
            </p>

            <ol className='pl-[16px] list-disc'>
                <li className='mb-3'>
                    {t("mask.content")}
                </li>

                <li className='mb-3'>
                    {t("mask.encrypted")}
                </li>

                <li className='mb-3'>
                    {t("mask.widgets")}
                </li>

                <li className='mb-3'>
                    {t("mask.create")}
                </li>

                <li className='mb-3'>
                    {t("mask.trade")}
                </li>

                <li className='mb-3'>
                    {t("mask.store")}
                </li>
            </ol>

            <p>
                {t("mask.governance")}
            </p>
        </div>,

        [ETokensConst.MIR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("mir.synthetic")}
            </p>

            <p className='mb-3'>
                {t("mir.access")}
            </p>

            <p className='mb-3'>
                {t("mir.blockchain")}
            </p>

            <p>
                {t("mir.token")}
            </p>
        </div>,

        [ETokensConst.MKR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("mkr.governance")}
            </p>

            <p className='mb-3'>
                {t("mkr.consists")}
            </p>

            <ol className='pl-[16px] list-disc'>
                <li className='mb-3'>
                    <b>MakerDAO:</b> {t("mkr.community")}
                </li>

                <li className='mb-3'>
                    <b>Maker Protocol:</b> {t("mkr.developed")}

                    <ul className='pl-[25px] list-disc'>
                        <li><b>Dai:</b>
                            {t("mkr.decentralized")}
                        </li>

                        <li><b>MKR:</b>
                            {t("mkr.stakeholders")}
                        </li>
                    </ul>
                </li>
            </ol>
        </div>,

        [ETokensConst.MLN]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("mln.mln_is")}
            </p>
        </div>,

        [ETokensConst.OGN]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ogn.platform")}
            </p>

            <p className='mb-3'>
                {t("ogn.billion")}
            </p>

            <p>
                {t("ogn.powers")}
            </p>
        </div>,

        [ETokensConst.OMG]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("omg.omg_is")}
            </p>
        </div>,

        [ETokensConst.OXT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("oxt.oxt_is")}
            </p>
        </div>,

        [ETokensConst.POWR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("powr.technology")}
            </p>

            <p>
                {t("powr.ecosystem")}
            </p>
        </div>,

        [ETokensConst.REN]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("ren.ren_is")}
            </p>
        </div>,

        [ETokensConst.REQ]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("req.protocol")}
            </p>

            <p className='mb-3'>
                {t("req.important")}
            </p>

            <p className='mb-3'>
                {t("req.transactions")}
            </p>

            <p className='mb-3'>
                {t("req.advantage")}
            </p>

            <p>
                {t("req.deflationary")}
            </p>
        </div>,

        [ETokensConst.RLC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("rlc.rlc_is")}
            </p>
        </div>,

        [ETokensConst.SAND]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("sand.sand_is")}
            </p>
        </div>,

        [ETokensConst.SNX]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("snx.software")}
            </p>

            <p className='mb-3'>
                {t("snx.whitepaper")}
            </p>

            <p className='mb-3'>
                {t("snx.native")}
            </p>

            <p>
                {t("snx.placed")}
            </p>
        </div>,

        [ETokensConst.SRM]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("srm.protocol")}
            </p>

            <p className='mb-3'>
                {t("srm.offers")}
            </p>

            <p>
                {t("srm.token")}
            </p>
        </div>,

        [ETokensConst.STORJ]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("storj.storj_is")}
            </p>
        </div>,

        [ETokensConst.SUSHI]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("sushi.sushi_is")}
            </p>
        </div>,

        [ETokensConst.TRIBE]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                TRIBE is an Ethereum token that governs Fei Protocol, which issues a separate,
                decentralized stablecoin called FEI that attempts to maintain a value of US$1.00.
                TRIBE can be used to vote for Fei Protocol upgrades and to adjust FEI stablecoin
                monetary policy.
            </p>
        </div>,

        [ETokensConst.USDC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("usdc.usdc_is")}
            </p>
        </div>,

        [ETokensConst.WAVES]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("waves.multipurpose")}
            </p>

            <p>
                {t("waves.utilized")}
            </p>
        </div>,

        [ETokensConst.XLM]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("xlm.powers")}
            </p>

            <p>
                {t("xlm.computers")}
            </p>
        </div>,

        [ETokensConst.YFI]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p>
                {t("yfi.yfi_is")}
            </p>
        </div>,

        [ETokensConst.ZEC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("zec.decentralized")}
            </p>

            <p className='mb-3'>
                {t("zec.anonymity")}
            </p>

            <p className='mb-3'>
                {t("zec.native")}
            </p>

            <p>
                {t("zec.succinct")}
            </p>
        </div>,

        [ETokensConst.BNB]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("bnb.binance_coin_is")}
            </p>

            <p className='mb-3'>
                {t("bnb.bnb_was_initially")}
            </p>

            <p className='mb-3'>
                {t("bnb.every_quarter")}
            </p>

            <p>
                {t("bnb.binance_was_created")}
            </p>
        </div>,

        [ETokensConst.BTC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("btc.first_cryptocurrency")}
            </p>

            <p className='mb-2'>{t("btc.bitcoin_value_factors")}</p>

            <ul className='pl-[25px] list-disc'>
                <li className='mb-1'>{t("btc.ideology")}</li>
                <li className='mb-1'>{t("btc.demand_increasing")}
                </li>
                <li className='mb-1'>{t("btc.emission_limit")}</li>
                <li className='mb-1'>{t("btc.mining_requirements")}</li>
            </ul>
        </div>,

        [ETokensConst.DAI]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("dai.the_dai_stablecoin")}
            </p>

            <p className='mb-3'>
                {t("dai.dai_is_held")}
            </p>

            <p className='mb-3'>
                {t("dai.dai_is_easy")}
            </p>

            <p className='mb-3'>
                {t("dai.once_generated")}
            </p>

            <p>
                {t("dai.every_dai")}
            </p>
        </div>,

        [ETokensConst.DOGE]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("doge.open_source")}
            </p>

            <p className='mb-3'>
                {t("doge.initially_started")}
            </p>

            <p className='mb-3'>
                {t("doge.based_on")}
            </p>

            <p>
                {t("doge.loyal_community")}
            </p>
        </div>,

        [ETokensConst.DOT]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("dot.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("dot.differs")}
            </p>

            <p>
                {t("dot.another")}
            </p>
        </div>,

        [ETokensConst.ETC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("etc.decentralized")}
            </p>

            <p>
                {t("etc.philosophical")}
            </p>
        </div>,

        [ETokensConst.ETH]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("eth.etherum_is_both")}
            </p>

            <p className='mb-3'>
                {t("eth.ethereum_is_similar")}
            </p>

            <ul className='pl-[25px] list-disc'>
                <li className='mb-1'>
                    {t("eth.smart_contracts_are")}
                </li>
                <li className='mb-1'>
                    {t("eth.smart_contracts_eliminate")}
                </li>
            </ul>
        </div>,

        // [ETokensConst.EUR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
        //     <p className='mb-3'>
        //         Euro (EURG) is the fiat currency of the Eurozone countries.
        //         On the Gekkard platform, Euros can be exchanged for EURG cryptocurrency
        //         according to the terms and conditions on this website and in the Gekkard App.
        //     </p>
        // </div>,

        [ETokensConst.EURG]: (
          <div>
              <div className="mb-[10px]">
                  <p className="mb-3">
                      {t("EUR_is_utility_token")}&nbsp;
                      <a
                        target="_blank"
                        href={`${gekkardUrl ?? "https://dev.gekkard.com"}/app-release.apk`}
                        className="font-bold underline hover:cursor-pointer"
                        rel="noopener noreferrer"
                      >
                          {t("gekkard_app")}
                      </a>.
                  </p>

                  <p>
                      {t("for_more_information")}&nbsp;
                      <a
                        target="_blank"
                        href="https://gekkoin.com/source/Gekkoin_EURG_WP.pdf"
                        className="underline font-bold hover:cursor-pointer"
                        rel="noopener noreferrer"
                      >
                          {t("white_paper")}
                      </a>.
                  </p>
              </div>


              {IS_GEKKARD_APP() &&
                <>
                    <div className="row  flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
                        <div className="text-[14px]">
                            {t("exchange_rate_fixed")}: <span className="font-[700]">1 EUR = 1 EURG*</span>
                        </div>
                        <div className="col text-xs">
                            {account && <span>{t("exchange_fee")} 1,5%.
                                {account.rights[AccountRights.IsJuridical] ? null : <>
                                    {t("if_you")} <a
                                  className="underline hover:text-blue-400 hover:cursor-pointer font-semibold"
                                  onClick={() => {
                                      navigate("/wallet?currency=GKE&tab=no_fee_program");
                                        scrollToTop();
                                    }}
                                >
                                    {t("freeze_GKE_tokens")}
                                </a> {t("fee_is")} 0%.
                                </>}
                        </span>}
                        </div>
                    </div>
                    <div className='info-box-description mb-4'>
                            <p className='font-bold text-[14px]'>4% {t("AER_interest")}</p>
                            <p>{t("you_get_per_annum")}:</p>
                        <ul className='list-disc list-inside'>
                            <li>{t("your_weighted_average")};</li>
                            <li>{t("our_upper_limit")}.</li>
                        </ul>
                    </div>
                </>
            }

            <div>
                <p className='mb-3'>
                    {t("EURG_tokens_created")}:
                </p>

                <ul className='pl-[25px] list-disc mb-3'>
                    <li><a
                        className='underline font-bold hover:cursor-pointer'
                        href='https://gekkoin.com/source/Emission-rules-Gekkoin.pdf'
                        target="_blank"
                        rel="noopener noreferrer"
                    >{t("reglament_emission")};</a></li>
                    <li><a
                        className='underline font-bold hover:cursor-pointer'
                        href='https://gekkoin.com/source/Token-distribution-report.pdf'
                        target="_blank"
                        rel="noopener noreferrer"
                    >{t("token_distribution_report")}.</a></li>
                </ul>

                <p>
                    {t("EURG_built_on")} <a
                    className='underline font-bold hover:cursor-pointer'
                    href='https://gekkoin.com/source/Gekkoin_SC_Secondary_Audit_Report.pdf'
                    target="_blank"
                    rel="noopener noreferrer"
                >{t("here")}</a>.
                </p>
            </div>

        </div>
        ),

        [ETokensConst.EVER]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                Everscale is a new and unique blockchain design that proposes a scalable decentralized world computer,
                paired with a distributed operating system.
            </p>

            <p className='mb-3'>
                Everscale is based on a platform called EVER OS, capable of processing millions of transactions per
                second, with Turing-complete smart contracts and decentralized user interfaces.
            </p>

            <p className='mb-3'>
                Everscale presents some new and unique properties, such as dynamic multithreading, soft majority
                consensus and distributed programming, which enable it to be scalable, fast and secure at the same time.
                It is governed by a decentralized community founded upon meritocratic principles via Soft Majority
                Voting protocol.
            </p>

            <p>
                Everscale has powerful developer tools, such as compilers for Solidity and C++, sdk and api, client
                libraries ported to more than 20 languages and platforms, a range of decentralized browsers and wallets
                empowering many applications in DeFi, NFT, tokenization and governance domains.
            </p>
        </div>,

        [ETokensConst.GKE]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("GKE_tokens")}.
            </p>

            <p className='mb-3 font-bold'>{t("functionality_and_features")}</p>

            <p className='mb-3'>
                {t("token_holders")}.
            </p>

            <ol className='pl-[16px] list-decimal'>
                <li className='mb-3'>
                    {t("fixed_return")}:
                    <ul className='pl-[25px] list-disc'>
                        <li>5% {t("first_year")}</li>
                        <li>3% {t("second_year")}</li>
                    </ul>
                </li>
                <li className='mb-3'>
                    {t("referral_program")}:
                    <ul className='pl-[25px] list-disc'>
                        <li>2% {t("first_year_referral")}</li>
                        <li>1% {t("second_year_referral")}</li>
                    </ul>
                </li>
                <li className='mb-3'>
                    {t("additional_benefit")} <a
                    className='font-bold underline hover:cursor-pointer'
                    href='https://web.gekkoin.com/'
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t("gekkoin_structured_deposits")}
                </a>. {t("GKE_tokens_blocked")}.
                </li>
                <li className='mb-3'>
                    <a className='font-bold underline hover:cursor-pointer' onClick={() => {
                        navigate('/wallet?currency=GKE&tab=cashback_program');
                        scrollToTop();
                    }}>
                        {t("cashback_of")}
                    </a> {t("gekkard_card_expenses")}.
                </li>
                <li>
                    <a className='font-bold underline hover:cursor-pointer' onClick={() => {
                        navigate('/wallet?currency=GKE&tab=no_fee_program');
                        scrollToTop();
                    }}>
                        {t("crypto-fiat_exchange")}
                    </a> {t("without_restrictions")}.
                </li>
            </ol>
        </div>,

        [ETokensConst.LINK]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("link_token.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("link_token.tokens_called")}
            </p>

            <p className='mb-3'>
                {t("link_token.decentralized")}
            </p>

            <p className='mb-3'>
                {t("link_token.chainlink")}
            </p>

            <p>
                {t("link_token.open_source")}
            </p>
        </div>,

        [ETokensConst.LTC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("ltc.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("ltc.features")}
            </p>

            <p>{t("ltc.transaction")}</p>
        </div>,

        [ETokensConst.MANA]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("mana.reality")}
            </p>

            <p className='mb-3'>
                {t("mana.plots")}
            </p>

            <p className='mb-3'>
                {t("mana.launched")}
            </p>

            <p>
                {t("mana.two")}
            </p>
        </div>,

        [ETokensConst.MATIC]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("matic.polygon_is_a")}
            </p>

            <p className='mb-3'>
                {t("matic.the_polygon_platform")}
            </p>

            <p className='mb-3'>
                {t("matic.matic_is_an")}
            </p>

            <p>
                {t("matic.polygon_uses_a")}
            </p>
        </div>,

        [ETokensConst.NEAR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("near.layer_one")}
            </p>

            <p className='mb-3'>
                {t("near.community")}
            </p>

            <p>
                {t("near.developers")}
            </p>
        </div>,

        [ETokensConst.SHIB]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("shib.altcoin")}
            </p>

            <p className='mb-3'>
                {t("shib.alternative")}
            </p>

            <p className='mb-3'>
                {t("shib.created")}
            </p>

            <p>
                {t("shib.ranks")}
            </p>
        </div>,

        [ETokensConst.SOL]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("sol.sol_is_a_blockchain")}
            </p>

            <p className='mb-3'>
                {t("sol.sol_can_process")}
            </p>

            <p className='mb-3'>
                {t("sol.native_currency")}
            </p>

            <p>
                {t("sol.proof_of_stake")}
            </p>
        </div>,

        [ETokensConst.TON]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>TON is the next gen network to unite all blockchains and the existing Internet</p>

            <p className='mb-3'>
                Apart from processing millions of transactions per second, TON blockchain-based ecosystem has all the
                chances to give rise to a genuine Web3.0 Internet with decentralized storage, anonymous network, DNS,
                instant payments and various decentralized services.
            </p>

            <p className='mb-3'>
                As the ecosystem expands, we see a huge potential of TON coin and numerous ways for it to work in
                the new economy. We expect it to go beyond a means of payment.
            </p>

            <p>
                Stakes deposited by validators to be eligible to validate transactions and generate new blocks and
                coins.
                Voting power to support or oppose changes in the parameters of the protocol. Income (gas) paid to
                validator nodes as reward for processing transactions and smart contracts under the PoS consensus.
                Loans to validators extended against a share of their reward. Payment for services and options
                implemented by TON Services, TON Storage, TON DNS, TON Proxy, TON WWW. In particular, for bypassing
                censorship, storing data, hiding identity, using blockchain-based domain names.
            </p>
        </div>,

        [ETokensConst.TRX]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("trx.tron_is_a")}
            </p>

            <p className='mb-3'>
                {t("trx.initially_marketed")}
            </p>

            <p>
                {t("trx.founded_by")}
            </p>
        </div>,

        [ETokensConst.UNI]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("uni.decentralized")}
            </p>

            <p className='mb-3'>
                {t("uni.hosted")}
            </p>

            <p className='mb-3'>
                {t("uni.open")}
            </p>

            <p>
                {t("uni.governed")}
            </p>
        </div>,

        [ETokensConst.XMR]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("xmr.monero_is_a")}
            </p>

            <p className='mb-2'>
                {t("xmr.the_main_features")}
            </p>

            <ul className='pl-[25px] list-disc'>
                <li className='mb-1'>
                    <a className='font-bold'>
                        {t("xmr.anonymity")}
                    </a>

                    {t("xmr.monero_transactions_are")}
                </li>
                <li className='mb-1'>
                    <a className='font-bold'>
                        {t("xmr.security")}
                    </a>

                    {t("xmr.complex_mathematical")}
                </li>
                <li className='mb-1'>
                    <a className='font-bold'>
                        {t("xmr.decentralization")}
                    </a>
                    
                    {t("xmr.monero_is_not")}
                </li>
            </ul>
        </div>,

        [ETokensConst.XRP]: <div className='text-[var(--gek-dark-grey)] indent-[10px]'>
            <p className='mb-3'>
                {t("xrp.xrp_is")}
            </p>

            <p>
                {t("xrp.payment_platform")}
            </p>
        </div>
    }
}
