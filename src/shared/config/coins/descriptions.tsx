import ETokensConst from './constants';
import {$ENV, scrollToTop} from "@/shared/lib/helpers";
import {NavigateFunction} from "react-router-dom";
import {AccountRights} from "@/shared/config/account-rights";
import {IWalletInfo} from "@/shared/store/accounts/accounts";
import {useTranslation} from 'react-i18next';

export function getTokenDescriptions(navigate: NavigateFunction, account: IWalletInfo | null) {
    const gekkardUrl = $ENV.VITE_GEKKARD_URL;
    const {t} = useTranslation();

    return {
        [ETokensConst.ONEINCH]: <div>
            <p className='mb-3'>
                The 1inch Network unites decentralized protocols whose synergy enables the most lucrative,
                fastest and protected operations in the DeFi space.
            </p>

            <p className='mb-3'>
                1INCH itself is a decentralized exchange (DEX) aggregator, and the company behind it has
                developed products for its users so they can trade across multiple DEXs on various networks.
            </p>

            <div className='font-bold mt-3'>dApp</div>

            <p>
                1inch has a decentralized app (dApp) that can be used as a tool to find information, such as the
                best exchange rates for cryptocurrencies. Users can choose from ten networks, including Ethereum,
                Optimism, or Fantom, and connect their digital wallets, such as WalletConnect, Venly, or Coinbase
                Wallet.
                Once their wallet is connected, users can swap tokens.
            </p>

            <div className='font-bold mt-3'>Wallet</div>

            <p>
                1inch has a digital wallet, called 1inch Wallet. It can be downloaded onto mobile devices that
                use Android or iOS. Users can send, receive, store, transfer, stake, and swap cryptocurrency assets with
                the wallet. NFTs can also be stored in the wallet, and users can also access a gaming feature.
            </p>

            <div className='font-bold mt-3'>Aggregation protocol</div>

            <p>
                1inch's aggregation protocol sources liquidity from multiple exchanges. It is also designed with a
                feature to ensure the best rates by splitting a single trade transaction across multiple DEXs. The
                protocol is designed so users' funds will not be lost even in the case of an interaction with
                an unsafe liquidity source.
            </p>

            <div className='font-bold mt-3'>Limit order protocol</div>

            <p>
                1inch's limit order protocol allows users to place an order into the
                1inch database through the 1inch user interface.
                It does not charge any fees, and users can set parameters for conditional orders so their orders are
                only
                executed on what they deem as profitable trades. The limit order protocol is operable on various chains,
                including BNB Chain and Avalanche.
            </p>

            <div className='font-bold mt-3'>Governance</div>

            <p>
                1inch is governed by a decentralized autonomous organization (DAO).
                Users can vote for key protocol parameters as long as they hold 1INCH, the token of 1inch.
                The token serves as both a governance and utility token and is available for purchase on Ethereum
                and BNB Chain.
            </p>
        </div>,

        [ETokensConst.AAVE]: <div>
            <p className='mb-3'>
                Aave is a decentralized cryptocurrency platform that allows users to borrow and lend crypto.
                Aave uses smart contracts to automate the process, with preset rules on how funds are distributed,
                how collateral is handled, and how fees are assessed.
            </p>

            <p className='mb-3'>
                Aave specializes in overcollateralized loans, meaning that users will need to deposit crypto worth
                more than the amount that they wish to borrow. This protects lenders from losing money due to loan
                defaults and allows the Aave protocol to liquidate the collateral if it drops too much in value.
            </p>

            <p className='mb-3'>
                Aave also offers a native crypto token (AAVE) that can be traded on most exchanges or staked in the
                Aave platform to earn interest. Staking is how crypto miners earn rewards for validating transactions
                on a proof-of-stake blockchain like the one that underlies Aave.
            </p>
        </div>,

        [ETokensConst.AGLD]: <div>
            <p className='mb-3'>
                Adventure Gold (AGLD) is the native ERC-20 token of the Loot non-fungible token (NFT) project.
                Loot is a text-based, randomized adventure gear generated and stored on-chain, created by social
                media network Vine co-founder Dom Hofmann. The project intentionally has no front-end interface,
                images, statistics or functionality. Instead, it is based on a set of 8,000 text-based NFTs open
                to how the community wants to interpret it. The NFTs contain texts of gears ranging from the
                “Holy Greaves of Giants” to the “Grim Shout.” As of Sept. 8, 2021, the floor price of Loot on OpenSea is
                8.56 ETH.
                Numerous derivative projects are being built around Loot and can be found here.
            </p>

            <p className='mb-3'>
                Adventure Gold was launched on Sept. 2, 2021, and allowed each owner of a Loot NFT to claim 10,000
                tokens for free. With the price of AGLD skyrocketing in the initial days of trading, this airdrop was
                worth as much as $70,000 per NFT. AGLD founder Will Papper claimed he wanted to set a standard for
                projects
                building on Loot by providing a currency for the decentralized gaming universe.
            </p>

            <div className='font-bold'>Who Are the Founders of Adventure Gold?</div>

            <p className='mb-3'>
                Adventure Gold was founded by Will Papper, who is also the co-founder of Syndicate DAO, a decentralized
                investing protocol. Papper is a graduate of Stanford University and a crypto-native, having owned
                Ethereum
                since the 2014 pre-sale. He created Adventure Gold as a reaction to Vitalik Buterin endorsing the
                project
                and encouraging others to build upon it. Papper launched AGLD one day after Buterin’s endorsement on
                Twitter, by writing the majority of the code in four hours at a small airport in Oregon. As of
                Sept. 6, 2021, Adventure Gold has no official development team beyond Papper.
            </p>

            <div className='font-bold mb-2'>What Makes Adventure Gold Unique?</div>

            <p className='mb-3'>
                Adventure Gold follows the approach the underlying Loot NFT game has hoped for, by the community
                building on top of Loot as a form of endorsement. While the simplicity and uniqueness of Loot itself
                inspired the Web3 community to come up with numerous derivatives projects based on its code, Adventure
                Gold itself aims to be used as a governance token and have users vote on future in-game credits or
                future
                mints building on top of Loot and adopting AGLD.
            </p>

            <p className='mb-3'>
                A multisig group consisting of Papper and other “extremely reputable community members who
                love Loot” can execute contractual permissions, such as minting decisions and other
                governance proposals. The development speed of Loot and Adventure Gold and the buzz surrounding
                the project have also led to a uniquely volatile trading environment, fuelled by the decision of
                powerhouse exchanges like FTX to list AGLD merely 30 hours after its launch.
            </p>

            <div className='font-bold mb-2'>How Many Adventure Gold (AGLD) Coins Are There in Circulation?</div>

            <p className='mb-3'>
                Adventure Gold has a total supply of 75.3 million AGLD. Each of the 8,000
                initial Loot NFTs received 10,000 AGLD as airdrop, with the remaining supply
                being released on the open market. Currently, exchanges like Huobi, FTX and Uniswap
                V3 are the biggest holders of AGLD.
            </p>

            <div className='font-bold mb-2'>How Is the Adventure Gold Network Secured?</div>

            <p className='mb-3'>
                Adventure Gold is an ERC-20 token on Ethereum. The token does not provide a security audit,
                but it is governed by a multisig consisting of its founder and several other still-anonymous wallets.
            </p>

            <p>
                Ethereum is one of the most popular blockchains and the go-to solution for many decentralized
                applications and open source projects like Loot and Adventure Gold. ERC-20 is the token standard
                followed by almost all tokens on the Ethereum blockchain.
            </p>
        </div>,

        [ETokensConst.ANKR]: <div>
            <p className='mb-3'>
                Ankr is a developer of blockchain protocols created to enhance the efficiency of international
                public ledgers. Ankr's platform utilizes blockchain technology for the distribution of cloud
                computing and offers a decentralized computing framework and a platform for business applications.
            </p>

            <p className='mb-3'>
                The distributed computing platform aims to use idle computing resources found in data centers
                and edge devices. Ankr enables a sharing economy model, allowing enterprises and consumers to
                monetize spare computing capacities right from their devices and on-premise servers, including
                private and public clouds.
            </p>

            <div className='font-bold mb-2'>Token</div>

            <p>
                ANKR Token is the native utility token required for transactions and payments for
                Ankr’s services, including platform governance. It possesses capabilities as a BEP-2,
                ERC-20, and BEP-20 token. Ankr is available on the Avalanche, Polygon, and Fantom networks.
                The token's major function is allowing institutional or independent node providers to earn
                from their nodes' excess capacity via a pay-as-you-go model.
            </p>
        </div>,

        [ETokensConst.APE]: <div>
            <p className='mb-3'>
                ApeCoin is an ERC-20 governance and utility token used within the APE Ecosystem to empower and
                incentivize a decentralized community building at the forefront of web3.
            </p>

            <p className='mb-3'>
                ApeCoin holders govern themselves via the decentralized governance framework controlling the ApeCoin
                DAO,
                and vote on how the ApeCoin DAO Ecosystem Fund should be used. The APE Foundation administers proposals
                agreed upon by ApeCoin holders.
            </p>

            <p className='mb-3'>
                ApeCoin is the APE Ecosystem’s governance token, allowing token holders to participate in ApeCoin DAO
                and
                giving its participants a shared and open currency that can be used without centralized intermediaries.
                62% of all ApeCoin was allocated to the Ecosystem Fund,
                which will support community-driven initiatives as voted on by ApeCoin DAO members.
            </p>

            <p className='mb-3'>
                ApeCoin also gives access to certain parts of the Ecosystem that are otherwise unavailable, like
                exclusive games and services. For third-party developers,
                ApeCoin is a tool to participate in the ecosystem by incorporating ApeCoin into
                services, games, and other projects.
            </p>

            <p>
                The APE Foundation was gifted a 1 of 1 NFT by Yuga Labs, the creators of Bored Ape Yacht Club. Yuga Labs
                has conveyed all rights and privileges to this NFT and its underlying artwork to the APE Foundation. The
                ApeCoin DAO members can decide how this intellectual property is used.
            </p>
        </div>,

        [ETokensConst.ANT]: <div>
            <p>
                Aragon (ANT) is a decentralized platform built on the Ethereum network that offers a modularized way to
                create and manage dApps, cryptoprotocols, and decentralized autonomous organizations (DAO). The ANT
                ERC-20
                token will enable its holders to govern the Aragon Network.
            </p>
        </div>,

        [ETokensConst.ARPA]: <div>
            <p>
                Founded in April 2018, the goal of ARPA is to separate data utility from ownership and enable
                data renting. ARPA’s MPC protocol creates ways for multiple entities to collaboratively analyze
                data and extract data synergies while keeping each party’s data input private and secure.
            </p>

            <p>
                Developers can build privacy-preserving dApps on blockchains compatible with ARPA. Some immediate use
                cases
                include credit anti-fraud, secure data wallet, precision marketing, joint AI model training, and key
                management
                systems. For example, banks using the ARPA network can share their credit blacklist with each other for
                risk
                management purposes without exposing their customer data or privacy.
            </p>
        </div>,

        [ETokensConst.AVAX]: <div>
            <p className='mb-3'>
                Avalanche (AVAX) is a cryptocurrency and blockchain platform that rivals Ethereum. AVAX is the native
                token of the Avalanche blockchain, which—like Ethereum—uses smart
                contracts to support a variety of blockchain projects.
            </p>

            <p className='mb-3'>
                The Avalanche blockchain can provide near-instant transaction finality. AVAX is used to pay transaction
                processing fees and secure the Avalanche network, and acts as a basic unit of account among blockchains
                in the Avalanche network. Transaction fees and the rate of AVAX coin creation are determined using a
                governance model.
            </p>

            <p>
                Avalanche is a competitor to Ethereum that prioritizes scalability and transaction processing speed.
            </p>
        </div>,

        [ETokensConst.AXS]: <div>
            <p className='mb-3'>
                Axie Infinity is an online gaming platform built on blockchain by Sky Mavis. The company was founded
                by Aleksander Leonard Larsen and Trung Nguyen in 2018. The game allows players to collect different
                digital pets called Axies, which can be raised, battled, and traded to other players in the Axie world.
                The game was originally inspired by the well-known game Pokemon.
            </p>

            <p>
                AXS is the game's native governance token, and holders of AXS are part of Axie's decentralized
                community and can help shape and govern the platform's development. AXS is ERC-20 tokens that can
                be traded on the Ethereum network.
            </p>
        </div>,

        [ETokensConst.ADA]: <div>
            <p className='mb-3'>
                Cardano is a third-generation, decentralized proof-of-stake (PoS) blockchain platform designed to be a
                more efficient alternative to proof-of-work (PoW) networks.
                Scalability, interoperability, and sustainability on PoW networks are limited by the
                infrastructure burden of growing costs, energy use, and slow transaction times.
            </p>

            <p className='mb-3'>
                Charles Hoskinson, the co-founder of the proof-of-work (PoW) blockchain Ethereum, understood the
                implications of these challenges to blockchain networks, and began developing Cardano and its primary
                cryptocurrency, ada, in 2015, launching the platform and the ADA token in 2017.
            </p>

            <p>
                Cardano is a blockchain platform that aims to be a decentralized application (DApp) development platform
                with a multi-asset ledger and verifiable smart contracts.
                Cardano is being built in five stages: foundation, decentralization, smart contracts, scaling, and
                governance.
                Cardano runs on the proof-of-stake Ouroboros consensus protocol and developments are informed by
                scholarly academic research. The primary cryptocurrency of Cardano is called "ada".
                Cardano oversight is decentralized and shared by The Cardano Foundation, IOHK, and EMURGO.
            </p>
        </div>,

        [ETokensConst.ATOM]: <div>
            <p className='mb-3'>
                Cosmos is an ecosystem of blockchains that can scale and interoperate with each other. Before Cosmos,
                blockchains were siloed and unable to communicate with each other. They were hard to build and could
                only handle a small amount of transactions per second.
                Cosmos solves these problems with a new technical vision.
            </p>

            <p>
                Cosmos (ATOM) is a cryptocurrency that powers an ecosystem of blockchains designed to scale and
                interoperate with each other. The team aims to "create an Internet of Blockchains,
                a network of blockchains able to communicate with each other in a decentralized way."
                Cosmos is a proof-of-stake chain. ATOM holders can stake their tokens in order to
                maintain the network and receive more ATOM as a reward.
            </p>
        </div>,

        [ETokensConst.BAL]: <div>
            <p className='mb-3'>
                Balancer Protocol is an automated portfolio manager and liquidity provider that transforms the concept
                of an index fund so that instead of paying fees to portfolio managers to rebalance a portfolio, users
                can
                collect fees from traders who rebalance their portfolio by taking advantage of arbitrage opportunities.
            </p>

            <p className='mb-3'>
                The platform runs on the Ethereum network and seeks to incentivize a distributed network of computers to
                operate
                an exchange where users can buy and sell any cryptocurrency. It is an emerging decentralized finance
                (DeFi) protocol
                that utilizes a combination of cryptocurrency assets to provide this service, enabling trading without a
                financial
                intermediary like an exchange.
            </p>

            <p className='mb-3'>
                With Balancer, users can adjust allocations to suit their particular needs, effectively allowing them to
                add
                liquidity without being exposed to the price of Ethereum (ETH). Additionally, users can earn interest
                from the fees
                generated on the Balance Exchange. Even though the highest returns in lending are usually sourced in
                high demand for a specific asset, users of the platform can see a considerable return on an asset that
                is
                typically in low demand as a result of arbitrage opportunities or a desire to mitigate slippage.
            </p>

            <p className='mb-3'>
                Developers can use Balancer as an open-source platform to create new treasury management systems,
                opening up
                possibilities for dynamic fees and enabling the creation of liquidity bootstrapping pools (LBPs). These
                pools can be used,
                for instance, to launch a new cryptocurrency token. “Token” refers to a generic asset:
                Balancer's first implementation was a contract system that managed ERC20 tokens on the Ethereum network.
            </p>

            <p className='mb-3'>
                According to the company, its mission is to become the primary source of decentralized finance liquidity
                by
                providing the most flexible and powerful platform for asset management and decentralized exchange.
            </p>

            <p>
                Balancer has introduced a native governance token, BAL, that is used by users to vote on protocol
                upgrades,
                including supported collateral, fees, and incentives.
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
                Compound (COMP) is an Ethereum-based token that allows the community to govern the
                Compound protocol. The protocol consists of a series of decentralized interest rate
                markets that enable users to supply and borrow Ethereum tokens at variable interest rates.
            </p>

            <div className='font-bold mb-2'>To begin with, the primary users of the platform consist of:</div>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    Lenders: Lenders are users (could be anybody) who want to lend a cryptocurrency on
                    the Compound platform. The lenders can do so by sending their tokens to an Ethereum
                    address managed by Compound in order to generate interest.
                </li>

                <li className='mb-1'>
                    Borrowers: Borrowers are users (could be anybody) who share cryptocurrency
                    collateral on the Compound platform. They are permitted to borrow cryptocurrencies
                    supported by Compound at a percentage of the posted value.
                </li>
            </ul>

            <p>
                As per the whitepaper, asset suppliers (and borrowers) interact directly with the
                protocol, earning and paying a floating interest rate without needing to negotiate
                terms like maturity, interest rate, or collateral with a peer or counterparty.
            </p>
        </div>,

        [ETokensConst.CRV]: <div>
            <p className='mb-3'>
                The Curve is one of the most widely used DeFi (decentralized finance) platforms that
                utilizes an automated market maker (AMM) to manage liquidity. AMM is a protocol that
                uses liquidity pools and allows digital assets to be traded automatically. Liquidity
                pool is one of the core technologies present in the DeFi ecosystem. These pools form
                an essential part of various protocols, including AMM, blockchain gaming, borrow-lend
                protocols, and more. The Curve platform provides an efficient way to exchange tokens
                by maintaining low slippage rates. Consequently, the platform acts as a decentralized
                exchange by connecting users to trade with the finest rates.
            </p>

            <p>
                The unique feature about CRV is that it is a utility token of the Curve.fi protocol
                for exchanging stablecoins and other ERC-20 tokens. Unlike other exchanges that match
                buyers and sellers, Curve.fi provides an exchange platform that works on different
                behavior and leverages liquidity pools. Thus, Curve creates liquidity pools based
                on smart contracts that function as an automated market maker, rather than relying
                on order books (electronic documentation of a currency’s buy and sell activities).
                Besides, CRV token holders have the right to suggest and vote on the changes to
                the platform.
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
                Dash (DASH) is a payments-focused peer-to-peer cryptocurrency. Forked out of
                Bitcoin source code, Dash is an open-source platform that claims itself to be
                user-friendly, fast, and inexpensive. As per the whitepaper, the Dash project
                is focused on making financial transactions through cryptocurrency instant and
                easy to use. Made from the abbreviation of “Digital Cash,” Dash aims to move payments
                anywhere to anyone for less than a cent.
            </p>

            <p className='mb-3'>
                Today, major problems in making cryptocurrency get to mainstream adoption are low transaction
                speeds and high fees. It can take almost 10 minutes for a transaction to be completed. Also,
                the fee of crypto transactions can sometimes cost more than the transaction itself. To solve
                these problems, Dash was built to provide users with instantly confirmed transactions for a minuscule
                fee.
            </p>

            <p className='mb-2'>
                Made on the vision to reach a broader market, Dash is one of the early projects to modify
                Bitcoin’s code to give it advantages and abilities to make it a preferred medium of exchange.
                Some of the advantages of Dash are:
            </p>

            <ul className='pl-[25px] list-disc mb-3'>
                <li className='mb-1'>
                    Fast Speed: The transaction of Dash is confirmed within seconds, thereby taking
                    very little time to validate a transaction. A full block is created in just two
                    and a half minutes, whereas Bitcoin has a ten-minute block time.
                </li>

                <li className='mb-1'>
                    Lower Fees: A Dash transaction costs as low as $0.01, making it an efficient medium of exchange.
                </li>

                <li className='mb-1'>
                    Privacy: Dash autonomously secures the sender’s and receiver’s details. This can prevent
                    them from being traced and identities not revealed.
                </li>
            </ul>

            <p className='mb-3'>
                Coming to the token, DASH is the native token of the platform. DASH is the token used
                for financial transactions on the platform. The token is easy to purchase and receive.
                DASH can be used to pay for coffee, purchase a plane ticket, pay phone bills, pay family
                and friends, and purchase groceries, electronics, and more. In simpler words, the token
                is intended to be used for daily transactions between peers.
            </p>

            <p>
                Further, the token has a limited supply and is deflationary in nature, i.e., the tokens
                are burned to an unrecoverable wallet and are put out of the total supply. This deflationary
                nature makes the DASH token increase in value over time.
            </p>
        </div>,

        [ETokensConst.ENJ]: <div>
            <p className='mb-3'>
                Enjin (ENJ) is an online gaming community creation platform built on Ethereum blockchain.
                Enjin aims to make the gaming experience easy for developers and players by providing
                crypto-backed value and tools like software development kits (SDKs), game plugins, wallets,
                virtual item management apps, along with a payment gateway platform. Using the Enjin platform,
                gamers and content creators can easily manage, distribute, and trade their virtual goods (NFTs).
            </p>

            <p>
                ENJ is the native token of the Enjin platform. When a new NFT is minted on the network, a
                chosen amount of ENJ is minted into the token through a smart contract. The locked funds give
                the newly built goods real-world value, as each item can be at any point melted back into the
                underlying ENJ backing. Owners of various virtual goods on Enjin can convert their NFTs into ENJ
                at their original exchange rate (when the NFTs were minted). Since Enjin is built on the Ethereum
                platform, ENJ is an ERC-20 token—which means ENJ can be traded with other tokens on Ethereum
                blockchain and with real-world value.
            </p>
        </div>,

        [ETokensConst.ENS]: <div>
            <p className='mb-3'>
                Ethereum Name Service is a decentralized and extensible naming system based on the Ethereum blockchain.
                ENS is deployed to convert human-readable names like “alice.eth” to a machine-readable identifier
                format such as Ethereum addresses, content hashes, metadata, and other cryptocurrency addresses.
                In addition, ENS supports the reverse resolution, which makes it possible to associate metadata such
                as interface descriptions or canonical names with Ethereum addresses.
            </p>

            <p className='mb-3'>
                By following the rules set by these registrar contracts, anyone can get ownership of a
                domain for their use. Notably, the domain owner may be an external account (a user) or a smart
                contract. But a registrar is a smart contract that owns a domain and issues subdomains to users
                following some set of rules as determined in the contract. The .eth registrar migrated and became
                an ERC721-compliant non-fungible token (NFT) contract, which means .eth registrations can be
                transferred similar to those of other NFTs.
            </p>

            <p className='mb-3'>
                Moving to the next component, resolvers are actually involved in the process of translating names
                into addresses. Any contract that executes the relevant standards can act as a resolver in ENS.
            </p>

            <p className='mb-3'>
                To summarize, one can easily understand ENS by simply comparing it with DNS. DNS
                converts website address domain names into Internet Protocol (IP) addresses. ENS also serves
                the same purpose, but domains are mapped into 42-character Ethereum addresses instead of IP
                addresses.
            </p>

            <p className='mb-3'>
                The hierarchical structure of ENS enables anyone who owns a domain at any level to configure
                subdomains for themselves or others as desired. For instance, if X owns alice.eth, they can
                create pay.alice.eth and configure it as per their wish.
            </p>

            <p>
                The ENS DAO (decentralized autonomous organization) is a DAO that governs the ENS protocol.
                The Ethereum Name Service token with ticker ENS is the standard ERC20 governance token of
                the ecosystem.
            </p>
        </div>,

        [ETokensConst.EOS]: <div>
            <p className='mb-3'>
                An open-source blockchain leveraging smart contracts, EOS is used to deploy and run decentralized
                applications (dApps) for real-world use. EOS can support thousands of dApps without experiencing slow
                confirmation times or high fees, and it aims to be fast, flexible, reliable and forward-driven. EOS
                hopes
                to enable developers, entrepreneurs, and institutions to build and innovate with confidence.
            </p>

            <p className='mb-3'>
                The EOS blockchain offers features that set it apart from competing blockchains. Firstly, the blockchain
                is highly configurable, and developers can develop dApps using simple languages such as C++. Secondly,
                the
                blockchain supports fast transactions, with settlement speeds of under 0.5 seconds. Lastly, the
                blockchain
                maintains data integrity and security through verification standards and end-to-end authentication.
            </p>

            <p className='mb-3'>
                The EOS core infrastructure has a flexible architecture and keeps much of the blockchain functionality
                at the smart contract layer, enabling the EOS Network to remain agile and allowing block producers (BPs)
                to
                reach consensus on adopting new enhancements to the platform, often without requiring a
                difficult-to-coordinate
                hard fork of the network.
            </p>

            <p>
                EOS is the native token of the EOS blockchain. The token is used for purchasing or renting access to
                network
                bandwidth and storage capacity on EOS, participating in DPoS network consensus and on-chain governance,
                and
                an account for value on native EOS-based applications.
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
                The GALA token is the Gala Games ecosystem's digital utility token. The token is cryptographically
                secured and native to the Gala Games ecosystem. GALA can be transferred peer-to-peer between users,
                and they have complete control over how to use it. Thus, the GALA token fuels the Gala Games ecosystem.
            </p>

            <p className='mb-3'>
                The participants in the Gala Games ecosystem use GALA as a non-refundable utility token and a medium
                of exchange. Introducing GALA aims to provide a suitable and secure mode of payment and settlement
                between
                participants who interact within the Gala Games ecosystem, for instance, to pay for digital goods or
                in-game
                items. Such items on the Ethereum blockchain can be accessed with a variety of open-source and
                cryptographically
                secure wallets and storage mechanisms. The GALA website wallet and the GALA app are open-source,
                keyphrase-secured
                crypto wallets. Once you have created the wallet, nobody else other than the account owner has access to
                the funds
                and items stored within that wallet.
            </p>

            <p className='mb-3'>
                The decentralized Gala Games ecosystem desires to make the doors wide open for users and give players
                back the control they deserve. Through decentralization, players, in addition to owning their in-games
                items,
                have a say in how the Gala Games road map develops. Players and node owners will be enlisted, through
                distributed
                voting mechanisms, to help decide on the games to be added or funded by the decentralized Gala Games
                ecosystem.
            </p>

            <p>
                Founder’s nodes are Gala Games ecosystem's backbone. Everyone operating a founder’s node is contributing
                to the growth of the decentralized gaming network. By running a founder’s node, players can work to get
                real
                ownership of their assets and content. A consensus vote is a voting opportunity presented to all
                founder’s node
                operators in the node network. Often these votes are about which games come to the Gala Games platform.
            </p>
        </div>,

        [ETokensConst.GRT]: <div>
            <p className='mb-3'>
                The Graph (GRT) is a protocol for indexing and accessing blockchain data. The Graph indexes blockchain
                records from networks like Ethereum in the same way that Google indexes the web. The Graph is a global
                data
                layer that runs on top of blockchains and storage networks, acting as a uniting and organizing factor
                for the
                decentralization movement. In simple terms, The Graph organizes the data and makes it easy to retrieve
                it from
                the blockchain.
            </p>

            <p className='mb-3'>
                Indexing a blockchain is a hard task, and many complex smart contracts that store data on blockchain
                make
                it difficult for a DApp to answer a simple query. As per the whitepaper, the Graph protocol aims to make
                it
                easy to retrieve data from the blockchain by using subgraphs. According to the protocol, a subgraph
                seeks to
                specify which Ethereum data the protocol indexes and how it is being stored. Subgraphs, which are open
                APIs
                (application programming interfaces), organize this information that anybody may use to query.
                Subsequently,
                with just a few keystrokes, this data can be transformed, categorized, and shared across apps for anyone
                to query.
                All data is saved and processed in a secure manner on open networks. The Graph protocol aims to query
                this data
                quickly, reliably, and securely.
            </p>

            <p>
                Deployed on the Ethereum blockchain, GRT is the native token of The Graph and is the platform’s
                cryptocurrency.
                GRT is an ERC20-based work token and is primarily utilized for allocating resources in the network.
                Participants
                stake and utilize Graph tokens (GRT) to maintain the economic security of the network and the integrity
                of data
                queried. Active indexers, curators, and delegators may provide services and earn revenue from the
                network based
                on their work and how much GRT they own.
            </p>
        </div>,

        [ETokensConst.ICX]: <div>
            <p className='mb-3'>
                ICON (ICX) is a protocol developed for creating decentralized applications (DApps) and is based on
                blockchain technology. The project’s conceptualization is based on the idea of connecting the world.
                Historically, technological innovations have enabled people to connect; for instance, postal services
                and
                telephones made it possible for people to connect irrespective of distance, enabling freedom of
                mobility.
                Similarly, the project intends to build a more seamless connection worldwide.
            </p>

            <p className='mb-3'>
                The platform aims to remove any barriers that exist in the centralized system. ICON (ICX) seeks to
                create
                a decentralized network that enables independent blockchains with different governances to carry out
                transactions among each other without any intermediary. The network allows anyone to develop a new
                blockchain
                project and join the forum.
            </p>

            <p className='mb-3'>
                The protocol essentially aims for decentralized governance. In other words, every blockchain connected
                to
                the nexus holds its governance. The nexus refers to a multi-channel blockchain comprising light clients
                of
                respective blockchains. The platform’s tokens are integrated into the nexus chain, and the various
                interconnected
                blockchains can use the tokens for transferring value. In addition, the nexus takes forward the
                discussions
                with an equal level of representation on behalf of every independent blockchain.
            </p>

            <p>
                ICX is the native token of the platform that supports, verifies, and executes a negotiated agreement
                between
                consenting parties within the ecosystem. The token can be used to pay the transaction fee, and other
                tokens
                can be converted into ICX via decentralized exchange (DEX). Further, the issuance and storage of tokens
                are done
                in a public wallet called the public treasury.
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
                Injective is a blockchain designed specifically for the finance industry. It is an open, interoperable
                layer-one blockchain that aims to power next-generation decentralized finance (DeFi) applications, such
                as decentralized spot and derivatives exchanges, prediction markets, and lending protocols.
            </p>

            <p className='mb-3'>
                Injective aims to provide financial infrastructure primitives that DeFi applications can use, such as
                a fully decentralized on-chain orderbook that is resistant to MEV (miner extractable value). In
                addition,
                all types of financial markets, such as spot, perpetual, futures, and options, are fully on-chain. The
                decentralized cross-chain bridging infrastructure is compatible with Ethereum, IBC-enabled blockchains,
                and non-EVM chains such as Solana.
            </p>

            <p className='mb-3'>
                Injective also seeks to offer a next-generation, highly interoperable smart contract platform based on
                CosmWasm, with advanced interchain capabilities. It is built using the Cosmos SDK and uses a
                Tendermint-based
                Proof-of-Stake consensus mechanism, providing instant transaction finality and fast performance (over
                10,000 transactions per second).
            </p>

            <p>
                The Injective ecosystem includes over 100 projects and more than 150,000 community members worldwide.
                It is backed by investors such as Binance, Pantera Capital, Jump Crypto, and Mark Cuban. The INJ token
                is
                the native utility token of Injective, and it can be used for various purposes, including protocol
                governance, dApp value capture, PoS security, developer incentives, and staking.
            </p>
        </div>,

        [ETokensConst.USDT]: <div>
            <p className='mb-3'>
                Tether (USDT) is a cryptocurrency stablecoin pegged to the U.S. dollar and backed "100% by
                Tether's reserves," according its website. USDT is a type of cryptocurrency pursuing a
                steady valuation.
            </p>

            <p className='mb-3'>
                Tether was launched as Real Coin in July 2014 and was rebranded as Tether in November 2014.
                It started trading in February 2015.23 Originally based on the Bitcoin blockchain, Tether now
                supports Bitcoin's Omni and Liquid protocols as well as the Ethereum, TRON, EOS, Algorand, Solana,
                OMG Network, and Bitcoin Cash (SLP) blockchains.
            </p>

            <p>
                Tether is used by investors who want to avoid the volatility typical of cryptocurrencies while
                holding funds within the crypto system.
            </p>
        </div>,

        [ETokensConst.BCH]: <div>
            <p className='mb-3'>
                Bitcoin Cash BCH holds an important place in the history of altcoins because it is one of the
                earliest and most successful hard forks of the original Bitcoin.
                In the cryptocurrency world, a fork takes place as the result of debates and arguments between
                developers and miners. Due to the decentralized nature of digital currencies,
                wholesale changes to the code underlying the token or coin at hand must be made due to
                general consensus; the mechanism for this process varies according to the particular cryptocurrency.
            </p>

            <p className='mb-3'>
                When different factions can’t agree, sometimes the digital currency is split, with the original chain
                remaining true to its original code and the new chain beginning life as
                a new version of the prior coin, complete with changes to its code.
            </p>

            <p>
                BCH began its life in August 2017 as a result of one of these splits. The debate that led to
                the creation of BCH had to do with the issue of scalability; the Bitcoin network has
                a limit on the size of blocks: 1 megabyte (MB). BCH increases the block size from 1MB to 8MBs,
                with the idea being that larger blocks can hold more transactions within them, and
                the transaction speed would therefore increase. It also makes other changes,
                including the removal of the Segregated Witness protocol that impacts block space.
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
                Kusama is a scalable network of blockchains meant for experimentation. Kusama is the identical
                copy of the Polkadot blockchain and provides a pre-production environment for Polkadot. The platform
                allows
                developers to experiment and test new decentralized applications (DApps) before releasing them on the
                network
                in real time. The blockchains available on Kusama’s network are called Parachains that bring several
                breakthroughs
                compared to the legacy networks.
            </p>

            <p className='mb-3'>
                While other networks only allow developers to build using smart contracts, Kusama seeks to give them
                complete control over the underlying blockchain. This flexibility aims to provide freedom to the
                developers
                to optimize for better use cases and hence better and secure DApps and services for all. Smart contracts
                are
                just like regular contracts; however, instead of being drafted on paper, these contracts run in the form
                of protocols
                on the blockchain. Moreover, Kusama also serves as a Canary Network for Polkadot. Official Polkadot
                upgrades are
                tested on Kusama before they are launched. Hence, the primary use case of Kusama is to facilitate
                testing.
            </p>

            <p>
                KSM is the native token of the platform. KSM has many use cases on the platform like token holders can
                validate the network, nominate other validators, and use governance rights to vote on the major
                decisions of
                the platform, all using KSM.
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
                Loopring (LRC) is an Ethereum token that describes itself as “an open-source, audited, and non-custodial
                exchange protocol.” The protocol aims to allow anyone to build non-custodial, decentralized exchanges on
                top of it by leveraging zero-knowledge proofs (ZKPs), a popular means of enhancing privacy in
                cryptocurrency.
                ZKPs ensure that assets are always in the control of users.
            </p>

            <p className='mb-3'>
                The majority of crypto trading takes place on centralized cryptocurrency exchanges, which are online
                platforms
                run by private corporations that hold users’ funds and match trading orders. However, as indicated in
                the whitepaper,
                these platforms come with a variety of risks. The three main risks of centralized exchanges include lack
                of security,
                lack of transparency, and lack of liquidity. As a result, a new type of exchange called decentralized
                exchange has
                evolved to address these issues. These exchanges are different from centralized exchanges because users
                keep control
                of their private keys by trading directly on the underlying blockchain. However, decentralized exchanges
                are not completely
                free from flaws. Performance and structural constraints continue to be a problem.
            </p>

            <p className='mb-3'>
                Hence, Loopring’s stated purpose is to create a hybrid platform that combines prominent features of both
                centralized and decentralized exchanges. The protocol aims to maintain the benefits of decentralized
                exchanges while
                lowering or eliminating their inefficiencies through hybrid solutions. Loopring intends to improve order
                execution
                efficiency and DEX liquidity by managing the orders in a centralized manner but settling the trade on
                blockchain.
            </p>

            <p>
                Another prominent feature that Loopring seeks to offer is the low transaction cost. Loopring aims to
                execute
                the majority of operations, such as trade and transfer settlement, off the Ethereum blockchain. This
                considerably
                reduces the gas usage and overall transaction cost to a fraction of what it would be on-chain.
            </p>
        </div>,

        [ETokensConst.MASK]: <div>
            <p className='mb-3'>
                Mask Network is a gateway that allows users to access the world of decentralized web or Web 3.0 through
                the Mask Network extension. Mask Network, rather than developing a new platform, bridges Web 2.0 and Web
                3.0,
                allowing people to access Web 3.0 within existing mainstream platforms. Web 2.0, in simple words, is
                what the
                general public believes to be the "internet." Web 3.0 is about reclaiming decentralized control of user
                data and
                building a censorship-resistant, open internet driven by new technology like the blockchain.
            </p>

            <p className='mb-3'>
                The problem that Mask Network is aiming to solve is the present internet is dominated by technology
                firms,
                which influence how users interact with the online world, including what they publish, what they see,
                and whom they
                contact. Since today's Web 2.0 platforms can make content vanish if it does not adhere to companies’
                rules, users
                typically do not have complete ownership of the content they upload.Besides this, the platform believes
                that many
                issues have surfaced on social media. Users can rarely make cross-border payments, have no storage space
                for long-term
                files, and have no genuinely secure encryption. The social media platforms benefit from users' data and
                labor, and users
                have little leverage to stop them.
            </p>

            <p className='mb-3'>
                Mask Network seeks to solve the above-mentioned persisting issues with the Mask Network extension. As
                mentioned on
                the website, users can install the Mask Network extension, log in with their Mask IDs, and connect their
                wallets. This
                way, users can use familiar Web 2.0 sites with Web 3.0 integrations. The Mask Network extension supports
                blockchains
                like Ethereum, Binance Smart Chain (BSC), Polygon, etc. Mask Network is also compliant with various
                social media
                sites like Twitter and Facebook. Users can do various things with the Mask Network extension:
            </p>

            <ol className='pl-[16px] list-disc'>
                <li className='mb-3'>
                    Users can keep their content hidden from prying eyes and only show it to their intended audience.
                </li>

                <li className='mb-3'>
                    Users can send encrypted messages.
                </li>

                <li className='mb-3'>
                    Thanks to integrated widgets on social media sites, users can see the current prices of crypto
                    assets without leaving the page—platforms like Uniswap, SushiSwap, etc. power this feature.
                </li>

                <li className='mb-3'>
                    Users can create their own Web 3.0 profile and keep track of all of their digital
                    activities in one location, including NFTs (non-fungible tokens), donation data, etc.
                    Users can choose whether or not they want to keep things on their profile anonymous.
                </li>

                <li className='mb-3'>
                    Users can trade NFTs directly from social media platforms. OpenSea, an NFT marketplace, powers this
                    feature.
                </li>

                <li className='mb-3'>
                    Users can store their files on a decentralized network.
                </li>
            </ol>

            <p>
                The native utility token of Mask Network is MASK. MASK is also a governance token for MaskDAO, the Mask
                ecosystem's
                governing decentralized autonomous organization (DAO). Each MASK token represents one vote in
                DAO-related activities.
                Apart from this, Mask Network seeks to launch the Mask Grant Program to provide financial assistance to
                initiatives
                that can contribute to or integrate into the Mask Network crypto ecosystem.
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
                Maker is an Ethereum-based governance and utility token of the Maker system.
                Maker aims to unlock the potential of decentralized finance by building an inclusive
                platform for economic empowerment that gives everyone equal access to the global financial marketplace.
            </p>

            <p className='mb-3'>
                Notably, the Maker Platform consists of the following components:
            </p>

            <ol className='pl-[16px] list-disc'>
                <li className='mb-3'>
                    <b>MakerDAO:</b> MakerDAO is an open-source community project on the Ethereum blockchain
                    and a decentralized autonomous organization. The project is administered by people all over
                    the world who own MKR, the project's governance token. MKR holders regulate the Maker Protocol
                    and Dai's financial risks using a scientific governance mechanism that includes executive voting
                    and governance polling (called DSChief). The MKR voting weight is proportional to the number of
                    MKR tokens staked by a voter in the voting contract. In simple words, the more MKR tokens are
                    locked into the contract, the more decision-making power the voter has. MakerDAO as a group is
                    devoted to improving the Bitcoin economy's stability.
                </li>

                <li className='mb-3'>
                    <b>Maker Protocol:</b> The Maker Protocol, developed on the Ethereum blockchain,
                    allows users to build their own currency, the Dai stablecoin. MakerDAO regulates
                    the Maker Protocol by deciding on critical parameters (e.g., stability fees,
                    collateral types/rates, etc.) using MKR holders' voting power. The Maker Protocol,
                    one of the largest decentralized applications (DApps) on the Ethereum blockchain,
                    was the first to gain widespread popularity as a decentralized finance (DeFi) application.
                    Additionally, Maker collateral vaults, oracles, and voting are other important components
                    of the Marker Protocol. The Maker Protocol makes use of a two-token system, Dai and MKR.

                    <ul className='pl-[25px] list-disc'>
                        <li><b>Dai:</b>
                            The Dai stablecoin is a decentralized and collateral-backed pegged cryptocurrency.
                            A pegged cryptocurrency is one whose exchange rate in relation to a traditional currency has
                            been
                            pre-determined by a national government. The Maker community thinks that a decentralized
                            stablecoin
                            is essential for any business or individual to achieve the benefits of digital currency.
                        </li>

                        <li><b>MKR:</b>
                            MKR is a governance token used by stakeholders to keep the system running
                            and Dai in check. MKR token holders make decisions for the Maker Protocol, which is
                            supported by the greater public community and a variety of other external stakeholders.
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
                SAND is an Ethereum token that powers The Sandbox, a multiplayer metaverse where
                players can create, monetize, and participate in blockchain-based gaming experiences.
                In The Sandbox, game designers can create custom 3D NFTs that can be used across the
                ecosystem. SAND can be used to buy and sell NFTs and other in-game items, and can also
                be used to vote on the future of the platform.
            </p>
        </div>,

        [ETokensConst.SNX]: <div>
            <p className='mb-3'>
                Synthetix (SNX) is software built on the Ethereumblockchain. Synthetix utilizes a
                decentralized finance (DeFi) protocol that enables it to provide services without needing
                any intermediary. This implies that Synthetix users do not have to trust any specific institution
                or person to manage their crypto asset. The primary purpose of Synthetix is to be used for the
                creation of synthetic assets, also known as “synths”—a combination of assets having the same value
                as another asset. The synths may track and provide a return on another asset without requiring
                anyone to hold that asset. In simpler words, Synthetix cryptocurrency provides exposure to a
                wide variety of crypto as well as non-crypto assets in a decentralized and permissionless manner.
                It enables users to participate in the DeFi ecosystem despite not holding the assets.
            </p>

            <p className='mb-3'>
                Further, as mentioned in the whitepaper, synths provide access to even those assets that
                are usually not accessible for an average trader, such as gold and silver. For doing so,
                synths use smart-contract-based price discovery protocols, known as oracles, that permit users
                to hold and exchange the underlying assets. Smart contracts are just like regular contracts;
                however, instead of being drafted on paper, these contracts run in the form of protocols on the
                blockchain. They are used to automate a workflow and trigger the forthcoming actions when the
                conditions are met. In this way, Synthetix aims to allow users to efficiently trade synth assets
                without facing liquidity issues. Unlike traditional finance, Synthetix does not require any KYC or
                creating an account, yet anyone can get exposure to stocks, bonds, real estate, and other assets.
            </p>

            <p className='mb-3'>
                SNX is the native token of Synthetix, which is necessary to create synthetic assets (synths).
                Once the SNX tokens are locked up, new synths can be created.
            </p>

            <p>
                Since synths are issued on Ethereum, they can also be placed into other DeFi platforms. After
                that, the assets can be used to provide liquidity and earn yield. Thus, in order to start
                trading synths, traders can exchange their ETH against synths and start trading immediately.
                Alternatively, one can also obtain SNX tokens on any platform, create synths, and begin trading them.
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
                Storj (STORJ) is an Ethereum token that powers a decentralized cloud storage network
                for developers called Storj DCS (Decentralized Cloud Storage). After a customer uploads
                a file to Storj DCS, pieces of each file are distributed to a global network of independent
                nodes. When someone requests the file, it is then recompiled securely and made available
                for download. This means that anyone can store files on Storj DCS without having to trust
                a centralized data center. Developers can purchase cloud storage services with STORJ.
                Network participants earn STORJ in return for providing unused hard drive space and
                bandwidth to the network.
            </p>
        </div>,

        [ETokensConst.SUSHI]: <div>
            <p>
                SushiSwap (SUSHI) is a decentralized exchange (or DEX) built on the Ethereum network.
                Originally forked from Uniswap, SushiSwap leverages smart contracts in order to provide
                liquidity pools that allow users to directly trade crypto assets — with no intermediary.
                Users can also become liquidity pool providers, supplying an equal value pair of two
                cryptocurrencies in order to receive rewards whenever anyone utilizes that pool.
                It is a decentralized finance (or DeFi) protocol.
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
                USD Coin (USDC) is a stablecoin redeemable on a 1:1 basis for US dollars, backed by
                dollar denominated assets held in segregated accounts with US regulated financial
                institutions. The launch of USDC was powered by a collaboration between Coinbase
                and Circle through the co-founding of the CENTRE Consortium. Coinbase customers
                with US dollar accounts may exchange 1 USDC for US$1.00 (and vice versa) on Coinbase
                in jurisdictions where USDC support is available. The graph above reflects USDC’s current
                and historical redemption value of US$1.00, which may not match the price of USDC on other
                exchanges. Note: Coinbase only supports USDC running on Ethereum (ERC-20).
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
                Stellar’s cryptocurrency, the Stellar Lumen (XLM), powers the Stellar payment network.
                As a cross-border transfer and payment system that connects financial entities, Stellar aims
                to unite the world’s financial infrastructure, connecting banks, payment systems, and individuals
                with near-instant and secure transfers.
            </p>

            <p>
                If the Internet connected the world’s computers to enable the free global flow of information,
                Stellar aims to do the same for money. To accomplish this vision while maintaining neutrality,
                Stellar is not set up as a bank or a business. Instead it’s a decentralized, open network that is
                supported by a nonprofit foundation called the Stellar Development Foundation (or SDF, for short).
            </p>
        </div>,

        [ETokensConst.YFI]: <div>
            <p>
                Yearn.finance (YFI) is an Ethereum token that governs the Yearn.finance platform.
                The platform is a yield optimizer that moves funds around the decentralized finance
                (“defi”) ecosystem in an effort to generate a high return.
            </p>
        </div>,

        [ETokensConst.ZEC]: <div>
            <p className='mb-3'>
                Zcash (ZEC) is a privacy-protecting, decentralized cryptocurrency. According to the website,
                Zcash was created as a fork of the Bitcoin codebaseto enable privacy. The Zcash protocol uses
                zk-SNARKs, zero-knowledge cryptography that ensures the transaction verification doesn’t reveal
                sensitive information of the transaction. Every transaction gets tracked and managed on a public
                blockchain, but these public transactions do not reveal user identities. Zcash aims to offer its
                users the right to privacy while enjoying the benefits of a permissionless digital currency.
            </p>

            <p className='mb-3'>
                Zcash facilitates optional anonymity by offering two types of addresses: transparent address
                (T-addresses) and private addresses (Z-addresses). Transactions between T-addresses are publicly
                viewable on the Zcash blockchain. However, Z-addresses are shielded addresses and therefore are not
                visible.
                Transactions between shielded addresses do not reveal the transaction address, the amount transferred,
                or any
                other sensitive information. T-addresses and Z-addresses are interoperable, and funds can be transferred
                between the two.
            </p>

            <p className='mb-3'>
                ZEC is the native token of the Zcash platform. The token can be mined using the Equihash proof-of-work
                algorithm. Proof of work is a transaction verification mechanism that uses hardware’s processing power
                to produce a new block on the chain. The ZEC token gets used by Z-addresses and T-addresses for
                transactions.
                Moreover, the ZEC token is the platform’s cryptocurrency and can be bought on many exchanges like
                Coinbase.
            </p>

            <p>
                Shielded transactions of Z-addresses use the zero-knowledge succinct non-interactive argument of
                knowledge (zk-SNARK) cryptography protocol. There are two parties in the zero-knowledge proof: the
                prover and the verifier. The protocol states that the prover can prove to the verifier that they possess
                specific knowledge without actually disclosing what the knowledge is. Therefore, the protocol uses a
                secret
                key to confirm the possession of information. For each shielded transaction, the sender uses their key
                to
                generate proof that their inputs are valid. Miners check the shielded transaction by verifying the key.
                This way, Zcash requires more work up front, but it simplifies verifying.
            </p>
        </div>,

        [ETokensConst.BNB]: <div>
            <p className='mb-3'>
                Binance Coin is the cryptocurrency issued by the Binance exchange and trades with the BNB symbol.
            </p>

            <p className='mb-3'>
                BNB was initially based on the Ethereum network but is now the native currency of Binance's own
                blockchain, the Binance chain.
            </p>

            <p className='mb-3'>
                Every quarter, Binance uses one-fifth of its profits to repurchase and permanently destroy, or "burn,"
                Binance coins held in its treasury.
            </p>

            <p>
                Binance was created as a utility token for discounted trading fees in 2017, but its uses have expanded
                to
                numerous applications, including payments for transaction fees (on the Binance Chain), travel bookings,
                entertainment, online services, and financial services.
            </p>
        </div>,

        [ETokensConst.BTC]: <div>
            <p className='mb-3'>
                The world’s first cryptocurrency, Bitcoin (BTC), is stored and exchanged securely on
                the Internet through the digital ledger known as the blockchain.
            </p>

            <p className='mb-2'>The value of bitcoin is formed by several factors:</p>

            <ul className='pl-[25px] list-disc'>
                <li className='mb-1'>The ideology of cryptocurrency creation is independence from the state.</li>
                <li className='mb-1'>The demand for bitcoin is increasing and the number of released coins is gradually
                    decreasing.
                </li>
                <li className='mb-1'>Bitcoin emission is limited to 21,000,000 coins. No more can be created.</li>
                <li className='mb-1'>Mining of coins requires labor, computing resources, and electricity.</li>
            </ul>
        </div>,

        [ETokensConst.DAI]: <div>
            <p className='mb-3'>
                The Dai stablecoin uses a basket of crypto assets as collateral at a ratio of 150% to the value of its
                tokens. It is pegged to the U.S. dollar.
            </p>

            <p className='mb-3'>
                Dai is held in cryptocurrency wallets or within platforms, and is supported on
                Ethereum and other popular blockchains.
            </p>

            <p className='mb-3'>
                Dai is easy to generate, access, and use. Users generate Dai by depositing collateral assets into Maker
                Vaults within the Maker Protocol. This is how Dai is entered into circulation and how users gain access
                to liquidity. Others obtain Dai by buying it from brokers or exchanges, or simply by receiving it as a
                means of payment.
            </p>

            <p className='mb-3'>
                Once generated, bought, or received, Dai can be used in the same manner as any other cryptocurrency: it
                can be sent to others, used as payments for goods and services, and even held as savings through a
                feature
                of the Maker Protocol called the Dai Savings Rate (DSR).
            </p>

            <p>
                Every Dai in circulation is directly backed by excess collateral, meaning that the value of the
                collateral is higher than the value of the Dai debt, and all Dai transactions
                are publicly viewable on the Ethereum blockchain.
            </p>
        </div>,

        [ETokensConst.DOGE]: <div>
            <p className='mb-3'>
                Dogecoin is an open-source cryptocurrency started in 2013 by Jackson Palmer and Billy Markus.
            </p>

            <p className='mb-3'>
                Dogecoin initially started as a joke based on a popular meme featuring a Shiba Inu
                (a Japanese breed of dog).
            </p>

            <p className='mb-3'>
                It is based on Litecoin and uses the same proof-of-work technology.
            </p>

            <p>
                Dogecoin has a loyal community of supporters who trade it and use it as a tipping currency for social
                media content.
            </p>
        </div>,

        [ETokensConst.DOT]: <div>
            <p className='mb-3'>
                Polkadot (DOT) is a unique PoS cryptocurrency aimed at delivering interoperability among other
                blockchains. Its protocol is designed to connect permissioned and permissionless blockchains
                as well as oracles to allow systems to work together under one roof. Polkadot’s core component
                is its relay chain, which allows the interoperability of varying networks. It also allows for
                parachains, or parallel blockchains with their own native tokens for specific-use cases.
            </p>

            <p className='mb-3'>
                Where Polkadot differs from Ethereum is that rather than creating just dApps on Polkadot, developers can
                create their own blockchain while also using the security that Polkadot’s chain already has. With
                Ethereum, developers can create new blockchains but need to create their own security measures,
                which can leave new and smaller projects open to attack because the larger a blockchain,
                the more security it has. This concept in Polkadot is known as shared security.
            </p>

            <p>
                Polkadot was created by Gavin Wood, another member of the core founders of the Ethereum project who had
                differing opinions about the project’s future.
            </p>
        </div>,

        [ETokensConst.ETC]: <div>
            <p className='mb-3'>
                Ethereum Classic (ETC) is an open-source, decentralized, blockchain-based distributed cryptocurrency
                platform that runs smart contracts. Ethereum Classic was formed in 2016 as a result of a hack of The
                DAO, a smart contract operating on the Ethereum blockchain. The original blockchain was split in two,
                with the majority of users choosing to reverse the hack and return the stolen funds.
            </p>

            <p>
                The split revealed philosophical divisions within the Ethereum community. Based on the principle that
                “Code is Law,” a small number of developers and miners believed that The DAO's investors should
                suffer the consequences of investing in a flawed project. However, the majority of the
                Ethereum community decided to roll back the blockchain, effectively creating a bailout for
                The DAO's investors. Ethereum Classic is the name of the original, smaller blockchain.
            </p>
        </div>,

        [ETokensConst.ETH]: <div>
            <p className='mb-3'>
                Ethereum (ETH) is both a cryptocurrency and a decentralized computing platform.
                Developers can use the platform to create decentralized applications
                and issue new crypto assets known as Ethereum tokens.
            </p>

            <p className='mb-3'>
                Ethereum is similar to Bitcoin and other coins. But Ether is
                much more than just a blockchain-platform, which performs a
                direct function of currency services. It's a complex system
                of smart contracts, the idea of which is to combine completely
                different areas and improve processes, optimize routine operations.
            </p>

            <ul className='pl-[25px] list-disc'>
                <li className='mb-1'>
                    Smart contracts are algorithms in the network that track if-then type operations.
                    They oversee the compliance of all parties with the terms of the transaction
                    (performing actions, transferring money, etc.).
                </li>
                <li className='mb-1'>
                    Smart contracts eliminate the need for an intermediary, which increases speed,
                    increases safety, and reduces the costs of transaction processing.
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
                Chainlink (LINK) is a cryptocurrency and technology platform that enables non-blockchain enterprises to
                securely connect with blockchain platforms. Chainlink is middleware that connects blockchain-based smart
                contracts with external data, such as baseball scores or stock prices.
            </p>

            <p className='mb-3'>
                Chainlink tokens—called LINK—serve as currency to pay Chainlink network operators for retrieving and
                preparing off-chain data and performing computations.
            </p>

            <p className='mb-3'>
                Chainlink is known as a decentralized oracle network or blockchain abstraction layer. Chainlink
                uses blockchain technology to securely enable computations on and off blockchain, supporting
                what it calls hybrid smart contracts.
            </p>

            <p className='mb-3'>
                Enterprises that use Chainlink can access any of the major blockchain networks, including
                Ethereum, Solana, and Terra. The Chainlink blockchain is hosted on the Ethereum platform,
                which uses the proof of work operating protocol.
            </p>

            <p>
                Chainlink is an open-source blockchain project, meaning that anyone can view the
                project's code and contribute.
            </p>
        </div>,

        [ETokensConst.LTC]: <div>
            <p className='mb-3'>
                Litecoin (LTC) is a cryptocurrency created from a fork in the Bitcoin blockchain in 2011. It was
                initially designed to address the developer's concerns that Bitcoin was becoming too centrally
                controlled, and to make it more difficult for largescale mining firms to gain the upper hand in mining.
                While eventually unsuccessful in preventing enterprise miners from taking over the lion's share of
                Litecoin mining, the cryptocurrency has reworked itself into a minable coin and a peer-to-peer payment
                system.
            </p>

            <p className='mb-3'>
                It shares similar features with Bitcoin but has a different algorithm. The cryptocurrency's goal is to
                become a medium for daily transactions.
            </p>

            <p>Litecoin has a faster transaction processing time compared to Bitcoin.</p>
        </div>,

        [ETokensConst.MANA]: <div>
            <p className='mb-3'>
                Decentraland (MANA) defines itself as a virtual reality platform powered by the Ethereum blockchain that
                allows users to create, experience, and monetize content and applications.
            </p>

            <p className='mb-3'>
                In this virtual world, users purchase plots of land that they can later navigate, build upon and
                monetize.
            </p>

            <p className='mb-3'>
                Decentraland was launched following a $24 million initial coin offering (ICO) that was conducted in
                2017. The virtual world launched its closed beta in 2019 and opened to the public in February 2020.
                Since then, users have created a wide range of experiences on their parcels of LAND, including
                interactive games, sprawling 3D scenes and a variety of other interactive experiences.
            </p>

            <p>
                Decentraland uses two tokens: MANA and LAND. MANA is an ERC-20 token that must be burned to acquire
                non-fungible ERC-721 LAND tokens. MANA tokens can also be used to pay for a range of avatars, wearables,
                names, and more on the Decentraland marketplace.
            </p>
        </div>,

        [ETokensConst.MATIC]: <div>
            <p className='mb-3'>
                Polygon is a cryptocurrency, with the symbol MATIC, and also a technology platform that enables
                blockchain networks to connect and scale.
            </p>

            <p className='mb-3'>
                The Polygon platform operates using the Ethereum blockchain, and connects Ethereum-based projects. Using
                the Polygon platform can increase the flexibility, scalability, and sovereignty of a blockchain project
                while still affording the security, interoperability, and structural benefits of the Ethereum
                blockchain.
            </p>

            <p className='mb-3'>
                MATIC is an ERC-20 token, meaning that it's compatible with other Ethereum-based digital currencies.
                MATIC is used to govern and secure the Polygon network and to pay network transaction fees.
            </p>

            <p>Polygon uses a modified proof-of-stake consensus mechanism to efficiently operate the platform.</p>
        </div>,

        [ETokensConst.NEAR]: <div>
            <p className='mb-3'>
                NEAR Protocol is a layer-one blockchain that was designed as a community-run cloud computing platform
                and
                that eliminates some of the limitations that have been bogging competing blockchains, such as low
                transaction speeds, low throughput and poor interoperability. This provides the ideal environment for
                DApps and creates a developer and user-friendly platform. For instance, NEAR uses human-readable account
                names, unlike the cryptographic wallet addresses common to Ethereum. NEAR also introduces unique
                solutions
                to scaling problems and has its own consensus mechanism called “Doomslug.”
            </p>

            <p className='mb-3'>
                NEAR Protocol is being built by the NEAR Collective, its community that is updating the initial code and
                releasing updates to the ecosystem. Its declared goal is to build a platform that is “secure enough to
                manage high value assets like money or identity and performant enough to make them useful for everyday
                people.”
            </p>

            <p>
                Flux, a protocol that allows developers to create markets based on assets, commodities, real-world
                events, and Mintbase, an NFT minting platform are examples of projects being built on NEAR Protocol.
            </p>
        </div>,

        [ETokensConst.SHIB]: <div>
            <p className='mb-3'>
                Shiba Inu is an Ethereum-based altcoin that features the Shiba Inu hunting dog as its mascot.
            </p>

            <p className='mb-3'>
                It is widely considered to be an alternative to Dogecoin and is touted as "the Dogecoin killer" by its
                supporters, a community known as the SHIBArmy.
            </p>

            <p className='mb-3'>Shiba Inu was created in August 2020 by an individual or group called Ryoshi.</p>

            <p>SHIB ranks in the top ten among all meme cryptocurrencies by this measure, right behind Dogecoin.</p>
        </div>,

        [ETokensConst.SOL]: <div>
            <p className='mb-3'>
                Solana is a blockchain platform designed to host decentralized, scalable applications.
            </p>

            <p className='mb-3'>
                Solana can process many more transactions per second and charges much lower transaction fees
                than rival blockchains like Ethereum.
            </p>

            <p className='mb-3'>
                Solana's native cryptocurrency, which has the ticker SOL, has a market capitalization of over $66
                billion, making it the fifth-largest cryptocurrency.
            </p>

            <p>
                Solana is a proof-of-stake (PoS) blockchain and also uses a new technology called Proof of
                History (PoH).
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
                Tron is a blockchain-based decentralized digital platform with its own cryptocurrency, called Tronix or
                TRX. Founded in 2017 by a Singapore non-profit organization, the Tron Foundation, Tron aims to host a
                global entertainment system for the cost-effective sharing of digital content.
            </p>

            <p className='mb-3'>
                Initially marketed primarily in Asia, Tron had now gone global. The platform had more than 50 million
                accounts.
            </p>

            <p>
                Founded by Justin Sun, now its CEO, Tron has offices in Singapore and San Francisco. Born in 1990, Sun
                also is the CEO of BitTorrent, the file-sharing program.
            </p>
        </div>,

        [ETokensConst.UNI]: <div>
            <p className='mb-3'>
                Uniswap is a decentralized exchange that enables peer-to-peer market making. Uniswap is also a
                cryptocurrency whose symbol is (UNI). The Uniswap platform enables users to trade cryptocurrencies
                without any involvement with a centralized third party.
            </p>

            <p className='mb-3'>The Uniswap blockchain is hosted on the Ethereum platform and governed by UNI
                holders.</p>

            <p className='mb-3'>
                The Uniswap blockchain is open source, meaning that anyone can view and contribute to the
                blockchain's code.
            </p>

            <p>The Uniswap platform is governed by UNI holders in proportion to how much UNI they own.</p>
        </div>,

        [ETokensConst.XMR]: <div>
            <p className='mb-3'>
                Monero (XMR) is a private, secure, and untraceable cryptocurrency. With Monero, you are in complete
                control of your funds and privacy, no one else can see anyone else’s balances or transactions.
            </p>

            <p className='mb-2'>The main features of the coin:</p>

            <ul className='pl-[25px] list-disc'>
                <li className='mb-1'>
                    <a className='font-bold'>
                        Anonymity.
                    </a> Monero transactions are anonymous. It's impossible to find
                    out the balance through its blockchain.
                </li>
                <li className='mb-1'>
                    <a className='font-bold'>
                        Security.
                    </a> Complex mathematical solutions protect users' wallets and
                    transactions conducted in Monero coins.
                </li>
                <li className='mb-1'>
                    <a className='font-bold'>
                        Decentralization.
                    </a> Monero is not controlled by anyone,
                    there are no controlling bodies or centralized servers in this system.
                    The coin is managed by the community of the network.
                </li>
            </ul>
        </div>,

        [ETokensConst.XRP]: <div>
            <p className='mb-3'>
                Ripple is a digital payment platform that uses blockchain technology and a native cryptocurrency to
                facilitate faster and cheaper global transactions. XRP is the native token for the Ripple ledger and is
                used to enhance currency conversion and international financial transfers.
            </p>

            <p>The Ripple payment platform enables fast and cheap cross-border transactions.</p>
        </div>
    }
}
