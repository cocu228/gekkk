import ETokensConst from './constants';
import {scrollToTop} from "@/shared/lib/helpers";
import {NavigateFunction} from "react-router-dom";
import {AccountRights} from "@/shared/config/account-rights";
import {IWalletInfo} from "@/shared/store/accounts/accounts";
import {useTranslation} from 'react-i18next';

export function getTokenDescriptions(navigate: NavigateFunction, account: IWalletInfo | null) {
    const gekkardUrl = import.meta.env.VITE_GEKKARD_URL;
    const {t} = useTranslation();

    return {
        [ETokensConst.ONEINCH]: <div>
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

        [ETokensConst.AAVE]: <div>
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

        [ETokensConst.AGLD]: <div>
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

        [ETokensConst.ANKR]: <div>
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

        [ETokensConst.APE]: <div>
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

        [ETokensConst.ANT]: <div>
            <p>
                {t("ant.aragon_is")}
            </p>
        </div>,

        [ETokensConst.ARPA]: <div>
            <p>
                {t("arpa.separate")}
            </p>

            <p>
                {t("arpa.blockchains")}
            </p>
        </div>,

        [ETokensConst.AVAX]: <div>
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

        [ETokensConst.AXS]: <div>
            <p className='mb-3'>
                {t("axs.gaming")}
            </p>

            <p>
                {t("axs.governance")}
            </p>
        </div>,

        [ETokensConst.ADA]: <div>
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

        [ETokensConst.ATOM]: <div>
            <p className='mb-3'>
                {t("atom.ecosystem")}
            </p>

            <p>
                {t("atom.cryptocurrency")}
            </p>
        </div>,

        [ETokensConst.BAL]: <div>
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

        [ETokensConst.BAND]: <div>
            <p className='mb-3'>
                Band Protocol is a cross-chain data oracle platform for connecting real-world data and APIs to
                smart contracts. Blockchain oracles are entities that connect blockchains to external systems,
                allowing smart contracts to execute depending on real-world inputs and outputs.
            </p>

            <p className='mb-3'>
                To start off, smart contracts are just like regular contracts; however, instead of being drafted on
                paper, these contracts run in the form of protocols on the blockchain. Smart contracts excel at
                immutable storage and verifiable transactions, but their use cases were previously limited due
                to their access to external data. Most blockchains are unaware of what is going on in the real
                world and cannot access data that is not native to the chain. While most existing smart contract
                platforms allow for the trustless execution of arbitrary algorithms, they lack access to real-world
                data. This constraint prevents such contracts from reaching their full potential. BandChain was created
                to address this issue by connecting public blockchains to real-world, off-chain data.
            </p>

            <p className='mb-2'>
                There have been multiple attempts at finding solutions. Three major limitations persist:
            </p>

            <ol className='pl-[25px] list-decimal mb-3'>
                <li className='mb-1'>
                    Centralization: Contemporary data solutions, such as API (application programming interface) feeds
                    and some oracle systems, are designed to be centralized. This not only contradicts the concept of
                    decentralization and distrust, but it also constitutes potential security issue data tampering
                    and outages for the users.
                </li>

                <li className='mb-1'>
                    Network Congestion: All major oracle solutions suffer network congestion due to the solution
                    being on the same blockchain as the application. As a result, if the blockchain network becomes
                    overburdened with outstanding transactions, the data request transaction would be delayed as well.
                </li>

                <li className='mb-1'>
                    High Cost: They are pricey. This is due to the costs of researching, developing, and deploying the
                    solution, as well as the different expenditures connected with operating and sustaining it over
                    time.
                </li>
            </ol>

            <p className='mb-2'>BandChain Oracle has the following advantages over other oracles:</p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    Decentralization: BandChain Oracle is decentralized by implementing maximal redundancy
                    on two distinct layers of the infrastructure design: BandChain validators
                    (consensus level) and data source level.
                </li>

                <li className='mb-1'>
                    Flexibility:The platform's data source scripts and oracle scripts enable users
                    to query and compute their preferred data feed with maximum customization and freedom.
                </li>

                <li className='mb-1'>
                    Cost: Band's oracle enables anyone interested in requesting data to do so
                    only when necessary and to pay the corresponding fees on a per-request basis.
                    This is more economical than having to update the prices of an entire collection
                    of assets when you may just require the most recent price of one.
                </li>
            </ul>

            <p>The native token of the platform is BAND, and it is based on the ERC20 token standard.</p>
        </div>,

        [ETokensConst.BICO]: <div>
            <p className='mb-3'>
                Biconomy (BICO) is a developer platform that empowers blockchain developers to enable a
                simplified transaction and onboarding experience for their Web3 project. The plug-n-play
                solution allows Web 3 interactions to be smooth and seamless between DApps and end-users
                by removing blockchain complexities.
            </p>

            <p>
                The native token of the Biconomy platform is BICO, an Ethereum-based token. BICO serves
                as a work and governance token. Further, the token serves a key role in decentralizing
                the network by acting as network fees for the Biconomy platform. As the network blockchain
                works as a verification and settlement layer for supporting the activities of multiple
                networks, node operators pay a network fee. These executors and validators in the network
                add information to the blockchain. Consequently, they earn BICO tokens for the work done
                proportionally. Additionally, the BICO token incentivizes all stakeholders who secure,
                maintain, and participate in network governance.
            </p>
        </div>,

        [ETokensConst.BLZ]: <div>
            <p className='mb-3'>
                Bluzelle (BLZ) offers a blockchain platform for the creation of decentralized applications
                (dApps) focused decentralized and scalable database services. Users of Bluzelle can sell
                their unused computing resources to become storage providers for other users interested
                in buying their computing resources. Transactions on the Bluezelle are done with the
                platforms own cryptocurrency.
            </p>

            <p className='mb-2'>The platform uses the following features to support its vision:</p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>Fast and Efficient Blockchain</li>
                <li className='mb-1'>Decentralized Storage</li>
                <li className='mb-1'>Defi in Games</li>
                <li className='mb-1'>High-Quality Games</li>
            </ul>

            <p className='mb-3'>
                Bluzelle uses a fast and efficient Cosmos-based blockchain. Cosmos is an "internet
                of blockchains," or a decentralized network of interoperable blockchains that can
                exchange information and tokens among each other without permission. Blockchain
                interoperability is the technique by which two or more blockchains communicate with
                each other. Additionally, Bluzelle uses a decentralized storage layer that allows
                players to instantly store game NFTs on hundreds of nodes (computers), thus providing
                a haven. Bluzelle also brings together all the high-performing DeFi solutions of the
                Cosmos ecosystem to provide lending, staking, and yield opportunities for game assets.
            </p>

            <p className='mb-3'>
                With its founders experienced in the games industry, Bluzelle plans
                to launch its first play-to-earn game called Denomination, a real-time
                card game where gamers can compete against each other (player vs. player)
                or against the environment (player vs. environment) and to win rewards.
            </p>

            <p>
                BLZ is the native token of the platform and a key component of its GameFi.
                Players can use BLZ to purchase NFTs and other in-game items and subsequently
                store them on the network. Also, validators can earn rewards using BLZ tokens.
                Further, users can pay for Bluzelle network transactions and Bluzelle database
                services using BLZ tokens. Lastly, users can stake BLZ tokens and earn rewards and
                participate in network governance.
            </p>
        </div>,

        [ETokensConst.BNT]: <div>
            <p className='mb-3'>
                Bancor is a collection of smart contracts that control the conversion flow
                between different tokens on the Bancor Network platform. According to the
                Bancor Network claims, these smart contracts also control access to the network's
                liquidity pools, which connect different tokens. Users can use the Bancor Network
                smart contract's convert functionalities to initiate a conversion between any tokens
                on the network, including tokens on other blockchains.
            </p>

            <p className='mb-3'>
                Currently, the Bancor Network is based on the Ethereum blockchain.
                However, the protocol is interoperable with other blockchains as well.
                The ability to check and obtain information across many blockchain systems
                is known as blockchain interoperability.
            </p>

            <p className='mb-3'>
                The Bancor Network Token (BNT) is at the center of the network,
                serving as a hub that connects all of the other tokens.
            </p>

            <p>
                On the Bancor Network, every liquidity pool collects liquidity for a specific
                set of tokens. Anyone can contribute liquidity to a pool in exchange for conversion
                fees on trades that pass through it. Pool tokens are then distributed to the contributors
                in proportion to their assets in the pool. A ConverterBase contract manages each liquidity
                pool, and the liquidity providers can construct new instances of the ConverterBase contract
                to generate new liquidity pools. ConverterBase contracts are the contracts that carry the
                main logic of conversion between different ERC20 smart tokens. Also, to add or remove
                liquidity from a pool, anyone can use the fund or liquidate functions.
            </p>
        </div>,

        [ETokensConst.BTT]: <div>
            <p className='mb-3'>
                BitTorrent is a popular peer-to-peer distributed communication technology
                that allows huge, in-demand data distribution. The protocol eliminates the
                need for maintaining a central server.The BitTorrent protocol allows software
                endpoints (called "clients") to work together to ensure reliable simultaneous
                distribution of huge files to several clients, reducing dependency on any weak
                point (such as a server connection). The protocol strives to maximize the utilization
                of each client's upload and download bandwidth to balance peer-to-peer content delivery
                across all clients.
            </p>

            <p className='mb-3'>
                How the Protocol Works: Peers can find a file or a portion of a file by making an
                "announcement" to a tracker, which is a server that tracks which peers have access
                to which files, or by searching the DHT, a distributed database of peers. This process
                organically splits peers into "swarms" of users, with each swarm sharing a common interest
                in trading portions of a certain file.
            </p>

            <p className='mb-3'>
                Files are cut into fragments before an exchange occurs. Clients advertise which parts of a
                file are available to their users; then, users who have the required parts post them, which
                in turn allows users who require these parts to download them. Cryptographichashes (i.e. info
                hashes) of the parts/pieces are used to ensure that the parts shared are indeed the ones requested.
            </p>

            <p className='mb-3'>
                The more pieces a peer receives in exchange for pieces provided, the more productive a
                peer-to-peer contact is perceived to be. Clients with the most productive exchanges are
                rewarded with additional pieces, while those with the least productive exchanges are disconnected or
                banned.
            </p>

            <p className='mb-3'>
                After completing a download, a user can allow their client to continue uploading parts despite
                no longer requiring a download; this is known as "seeding." Most clients' default behavior is to
                "seed" to other downloaders. This behavior is completely selfless and voluntary. There is no
                financial penalty for customers who close their BitTorrent software once a download is completed.
            </p>

            <p className='mb-3'>
                The platform wants app developers to directly reward consumers who provide its underlying resources
                by allowing consumers to use this "found value" to transact with publishers and app developers without
                using traditional currency.The company intends to enhance the BitTorrent protocol and establish a new
                token, BTT, to implement a distributed infrastructure services economy. End users in the BTT economy
                should be able to supply infrastructure services in small amounts in exchange for tokens.
            </p>

            <p>
                BTT is a TRON TRC-10 cryptographic token. BTT seeks to act as a general-purpose mechanism for
                transferring computer resources between BitTorrent clients and a market of service requesters
                and providers.
            </p>
        </div>,

        [ETokensConst.C98]: <div>
            <p className='mb-3'>
                Coin98 is a DeFi platform to borrow, stake, swap, lend and earn crypto. Coin98 is a one-stop
                platform wherein users can access the DeFi ecosystem like on-chain governance, decentralized
                exchanges, lending protocols, blockchain-based games, and cross-chain transfers (across blockchain
                networks) on over twenty networks; including Binance Smart Chain, Ethereum, Solana, Avalanche, and more.
            </p>

            <p className='mb-2'>
                C98 is the governance and utility token of Coin98 that operates on Ethereum, Binance Smart
                Chain (BSC), and Solana. C98 powers the entire Coin98 ecosystem. The use cases of the token
                are as follows:
            </p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    Liquidity providers who provide liquidity for the development of Coin98 Exchange by
                    staking or including assets in liquidity pools are rewarded with C98 tokens in exchange
                    for liquidity.
                </li>

                <li className='mb-1'>
                    C98 allows token holders to vote on governance proposals to promote decentralized community
                    governance for the network. These token holders get to vote on various features or parameters
                    of the Coin98 exchange and its products thereon.
                </li>

                <li className='mb-1'>
                    C98 holders are bifurcated based on tiers. Users with more C98 are sorted into
                    a higher ranked tier. These high-tier token holders gain exclusive access to
                    premium events and privileges.
                </li>
            </ul>
        </div>,

        [ETokensConst.COMP]: <div>
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

        [ETokensConst.CRV]: <div>
            <p className='mb-3'>
                {t("crv.widely")}
            </p>

            <p>
                {t("crv.about")}
            </p>
        </div>,

        [ETokensConst.CTSI]: <div>
            <p className='mb-3'>
                CTSI is a utility token that powers the Cartesi network, which aims to solve blockchain
                scalability and high fees. Scalability refers to a cryptocurrency's ability to handle
                a high number of transactions at once. The platform employs the use of optimistic rollups.
                Optimistic rollups (ORs) are a sort of layer 2 structure that runs on top of the Ethereum
                base layer rather than on the top. A layer 2 framework or protocol is one that is developed
                on top of an existing blockchain system.
            </p>

            <p className='mb-3'>
                CTSI can be used for staking and fees for processing data on the network. Notably, Cartesi
                supports Linux software components and enables smart contract creation using mainstream
                programming languages.
            </p>

            <p>
                The native token CTSI is a utility token of Cartesi that is secured cryptographically.
                CTSI was created to serve a significant part in the operation of the Cartesi ecosystem.
                The Cartesi token also plays an important role in Cartesi Core's incentive mechanism.
                CTSI is used to reward users for participating in the network.
            </p>
        </div>,

        [ETokensConst.CVC]: <div>
            <p className='mb-3'>
                The Civic ecosystem simplifies identity verification (IDV) services using
                blockchain by verifying user identities and detecting fraud in a hassle-free
                and less complex manner. Civic has used blockchain-based solutions to elevate
                the quality of services for existing products, namely the Civic Secure Identity
                Platform (SIP) successfully. Previously, the verification of user background needed
                the involvement of third-party services as a mandatory step, but with Civic's new
                blockchain-based approach, the involvement of third-party auditors can be minimal.
                In fact, the blockchain-based approach ensures zero human errors by eliminating the
                need to share confidential data over and over again amongst different audit agencies.
                Civic aims to make it challenging for fraudulent activities to proliferate or seeks
                to reduce breaches within the ecosystem.
            </p>

            <p className='mb-3'>
                To elevate customer experience, the Civic platform has introduced various smart
                contracts, a utility token named CVC, and various secure software applications
                within its platform. Moreover, the Civic ecosystem lets two different parties be
                involved in simplified identity verification processes, namely the "Users" and the
                "Validators." Validators are institutions that need to verify IDs of the Users
                (comprising either individuals or associated businesses) . The Validators give
                approval for the verified User data on the Civic ecosystem. This process simplifies
                the validation for real User IDs within the blockchain. Other external agencies can
                simply go ahead and use the already validated data, rather than going through the
                validation audit process once again. Smart Contracts on the Civic ecosystem are leveraged
                to properly validate the User IDs, thus leaving no space for repetitive human involvement.
            </p>

            <p>
                The CVC token on the Civic ecosystem is used to support transactions related
                to services offered by the platform. It is an ERC20 standard token facilitating
                payments for smart contract commands and maintaining the blockchain that backs up
                the Civic platform. Besides, CVC tokens are coming up with different new use cases
                to make the platform more efficient.
            </p>
        </div>,

        [ETokensConst.DASH]: <div>
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

        [ETokensConst.ENJ]: <div>
            <p className='mb-3'>
                {t("enj.community")}
            </p>

            <p>
                {t("enj.platform")}
            </p>
        </div>,

        [ETokensConst.ENS]: <div>
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

        [ETokensConst.EOS]: <div>
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

        [ETokensConst.FIL]: <div>
            <p className='mb-3'>
                The Filecoin protocol introduces a decentralized storage network (DSN) based on blockchain.
                As claimed by the whitepaper, with the DSN scheme, multiple independent storage providers offer data
                storage and data retrieval to clients on the Filecoin network. In other words, the Filecoin DSN handles
                storage and retrieval requests via two verifiable markets, i.e., the Storage Market and the Retrieval
                Market,
                respectively. The two markets have the same structure but different design.
            </p>

            <p className='mb-3'>
                The Storage Market allows clients to pay storage miners to store data. The storage market is a
                verifiable market through which clients (buyers) place matching orders with storage miners (sellers).
                Once matched, orders are submitted to the orderbook (sets of orders). That way, the public gets access
                to all the orders recorded on the Filecoin blockchain. Additionally, both clients and storage miners
                must
                pledge and commit to their resources, where storage miners provide constant proof of storage for an
                order.
            </p>

            <p className='mb-3'>
                The Retrieval Market allows clients to retrieve data by paying retrieval miners to deliver the
                data. In the Retrieval Market, clients can request retrieval of a specific piece from an order.
                Retrieval
                miners obtain pieces from the Retrieval Market or by storing them from being a storage miner.
                Participants
                in the retrieval market follow an off-chain process of exchanging pieces and settling prices. Therefore,
                Retrieval Miners and clients exchange data without the network knowing about it. Mostly, the retrieval
                miner
                splits the data into multiple parts, and the client pays for each part that is retrieved.
            </p>

            <p>Filecoin, trading under the ticker FIL, is the native cryptocurrency on the Filecoin network.</p>
        </div>,

        [ETokensConst.GALA]: <div>
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

        [ETokensConst.GRT]: <div>
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

        [ETokensConst.ICX]: <div>
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

        [ETokensConst.IDEX]: <div>
            <p className='mb-3'>
                IDEX is a hybrid liquidity decentralized exchange (DEX) that combines a high-performance orderbook and
                matching engine with an automated market maker (AMM). Orderbook refers to a list of orders for a
                specific
                asset organized by price level. The platform blends the advantages of centralized and decentralized
                exchanges
                with the performance and characteristics of a traditional orderbook and the liquidity and security of an
                AMM.
                IDEX permits traders to obtain the best practices, prevent failed transactions, while providing
                liquidity, all
                with the power of actual limit and stop-loss orders. IDEX operates on the Polygon blockchain, supporting
                MATIC
                and ERC-20 assets.
            </p>

            <p className='mb-3'>
                The three important aspects of the platform are high-performance exchange, hybrid liquidity, and smart
                contracts. The high-performance exchange component is analogous to that on top of centralized exchanges.
                This design allows IDEX to match centralized exchanges in latency and performance that are unavailable
                from
                other DEXs.Further, the IDEX Hybrid Liquidity (IDEX HL) incorporates a traditional orderbook and
                matching engine
                with AMM liquidity pools. So, traders are seamlessly matched against the most suitable combination of
                limit orders
                and pool liquidity for low-cost execution without any additional efforts. IDEX HL relies on smart
                contracts to
                handle security and trade settlement, enforcing the constraints of the AMM pricing curve and enabling
                users to
                manage custody of their assets.
            </p>

            <p className='mb-3'>
                Next, the IDEX smart contract contains three settlement processes employed in various circumstances
                depending
                on the type of liquidity being matched. The IDEX smart contracts bring programmatic guarantees to the
                platform.
                So, IDEX utilizes a series of smart contracts to decentralize fund custody and trade settlement by
                introducing
                such novel DeFi mechanisms.
            </p>

            <p className='mb-3'>
                About the economics of the token, the IDEX token aligns rewards between the exchange and IDEX token
                stakers
                who play a vital role in the operations of IDEX. Stakers are rewarded with half (50%) of the trade fees
                for
                their participation.
            </p>

            <p className='mb-3'>
                Stakingnodes keep a real-time record of system data. This reduces the IDEX's operational cost by
                offloading
                popular API (application programming interface) operations. Staking nodes are evaluated by their uptime
                to
                determine their performance. Uptime is a function of API performance and online sessions.
            </p>

            <p>
                IDEX tokens should be placed as collateral to act as nodes and receive payment for node operations. In
                the event
                of serving incorrect data, the respective node address will be blacklisted, and the operator must
                re-incubate
                their tokens. IDEX staking allows for “riskless” staking from cold storage as no slashing mechanism is
                involved.
            </p>
        </div>,

        [ETokensConst.INJ]: <div>
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

        [ETokensConst.USDT]: <div>
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

        [ETokensConst.BCH]: <div>
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

        [ETokensConst.KNC]: <div>
            <p className='mb-3'>
                Kyber Network is a hub of liquidity protocols that aggregates liquidity from various sources
                to provide secure and instant transactions on any decentralized application (DApp). The main goal
                of Kyber Network is to enable DeFi DApps, decentralized exchanges (DEXs) and other users easy access
                to liquidity pools that provide the best rates.
            </p>

            <p className='mb-3'>
                All transactions on Kyber are on-chain, which means they can be easily verified using any Ethereum
                block explorer. Projects can build on top of Kyber to utilize all the services offered by the protocol,
                such as the instant settlement of tokens, liquidity aggregation, and a customizable business model.
            </p>

            <p className='mb-3'>
                Kyber looks to solve the liquidity issue in the decentralized finance (DeFi) industry by allowing
                developers to build products and services without having to worry about liquidity for different needs.
            </p>

            <p>
                KNC is the native utility and governance token used to facilitate and pay fees for transactions on
                the Kyber network. The token is built on Ethereum in accordance with the ERC20 standards, which define
                the common list of rules for the tokens to function in the Ethereum ecosystem. KNC also utilizes smart
                contracts. These are just like regular contracts; however, instead of being drafted on paper, these
                contracts run in the form of protocols on the blockchain. Smart contracts offer the infrastructure in
                the Kyber network that allows one token to be swapped for another.
            </p>
        </div>,

        [ETokensConst.KSM]: <div>
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

        [ETokensConst.LPT]: <div>
            <p className='mb-3'>
                Livepeer is an open and decentralized video platform. The framework of Livepeer enables developers to
                build
                video streaming applications effectively. In brief, Livepeer is an Ethereum-based protocol offering live
                video
                streaming services. It is an alternative to mainstream centralized broadcasting companies. Livepeer aims
                to make
                video streaming more cost-friendly and reliable.
            </p>

            <p className='mb-3'>
                According to the website, the Livepeer platform can reduce costs up to 50 times compared to other
                platforms.
                In addition, Livepeer is more scalable and resilient without single points of failure. That means
                developers have
                the freedom to scale up or down and manage content creator demand.
            </p>

            <p className='mb-3'>
                Therefore, Livepeer is a behind-the-scenes solution for app creators to transcode videos. Transcoding
                means
                converting videos from one format to another before playback on computers on the network. Users who
                transcode videos
                are known as orchestrators. Orchestrators lend their computers’ processing power to the network. Also,
                the first nodes
                are called broadcasters. Thus, the broadcasters send video streams for transcoding to orchestrators.
                Consequently,
                broadcasters are charged fees denominated in ether (ETH) for the transcoding work. Meanwhile,
                orchestrators receive
                rewards for their services.
            </p>

            <p>
                The native token of the network is the Livepeer Token (LPT). LPT is used for rewarding, staking,
                trading, or
                participating in governance voting. Just like any other cryptocurrency, the demand for LPT is directly
                proportional
                to the network's usage. Further, orchestrators receive work in proportion to the amount of LPT they
                staked. Users who
                do not want to become orchestrators can stake their LPT tokens toward the transcoders. By doing so, LPT
                holders get a
                portion of the transcoders' rewards. They are also called delegators and chosen through voting. Their
                job is to keep
                the node running smoothly for transaction validation.
            </p>
        </div>,

        [ETokensConst.LRC]: <div>
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

        [ETokensConst.MASK]: <div>
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

        [ETokensConst.MIR]: <div>
            <p className='mb-3'>
                Mirror Protocol is a synthetic assets protocol built by Terraform Labs. It allows users to issue and
                trade synthetics assets that track the price of real-world assets. This allows Mirror Protocol to track
                the price of stocks, futures, exchange-traded funds, and other traditional financial assets and bridges
                cryptocurrency markets with traditional markets. MIR is the governance token of Mirror Protocol and is
                used
                for governance, CDP closure fees, and liquidity mining.
            </p>

            <p className='mb-3'>
                This is intended to offer greater access to the US equities market through the minting of synthetic
                assets. These Mirrored Assets (mAssets) mirror the price behavior of the real-world assets and reflect
                the exchange prices on-chain. The decentralized representation grants traders price exposure to assets
                that would otherwise be inaccessible. These mAssets gather their price from decentralized oracles at
                thirty-second intervals.
            </p>

            <p className='mb-3'>
                Mirror Protocol works on the Terra blockchain and is available on Ethereum via the Shuttle-bridge.
                These platforms allow every asset to be represented on the blockchain.
            </p>

            <p>
                The native token for Mirror Protocol is the Mirror Token (MIR). This token is used for governance,
                staking, and rewards, and the token has a total supply of 370 million, which should drop over a period
                of four years. MIR is inflationary in nature and is expected to have new uses as the token matures.
            </p>
        </div>,

        [ETokensConst.MKR]: <div>
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

        [ETokensConst.MLN]: <div>
            <p>
                MLN is an Ethereum token that powers Enzyme (formerly known as Melon Protocol),
                a protocol that aims to facilitate on-chain asset management for the DeFi ecosystem.
                MLN allows users to build, share, and explore DeFi investment strategies (called “vaults”)
                while filtering by historical performance and risk profiles. MLN is used to pay for various
                functions throughout the vault creation process and investment lifecycle.
            </p>
        </div>,

        [ETokensConst.OGN]: <div>
            <p className='mb-3'>
                Trading under OGN, the Origin Protocol is an Ethereum-based platform that aims to bring
                non-fungible tokens (NFTs) and decentralized finance (DeFi) to the masses. The platform
                is open-source and seeks to power decentralized and peer-to-peer marketplaces. As per the
                whitepaper, Origin Protocol facilitates a global network that allows traders across the world
                to transact on the open web. In simpler terms, the Origin blockchain is a platform to build a
                decentralized marketplace.
            </p>

            <p className='mb-3'>
                Today, almost $40 billion of value is poured into various DeFi protocols. But interacting with
                DeFi protocols is complex and cumbersome and requires a sophisticated user. Mainstream consumers
                like small businesses, retailers, merchants, etc. have very little knowledge of these financial
                protocols and, therefore, cannot participate in them. To take an edge, the Origin Protocol was
                built to realize this opportunity. They believe that decentralized finance, especially in the NFT
                vertical, can unlock billions of dollars and bring crypto to mainstream consumers.
            </p>

            <p>
                Origin Token (OGN): This is an Ethereum-based token that powers the Origin platform. OGN is an
                ERC20 standard token and also serves as the platform’s cryptocurrency. The token is used in the
                basic transactional activities on the platform. Further, OGN also works as a governance token,
                and the holders of the token can create and vote on the proposals made for the platform’s growth.
            </p>
        </div>,

        [ETokensConst.OMG]: <div>
            <p>
                The OMG Network (formerly OmiseGO) is a value transfer network for Ethereum and any
                ERC-20 token. It describes itself as the first production-grade layer-2 Ethereum
                scaling solution and aims to let people move money and a variety of digital values
                on the blockchain faster, cheaper, and without compromising on security.
            </p>
        </div>,

        [ETokensConst.OXT]: <div>
            <p>
                Orchid (OXT) is an Ethereum token that powers the Orchid network, a peer-to-peer
                privacy tool that includes a decentralized VPN and other features designed to give
                users more control over their Internet connection. OXT can be used to pay for bandwidth
                or staked by bandwidth providers in order to operate a node.
            </p>
        </div>,

        [ETokensConst.POWR]: <div>
            <p className='mb-3'>
                Power Ledger (POWR) is a technology and software company that uses blockchain for trading
                renewable energy. The company aims to develop software for clients that allows consumers to
                track, trace, and trade energy (in kilowatts) and helps to invest in renewables. The Power
                Ledger ecosystem as a platform seeks to take the control out of the hands of central players
                and put the citizens in charge of a cocreated energy future. The platform provides a transparent
                governance framework and can be scaled to suit as required. Accordingly, the platform seeks to
                offer products categorized into three facilities, i.e., flexible trading, energy trading and
                traceability, and environmental commodities trading.
            </p>

            <p>
                The Power Ledger deploys a dual-token ecosystem, POWR and Sparkz, for its two blockchain layers.
                However, POWR tokens allow the application hosts and the participants to access and use the platform
                and fuel the Power Ledger ecosystem. Since the platform’s core value is sustainability, Power
                Ledger has chosen a hybrid public and consortium blockchain approach. Thereby, POWR tokens work
                on the public Ethereum blockchain. Power Ledger’s private, industry-specific consortium blockchain
                is EcoChain, which is based on a proof-of-stake consensus mechanism.
            </p>
        </div>,

        [ETokensConst.REN]: <div>
            <p>
                Ren (REN) is an Ethereum token that powers Ren’s open protocol for transferring
                cryptocurrencies between blockchains. Ren aims to bring popular assets like Bitcoin
                and Zcash to blockchains including Ethereum, making it possible for these assets to
                participate in a multi-chain decentralized finance ecosystem.
            </p>
        </div>,

        [ETokensConst.REQ]: <div>
            <p className='mb-3'>
                Request (REQ) is the protocol for payment requests. It is an open network where transactions
                are immutably recorded and requests are processed without the need for a middleman. The aim is
                to have the network utilize blockchain technology to make the payment process faster, easier, and
                reliable for everyone. By having all payment requests in one place, companies that provide services
                such as accounting, invoicing, payment processing, and auditing can connect to the same network and
                communicate with one another utilizing the same single source of truth. Thus, in simpler terms, Request
                is a decentralized network that permits anyone to create, fulfill, and share a payment request in a
                secure way.
            </p>

            <p className='mb-3'>
                As mentioned on the website, three important features of the Request network include Request
                Finance, Request Create, and Wooreq. Request Finance offers a platform to manage all crypto
                transactions in one place. This is a suite of financial tools that makes life easier by providing
                an application for invoices, expenses, payroll, and accounting. Next, by using Request Create, users
                can create and exchange payment requests in three easy steps, allowing them to spend less time on
                payments and more time on running their business. Then there's Wooreq, a Woocommerce plugin that uses
                the
                Request network to make it simple to accept cryptocurrency payments.
            </p>

            <p className='mb-3'>
                Furthermore, the Request Network can handle more and more transactions per second with every
                new version. This is because the majority of data is stored on IPFS instead of the blockchain.
                IPFS, also known as InterPlanetary File System, is a protocol and network. This is designed to
                produce a peer-to-peer way of storing and sharing hypermedia in the distributed file system that is
                content-addressable. The data stored on the blockchain is Hash (proof of data), which can’t be modified
                or manipulated. Transactions are processed and added to IPFS in large batches, enabling higher
                throughput
                and lower costs.
            </p>

            <p className='mb-3'>
                Another important advantage of Request is that it’s built on top of Ethereum, which ensures
                that data cannot be deleted or changed by any third party or even by users. In addition, data is
                present on every node, and it can’t just disappear. This makes the data safe from the passage of
                time as well as tampering.
            </p>

            <p>
                REQ is the token ticker for the Request token, which is a deflationary ERC20 token. This implies
                REQ tokens are designed to reduce in supply over time. According to the whitepaper, the REQ token
                powers the Request Network and is used to create requests, participate in the network, and reward
                the parties who help build the Request ecosystem. The token is also utilized for making payments on
                the Request Network, including the network fees. The fee charged is expected to remain between 0.05
                percent and 0.5 percent, with the amount decreasing as the system grows. Participants are required to
                pay a network fee in REQ, which will be burned when they use the network, meaning that the tokens are
                sent to an unusable wallet address to remove them from circulation. Additionally, the REQ token is used
                for governance purposes by allowing participants to vote on decisions that are crucial for the network’s
                long-term success.
            </p>
        </div>,

        [ETokensConst.RLC]: <div>
            <p>
                RLC is an Ethereum token for the iExec cloud platform in which users can monetize
                and rent computing power and data. iExec enables developers to power applications
                on what is described as "a decentralized marketplace for cloud resources".
            </p>
        </div>,

        [ETokensConst.SAND]: <div>
            <p>
                {t("sand.sand_is")}
            </p>
        </div>,

        [ETokensConst.SNX]: <div>
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

        [ETokensConst.SRM]: <div>
            <p className='mb-3'>
                Serum describes itself as a protocol and ecosystem for decentralized exchanges (DEX)
                that gives decentralized finance, exceptional speed, and cheap transaction costs. The Serum is
                based on Solana and is fully permissionless. Websites or applications that use Serum's protocol may
                adjust the experience to their target market's use case and compliance requirements.
            </p>

            <p className='mb-3'>
                Serum offers a completely on-chain order book, allowing trading interfaces and other applications
                to 'plug into' Serum's modular ecosystem. The flexibility to determine the price, size, and direction
                of their transaction is claimed as a unique feature of this exchange mechanism for users. Serum DEX,
                built on top of the Asset Agnostic Order book, gives the ecosystem a larger pool of liquidity and a
                shared resource to support trading functionality. Permissioned marketplaces provide much more freedom
                and conformity.
            </p>

            <p>
                The native token of the ecosystem is SRM. Serum's utility and governance token is also SRM. The
                users get a fee reduction if they keep SRM in their wallets. SRM is completely integrated with
                Serum and can take advantage of burn fees.
            </p>
        </div>,

        [ETokensConst.STORJ]: <div>
            <p>
                {t("storj.storj_is")}
            </p>
        </div>,

        [ETokensConst.SUSHI]: <div>
            <p>
                {t("sushi.sushi_is")}
            </p>
        </div>,

        [ETokensConst.TRIBE]: <div>
            <p>
                TRIBE is an Ethereum token that governs Fei Protocol, which issues a separate,
                decentralized stablecoin called FEI that attempts to maintain a value of US$1.00.
                TRIBE can be used to vote for Fei Protocol upgrades and to adjust FEI stablecoin
                monetary policy.
            </p>
        </div>,

        [ETokensConst.USDC]: <div>
            <p>
                {t("usdc.usdc_is")}
            </p>
        </div>,

        [ETokensConst.WAVES]: <div>
            <p className='mb-3'>
                Waves (WAVES) is a community-based multipurpose blockchain platform that seeks to
                support a compilation of decentralized open-source technologies to build scalable,
                user-friendly apps. Waves aims at creating a comprehensive blockchain ecosystem that
                provides several features necessary for business adoption.
            </p>

            <p>
                WAVES is the token utilized in the Waves blockchain. Within the blockchain, block
                generators seek to obtain block rewards and transaction fees in WAVES. This aims to
                promote generators to maintain and develop the blockchain network system. The more WAVES
                the generator holds, they seek to get a chance to add another block in the blockchain.
                Blocks are data structures within the blockchain database.
            </p>
        </div>,

        [ETokensConst.XLM]: <div>
            <p className='mb-3'>
                {t("xlm.powers")}
            </p>

            <p>
                {t("xlm.computers")}
            </p>
        </div>,

        [ETokensConst.YFI]: <div>
            <p>
                {t("yfi.yfi_is")}
            </p>
        </div>,

        [ETokensConst.ZEC]: <div>
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

        [ETokensConst.BNB]: <div>
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

        [ETokensConst.BTC]: <div>
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

        [ETokensConst.DAI]: <div>
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

        [ETokensConst.DOGE]: <div>
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

        [ETokensConst.DOT]: <div>
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

        [ETokensConst.ETC]: <div>
            <p className='mb-3'>
                {t("etc.decentralized")}
            </p>

            <p>
                {t("etc.philosophical")}
            </p>
        </div>,

        [ETokensConst.ETH]: <div>
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

        // [ETokensConst.EUR]: <div>
        //     <p className='mb-3'>
        //         Euro (EURG) is the fiat currency of the Eurozone countries.
        //         On the Gekkard platform, Euros can be exchanged for EURG cryptocurrency
        //         according to the terms and conditions on this website and in the Gekkard App.
        //     </p>
        // </div>,

        [ETokensConst.EURG]: <div>
            <p className='mb-3'>
                {t("EUR_is_utility_token")} <a
                className='font-bold underline hover:cursor-pointer'
                href={`${gekkardUrl ?? 'https://dev.gekkard.com'}/app-release.apk`}
                target="_blank"
                rel="noopener noreferrer"
            >{t("gekkard_app")}</a>.
            </p>

            <p className='mb-3'>{t("for_more_information")} <a
                className='underline font-bold hover:cursor-pointer'
                href='https://gekkoin.com/source/Gekkoin_EURG_WP.pdf'
                target="_blank"
                rel="noopener noreferrer"
            >{t("white_paper")}</a>.
            </p>

            <div className="row mb-8 flex flex-col gap-2 md:gap-1 font-medium info-box-warning">
                <div className='text-xl'>
                    {t("exchange_rate_fixed")}: <span className="font-bold">1 EUR = 1 EURG*</span>
                </div>

                <div className="col text-xs">
                    {account && <span>{t("exchange_fee")} 1,5%.
                        {account.rights[AccountRights.IsJuridical] ? null : <>
                            {t("if_you")} <a
                            className='underline hover:text-blue-400 hover:cursor-pointer font-semibold'
                            onClick={() => {
                                navigate('/wallet/GKE/no_fee_program');
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
                <p className='font-bold text-xl mb-4'>4% {t("AER_interest")}</p>
                <p>{t("you_get_per_annum")}:</p>
                <p>(i) {t("your_weighted_average")};</p>
                <p>(ii) {t("our_upper_limit")}.</p>
            </div>

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

        </div>,

        [ETokensConst.EVER]: <div>
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

        [ETokensConst.GKE]: <div>
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
                        navigate('/wallet/GKE/cashback_program');
                        scrollToTop();
                    }}>
                        {t("cashback_of")}
                    </a> {t("gekkard_card_expenses")}.
                </li>
                <li>
                    <a className='font-bold underline hover:cursor-pointer' onClick={() => {
                        navigate('/wallet/GKE/no_fee_program');
                        scrollToTop();
                    }}>
                        {t("crypto-fiat_exchange")}
                    </a> {t("without_restrictions")}.
                </li>
            </ol>
        </div>,

        [ETokensConst.LINK]: <div>
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

        [ETokensConst.LTC]: <div>
            <p className='mb-3'>
                {t("ltc.cryptocurrency")}
            </p>

            <p className='mb-3'>
                {t("ltc.features")}
            </p>

            <p>{t("ltc.transaction")}</p>
        </div>,

        [ETokensConst.MANA]: <div>
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

        [ETokensConst.MATIC]: <div>
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

        [ETokensConst.NEAR]: <div>
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

        [ETokensConst.SHIB]: <div>
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

        [ETokensConst.SOL]: <div>
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

        [ETokensConst.TON]: <div>
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

        [ETokensConst.TRX]: <div>
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

        [ETokensConst.UNI]: <div>
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

        [ETokensConst.XMR]: <div>
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

        [ETokensConst.XRP]: <div>
            <p className='mb-3'>
                {t("xrp.xrp_is")}
            </p>

            <p>
                {t("xrp.payment_platform")}
            </p>
        </div>
    }
}
