import CreateIntelligentAnalysisTask from '@/assets/create-intelligent-analysis-task.svg?react'
import Wallet from '@/assets/wallet.svg?react'
import Balances from '@/assets/balances.svg?react'
import Account from '@/assets/account.svg?react'
import Security from '@/assets/security.svg?react'
import CreditCard from '@/assets/credit-card.svg?react'
import PosMachine from '@/assets/pos-machine.svg?react'
import Atm from '@/assets/atm.svg?react'
import History from '@/assets/history.svg?react'
import Euro from '@/assets/euro.svg?react'
import Other from '@/assets/other.svg?react'
import SupportIcon from '@/assets/support-icon.svg?react'
import { FAQTemplate } from './components/FAQTemplate'

export const faqAreasMap = {
  '': null,
  'account-opening': {
    icon: <CreateIntelligentAnalysisTask />,
    title: "account_opening",
    area: (
      <FAQTemplate
        title="account_opening"
        items={[
          {
            title: "who_can_open_gekkard",
            content: (
              <>
                <div>
                  You can open an GEKKARD account in the mobile application (on
                  your smartphone) if you:
                </div>
                <ol>
                  <li> are at least 18 years old; </li>{' '}
                  <li> own a compatible smartphone; </li>{' '}
                  <li> hold a supported ID document; </li>{' '}
                  <li> don't already have an account with us. </li>
                </ol>
              </>
            ),
          },
          {
            title: "how_to_open_gekkard",
            content: (
              <>
                <p>
                  Step 1: Fill in the mobile application your personal details
                  and shipping address. <br /> Step 2: Prove your identity.{' '}
                  <br /> Step 3: Get confirmation that you are registered as a
                  client*. <br /> Step 4: At this point you'll be able to top up
                  your GEKKARD account and use your Virtual GEKKARD. <br /> Step
                  5: After a few days, you’ll receive your GEKKARD Mastercard by
                  post.
                </p>
                <p>*If you meet our minimum trustworthiness criteria.</p>
              </>
            ),
          },
          {
            title: "what_is_age_limit",
            content: (
              <>
                <p>
                  In order to open GEKKARD account you need to be at least 18
                  years old. But an additional card can be issued without age
                  limit.
                </p>
              </>
            ),
          },
          {
            title: "can_i_hold_more_than_one_currency",
            content: (
              <>
                <p>
                  Currently GEKKARD accounts are opened in one currency -
                  EUR.&nbsp;
                </p>
              </>
            ),
          },
          {
            title: "how_to_provide_my_identity",
            content: (
              <>
                <p>
                  As a financial institution, we must follow the “Know Your
                  Customer” procedures. Therefore, during registration in mobile
                  application, you scan an identity document (passport), as well
                  as make a "selfie".
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'account': {
    icon: <Wallet />,
    title:"account",
    area: (
      <FAQTemplate
        title="account"
        items={[
          {
            title: "what_is_a_gekkard_account",
            content: (
              <>
                <p>
                  It is account established by us in your name. Account is used
                  for the processing of transactions from linked GEKKARD, as
                  well as for execution of payment transactions.
                </p>
              </>
            ),
          },
          {
            title: "can_i_hold_more_than_one_currency",
            content: (
              <>
                <p>GEKKARD accounts are opened in one currency - EUR.&nbsp;</p>
              </>
            ),
          },
          {
            title: "how_to_find_my_iban",
            content: (
              <>
                <p>
                  You can find your IBAN in GEKKARD account statement or in the
                  mobile application: money - top up account - account for top
                  up.
                </p>
              </>
            ),
          },
          {
            title: "how_can_i_choose_my_account",
            content: (
              <>
                <p>
                  Following your initiative, the GEKKARD account shall be closed
                  within 1 (one) month of receipt of your written notice in
                  accordance with the procedure set by us. <br /> More detailed
                  information regarding account and card closure you can find in{' '}
                  <a href="terms-and-conditions.html">
                    General terms and conditions
                  </a>
                </p>
              </>
            ),
          },
          {
            title: "my_account_is_negative",
            content: (
              <>
                <p>
                  The most common reasons for an account balance going negative
                  are using your card where online authorization is not
                  requested, or because a request for payment has been
                  delayed.&nbsp;
                </p>
              </>
            ),
          },
          {
            title: "am_i_able_to_get_an_account_statement",
            content: (
              <>
                <p>
                  Yes, you can! Account statements are available in mobile
                  application and Internet bank, as well as you may check the
                  balance and available funds on GEKKARD account or view a
                  statement of recent transactions in the mobile application and
                  Internet bank.
                </p>
              </>
            ),
          },
          {
            title:
              "what_happens_to_funds_coming",
            content: (
              <>
                <p>
                  Any incoming transfers will be returned to the account of
                  sender.
                </p>
              </>
            ),
          },
          {
            title:
              "can_i_see_the_new_gekkard",
            content: (
              <>
                <p>
                  Before receiving a plastic GEKKARD, you will be able to see
                  all of data of a GEKKARD account and a virtual GEKKARD in the
                  mobile application. Virtual card and GEKKARD account are
                  active and can be used immediately after successful
                  registration.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'account-balance': {
    icon: <Balances />,
    title: "account_balance",
    area: (
      <FAQTemplate
        title= "account_balance"
        items={[
          {
            title: "balance_hasnt_been_updated",
            content: (
              <>
                <p>
                  &nbsp;An incoming payment will not increase the balance until
                  it is credited to your GEKKARD account.
                </p>
              </>
            ),
          },
          {
            title: "am_i_able_to_get_a_bank_statement",
            content: (
              <>
                <p>
                  The statement could be found in the mobile application at
                  History section
                </p>
              </>
            ),
          },
          {
            title: "my_account_balance_is_negative",
            content: (
              <>
                <p>
                  In rare cases, the amount of your purchases may exceed the
                  available balance on the GEKKARD account. This happens if the
                  store due to the peculiarities of its work did not check the
                  available balance on your GEKKARD. You need to replenish your
                  GEKKARD account to close this negative balance. After that
                  GEKKARD will work as usual.
                </p>
              </>
            ),
          },
          {
            title:
              "how_can_i_check_gekkard_transactions",
            content: (
              <>
                <p>
                  You can check your transactions and GEKKARD account balance
                  24/7 - 365 days of the year using themobile application or
                  Internet bank.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'personal-information': {
    icon: <Account />,
    title: "personal_information",
    area: (
      <FAQTemplate
        title="personal_information"
        items={[
          {
            title: "who_is_a_politically_exposed_person",
            content: (
              <>
                <p>
                  Natural persons who are or have been entrusted with prominent
                  public functions, other than middle ranking or more junior
                  officials. For more information, see{' '}
                  <a href="terms-and-conditions.html">
                    General terms and conditions
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            title:
              "who_is_a_person_closely_related",
            content: (
              <>
                <p>
                  PEP family member or/ and person known to be close associates
                  to PEP
                </p>
              </>
            ),
          },
          {
            title: "who_is_a_politically_exposed_person_family",
            content: (
              <>
                <ol>
                  <li>
                    {' '}
                    The spouse of PEP, or a person considered to be equivalent
                    to a spouse of PEP.{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    The children of PEP and their spouses, or persons considered
                    to be equivalent to a spouse.{' '}
                  </li>{' '}
                  <li> The parents of PEP. </li>
                </ol>
              </>
            ),
          },
          {
            title:
              "who_is_a_person_known_to_be_close",
            content: (
              <>
                <ol>
                  <li>
                    {' '}
                    A natural person known to have joint beneficial ownership of
                    a body corporate or any other form of legal arrangement, or
                    any other close business relations, with PEP.{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    A natural person who has sole beneficial ownership of a body
                    corporate or any other form of legal arrangement that is
                    known to have been established for the benefit of PEP.{' '}
                  </li>
                </ol>
              </>
            ),
          },
          {
            title:
              "why_do_we_request_information",
            content: (
              <>
                <p>
                  To fulfill our obligations under the Prevention of Money
                  Laundering and Funding of Terrorism Regulations.
                </p>
              </>
            ),
          },
          {
            title: "what_does_personal_data",
            content: (
              <>
                <p>
                  Any information about personal or factual circumstances of a
                  specific or identifiable natural person, such as e.g. name and
                  surname, date of birth, place of birth, identification
                  document (including type of identification document, issue
                  date, ID number, issuing authority), address, telephone
                  number, mobile number, e-mail address, IP address, online
                  identifier, location data, images and information on
                  transactions and accounts.
                </p>
              </>
            ),
          },
          {
            title: "what_is_gdpr",
            content: (
              <>
                <p>
                  General Data Protection Regulation (GDPR) 2016/679 is a
                  regulation in EU law on data protection and privacy for all
                  individuals within the European Union (EU) and the European
                  Economic Area (EEA). The GDPR aims primarily to give control
                  to citizens and residents over their personal data and to
                  simplify the regulatory environment for international business
                  by unifying the regulation within the EU.
                </p>
              </>
            ),
          },
          {
            title: "why_do_we_process_your_personal_data",
            content: (
              <>
                <div>
                  We process your personal data for the following purposes:
                </div>
                <ol>
                  <li>
                    {' '}
                    the performance of contractual and pre-contractual
                    obligations{' '}
                  </li>{' '}
                  <li> the protection of your und our interest </li>{' '}
                  <li>
                    {' '}
                    the ensuring compliance with applicable laws and regulation
                    to which we are subject{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    the execution of transaction through the payment system{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    other purposes specified in{' '}
                    <a href="data-protection-policy.html">
                      Data protection policy
                    </a>
                    .{' '}
                  </li>
                </ol>
              </>
            ),
          },
          {
            title: "is_my_personal_data_protected",
            content: (
              <>
                <p>
                  We collect, use and processing your personal data in
                  accordance with{' '}
                  <a href="data-protection-policy.html">
                    Data protection policy
                  </a>
                  .
                </p>
                <p>
                  We use reasonable measures to help keeping information secure,
                  and to help preventing it from becoming disclosed to persons
                  who are not described in{' '}
                  <a href="data-protection-policy.html">
                    Data protection policy
                  </a>
                  .
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'security': {
    icon: <Security />,
    title: "security",
    area: (
      <FAQTemplate
        title="security"
        items={[
          {
            title: "what_is_card_pin",
            content: (
              <>
                <p>
                  Personal Identification Number (PIN) is a numeric code
                  consisting of four digits. We issue card PIN to you together
                  with the plastic GEKKARD for confirming transactions in ATMs
                  and POS terminals. <br /> Do not share this information with
                  anyone.
                </p>
              </>
            ),
          },
          {
            title:
              "what_should_i_do_if_i_incorrectly",
            content: (
              <>
                <p>
                  or security reasons, your card PIN is blocked after 3
                  incorrect entry attempts. Contact our support team so we can
                  help you. Our support team will also give instructions for
                  further actions concerning your card.
                </p>
              </>
            ),
          },
          {
            title: "i_forgot_card_pin",
            content: (
              <>
                <p>
                  You can view it yourself on the mobile application at the
                  Money section. Click on the picture of the card on which you
                  want to see the data and then on Show card data.
                </p>
              </>
            ),
          },
          {
            title: "what_is_mobile_application_pin",
            content: (
              <>
                <p>
                  This is a digital code, you will invent yourself. It will
                  protects your mobile application from unauthorized use.
                </p>
              </>
            ),
          },
          {
            title: "can_i_change_my_application_pin",
            content: (
              <>
                <p>
                  Yes, you can change it yourself on the mobile application in
                  the section Settings.
                </p>
              </>
            ),
          },
          {
            title:
              "can_i_use_my_mobile_application",
            content: (
              <>
                <p>
                  No you can not. The mobile application PIN is used for
                  application only. Use the card PIN to withdraw cash from an
                  ATM or when making purchases.
                </p>
              </>
            ),
          },
          {
            title: "do_the_card_pin_and_mobile",
            content: (
              <>
                <p>
                  No, they are different. You invent yourself the application
                  PIN, it protects your mobile application. The card PIN is
                  automatically generated by the system, it is displayed on the
                  mobile application in the section Money and you use it for
                  purchases and cash withdrawals at ATMs.
                </p>
              </>
            ),
          },
          {
            title: "what_is_cvc2",
            content: (
              <>
                <p>
                  Security feature of the card consisting of 3 digits and is
                  located on the back of the card within the signature area.
                  &nbsp;
                </p>
              </>
            ),
          },
          {
            title: "what_is_cvc2_for",
            content: (
              <>
                <p>
                  CVC2 is additional security measures for online purchases.{' '}
                  <br /> Do not share this information with anyone.
                </p>
              </>
            ),
          },
          {
            title: "are_the_funds_on_gekkard_account",
            content: (
              <>
                <p>
                  Yes. Your funds shall be deposited in a bank account,
                  separated from our account, in a credit institution domiciled
                  in a reputable jurisdiction. <br /> So in the unlikely event
                  of any insolvency, funds that have reached your GEKKARD
                  account will be protected against claims by our creditors.
                </p>
              </>
            ),
          },
          {
            title: "what_is_3d_secure",
            content: (
              <>
                <p>
                  This is an additional level of security when shopping with
                  your GEKKARD on the Internet.
                </p>
              </>
            ),
          },
          {
            title: "how_does_3d_secure_work",
            content: (
              <>
                <p>
                  3D Secure protects you from online card fraud.To perform
                  authorization of a transaction made using GEKKARD on the
                  Internet where the vendor ensures secure authentication (3-D
                  secure), you shall make additional authorization by confirming
                  such transactions with one-time password derived from us.
                </p>
              </>
            ),
          },
          {
            title: "how_can_i_activate_3d_secure",
            content: (
              <>
                <p>
                  It’s automatically activated when you activate your card in
                  the mobile application. No additional passwords are required.
                </p>
              </>
            ),
          },
          {
            title: "why_do_i_need_to_verify",
            content: (
              <>
                <p>
                  You need to verify your identity in order to use your GEKKARD
                  account. This policy is in line with a banking regulation
                  commonly known as 'Know Your Customer’ (KYC) and is the
                  process of a business verifying the identity of its clients.
                  It is simply an anti-corruption and fraud measure.
                </p>
              </>
            ),
          },
          {
            title: "my_card_has_been_compromised",
            content: (
              <>
                <p>
                  If you believe that your card has been used without your
                  permission, please block the card immediately &nbsp;within the
                  mobile application. Then contact our support team so they can
                  help you.
                </p>
              </>
            ),
          },
          {
            title: "how_do_i_keep_my_gekkard",
            content: (
              <>
                <p>
                  Never share your mobile application passcode with anyone.Use
                  an email address that only you are using and have access
                  to.Never give your full card number, expiry date, card PIN or
                  CVC2 number to anyone, as this is your way to authorise online
                  payments.
                </p>
              </>
            ),
          },
          {
            title: "how_to_block_my_gekkard",
            content: (
              <>
                <p>
                  You can block and unblock your GEKKARD at any time in the
                  mobile application: go to the "Money" section, select the card
                  you need and use the "Block card" button (at the bottom of the
                  screen). You should immediately block your GEKKARD if the card
                  has been lost or stolen, or you suspect that the data of
                  GEKKARD has become known to unauthorized persons. You can
                  later unlock GEKKARD if your suspicions are not confirmed.
                </p>
              </>
            ),
          },
          {
            title: "my_card_has_been_lost_or_stolen",
            content: (
              <>
                <p>
                  Please block GEKKARD immediately in the mobile application. If
                  you later find the card and are sure that no unauthorized
                  persons have used it, then unblock the card yourself in the
                  mobile application. If you are sure that GEKKARD has been
                  stolen or lost, contact our support team.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'cards': {
    icon: <CreditCard />,
    title: "cards",
    area: (
      <FAQTemplate
        title="cards"
        items={[
          {
            title: 'What is a GEKKARD?',
            content: (
              <>
                <p>
                  It is prepaid debit card of MasterCard issued by us to you,
                  which may be in the form of a plastic card or virtual card.
                </p>
              </>
            ),
          },
          {
            title: 'How to apply for the GEKKARD?',
            content: (
              <>
                <div>
                  You can apply for GEKKARD a remote access tool (mobile
                  application) by filling out an application form. <br /> Step
                  1: Fill in the mobile application your personal details and
                  shipping address. <br /> Step 2: Prove your identity . <br />{' '}
                  Step 3: Get confirmation that you are registered as a client*.{' '}
                  <br /> Step 4: After successful registration in the mobile
                  application you get a virtual GEKKARD automatically. At this
                  point you'll be able to top up your account and use your
                  Virtual GEKKARD. <br /> Step 5: After a few days, you’ll
                  receive your GEKKARD Mastercard by post. <br />{' '}
                  <div>
                    {' '}
                    &nbsp; *If you meet our minimum trustworthiness criteria.{' '}
                  </div>
                </div>
              </>
            ),
          },
          {
            title:
              'What is the difference between virtual and plastic GEKKARD?',
            content: (
              <>
                <p>
                  The use of virtual GEKKARD is limited to online purchases.
                </p>
              </>
            ),
          },
          {
            title: 'Where do I use a GEKKARD?',
            content: (
              <>
                <p>
                  GEKKARD may be used to pay for goods and services at
                  participating retailers and online that accept Mastercard
                  cards. <br /> Virtual GEKKARD is designed for online purchases
                  only. <br /> Plastic GEKKARD is designed for use in shops and
                  retail locations where you are physically present. It is
                  possible also to use it for cash withdrawal.
                </p>
              </>
            ),
          },
          {
            title: 'When does my card expire?',
            content: (
              <>
                <p>
                  Your card expires on the last day of the month, which is
                  printed on the front of the card.&nbsp;
                </p>
              </>
            ),
          },
          {
            title: 'How to change GEKKARD limits?',
            content: (
              <>
                <p>
                  You can change your daily and monthly limits in the mobile
                  application. Just go to the "Money" section, select the card
                  you need, select the limit type (daily, monthly), thуn change
                  the amount and confirm your limit change.
                </p>
              </>
            ),
          },
          {
            title: 'How to block my GEKKARD?',
            content: (
              <>
                <p>
                  You can block and unblock your GEKKARD at any time in the
                  mobile application: go to the "Money" section, select the card
                  you need and use the "Block card" button (at the bottom of the
                  screen). You should immediately block your GEKKARD if the card
                  has been lost or stolen, or you suspect that the data of
                  GEKKARD has become known to unauthorized persons. You can
                  later unlock GEKKARD if your suspicions are not confirmed.
                </p>
              </>
            ),
          },
          {
            title: 'Why has my Top-up from card failed?',
            content: (
              <>
                <p>
                  You've had insufficient funds, input wrong card details
                  (expiry date, CVC), or used an expired card.
                </p>
              </>
            ),
          },
          {
            title: 'I have not received my card',
            content: (
              <>
                <div>Depending on the destination, deliveries take:</div>
                <ol>
                  <li> up to 10 working days for EU countries; </li>{' '}
                  <li> up to 15 working days for non-EU countries. </li>
                </ol>
                <p>
                  If you haven't received your card after 10 working days,
                  contact us via chat.
                </p>
              </>
            ),
          },
          {
            title: 'My card has been lost or stolen',
            content: (
              <>
                <p>
                  Please block GEKKARD immediately in the mobile application. If
                  you later find the card and are sure that no unauthorized
                  persons have used it, then unblock the card yourself in the
                  mobile application. If you are sure that GEKKARD has been
                  stolen or lost, contact our support team.
                </p>
              </>
            ),
          },
          {
            title: 'Can I see the new account details before I get my card?',
            content: (
              <>
                <p>
                  Before receiving a plastic GEKKARD, you will be able to see
                  all of data of a GEKKARD account and a virtual GEKKARD in the
                  mobile application. Virtual card and GEKKARD account are
                  active and can be used immediately after successful
                  registration.
                </p>
              </>
            ),
          },
          {
            title:
              'What should I do if I incorrectly entered the card PIN many times?',
            content: (
              <>
                <p>
                  For security reasons all card payments are blocked when the
                  card PIN is entered incorrectly 3 times. Contact our support
                  team so we can help you.
                </p>
              </>
            ),
          },
          {
            title: 'Does the GEKKARD have an expiry date?',
            content: (
              <>
                <p>
                  Yes. GEKKARD is valid until the last day stated on the plastic
                  card (inclusive). <br /> Information of validity of virtual
                  GEKKARD you can find using remote access tool(mobile
                  application).
                </p>
              </>
            ),
          },
          {
            title:
              'Is it possible to link GEKKARD to the account in IBAN format?',
            content: (
              <>
                <p>
                  We open GEKKARD account in IBAN format and, by default, link
                  your GEKKARD to this account. You can use GEKKARD account to
                  make payments.
                </p>
              </>
            ),
          },
          {
            title: 'What is a virtual GEKKARD?',
            content: (
              <>
                <p>
                  It is a non-physical card linked to the GEKKARD account. The
                  virtual GEKKARD number matches the plastic GEKKARD number.
                </p>
              </>
            ),
          },
          {
            title:
              'What documents or information should I submit to apply for GEKKARD?',
            content: (
              <>
                <p>
                  During registration in the mobile application, you scan the
                  original of an identity document (passport).&nbsp;
                </p>
              </>
            ),
          },
          {
            title: 'When will my card be delivered?',
            content: (
              <>
                <div>
                  Your virtual GEKKARD will be issued right after successful
                  registration. You can start to use it on the Internet
                  immediately. Physical plastic GEKKARD will be produced in 24
                  hours and sent to you by mail. Depending on the destination,
                  deliveries take:
                </div>
                <ol>
                  <li> up to 10 working days for EU countries; </li>{' '}
                  <li> up to 15 working days for non-EU countries. </li>
                </ol>
                <p>
                  If you haven't received your card after 10 days, contact our
                  support team.
                </p>
              </>
            ),
          },
          {
            title:
              'Will my personal details (name, surname) be printed on the card?',
            content: (
              <>
                <p>Yes.</p>
              </>
            ),
          },
          {
            title: 'When will my GEKKARD arrive?',
            content: (
              <>
                <div>Depending on the destination, deliveries take:</div>
                <ol>
                  <li> up to 10 working days for EU countries; </li>{' '}
                  <li> up to 15 working days for non-EU countries. </li>
                </ol>
                <p>
                  If you haven't received your card after 10 days, contact us
                  via chat.
                </p>
              </>
            ),
          },
          {
            title: 'How to activate my plastic GEKKARD?',
            content: (
              <>
                <p>
                  To use your plastic GEKKARD, you’ll need to activate it first.
                  You can only do this in the mobile application. Just go to
                  Activate Card and select Start Activation
                </p>
              </>
            ),
          },
          {
            title: 'How to set my card PIN?',
            content: (
              <>
                <p>
                  We don’t send you a card PIN via post. Information about card
                  PIN you can see in the mobile application. <br /> Go to Show
                  Card Data
                </p>
              </>
            ),
          },
          {
            title: 'Can I change GEKKARD limits?',
            content: (
              <>
                <p>Yes, in the mobile application.</p>
              </>
            ),
          },
          {
            title: 'My GEKKARD has been compromised',
            content: (
              <>
                <p>
                  If you believe that your GEKKARD has been used without your
                  permission, please block the card immediately &nbsp;within the
                  mobile application. Then contact our support team so they can
                  help you.
                </p>
              </>
            ),
          },
          {
            title: 'My GEKKARD account is negative, what happened?',
            content: (
              <>
                <p>
                  The most common reasons for an account balance going negative
                  are using your card where online authorization is not
                  requested, or because a request for payment has been
                  delayed.&nbsp;
                </p>
              </>
            ),
          },
          {
            title:
              'What should I do if I incorrectly entered the card PIN many times?',
            content: (
              <>
                <p>
                  or security reasons, your card PIN is blocked after 3
                  incorrect entry attempts. Contact our support team so we can
                  help you. Our support team will also give instructions for
                  further actions concerning your card.
                </p>
              </>
            ),
          },
          {
            title: 'I forgot card PIN, what to do? ',
            content: (
              <>
                <p>
                  You can view it yourself on the mobile application at the
                  Money section. Click on the picture of the card on which you
                  want to see the data and then on Show card data.
                </p>
              </>
            ),
          },
          {
            title:
              'Can I use my mobile application PIN when shopping or withdrawing cash? ',
            content: (
              <>
                <p>
                  No you can not. The mobile application PIN is used for
                  application only. Use the card PIN to withdraw cash from an
                  ATM or when making purchases.
                </p>
              </>
            ),
          },
          {
            title: 'What is an additional card? ',
            content: (
              <>
                <p>
                  This is a card that you can order &nbsp;on the mobile
                  application in addition to the main card. It has a different
                  number and expiration date, but is linked to the same account
                  as the main card. You can use an additional card and a main
                  card at the same time.
                </p>
              </>
            ),
          },
          {
            title: 'For whom can I order an additional card? ',
            content: (
              <>
                <p>
                  You can order an additional card for a member of your family
                  or yourself.
                </p>
              </>
            ),
          },
          {
            title: 'What is a prepaid debit card?',
            content: (
              <>
                <p>
                  This is a card for which no credit limit is issued. Thus, for
                  payments, purchases or cash withdrawals, you must first
                  replenish your card.
                </p>
              </>
            ),
          },
          {
            title: 'What are the advantages of a prepaid debit card?',
            content: (
              <>
                <p>
                  You can easily control your expenses, because card has no
                  credit limit. Thus, you can only spend the amount of money
                  that you have on the card.
                </p>
              </>
            ),
          },
          {
            title: 'Can my card be reloaded?',
            content: (
              <>
                <p>
                  Can my card be reloaded? Yes of course. The card can be
                  reloaded unlimited number of times.
                </p>
              </>
            ),
          },
          {
            title: 'How can I replenish my card?',
            content: (
              <>
                <p>
                  You can replenish a card by SEPA transfer from another bank in
                  euro currency, by transfer from another your card or by
                  internal payment.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'card-purchases': {
    icon: <PosMachine />,
    title: "card_purchases",
    area: (
      <FAQTemplate
        title="card_purchases"
        items={[
          {
            title: 'Where do I use a GEKKARD?',
            content: (
              <>
                <p>
                  GEKKARD may be used to pay for goods and services at
                  participating retailers and online that accept Mastercard
                  cards. <br /> Virtual GEKKARD is designed for online purchases
                  only. <br /> Plastic GEKKARD is designed for use in shops and
                  retail locations where you are physically present. It is
                  possible also to use it for cash withdrawal.
                </p>
              </>
            ),
          },
          {
            title:
              'What is the difference between virtual and plastic GEKKARD?',
            content: (
              <>
                <p>
                  The use of virtual GEKKARD is limited to online purchases.
                </p>
              </>
            ),
          },
          {
            title: 'Сan I make purchases on credit?',
            content: (
              <>
                <p>
                  No. GEKKARD is a prepaid debit card, so spending is limited to
                  the amount that you load on the card.
                </p>
                <p>
                  The transaction will be declined if the funds are
                  insufficient.
                </p>
              </>
            ),
          },
          {
            title: 'What is POS?',
            content: (
              <>
                <p>
                  A point of sale (POS) terminal is an electronic device used to
                  process card payments at retail locations.
                </p>
              </>
            ),
          },
          {
            title: 'What is 3D Secure?',
            content: (
              <>
                <p>
                  This is an additional level of security when shopping with
                  your GEKKARD on the Internet.
                </p>
              </>
            ),
          },
          {
            title: 'How does 3D Secure work?',
            content: (
              <>
                <p>
                  3D Secure protects you from online card fraud.To perform
                  authorization of a transaction made using GEKKARD on the
                  Internet where the vendor ensures secure authentication (3-D
                  secure), you shall make additional authorization by confirming
                  such transactions with one-time password derived from us.
                </p>
              </>
            ),
          },
          {
            title: 'Why has my card payment been declined?',
            content: (
              <>
                <p>
                  Some of the most common reasons are that you've had
                  insufficient funds, input wrong card details (expiry date, or
                  CVC2), exceeded the spending limit set by yourself
                </p>
              </>
            ),
          },
          {
            title: 'My account is negative, what happened?',
            content: (
              <>
                <p>
                  In rare cases, the amount of your purchases may exceed the
                  available balance on the GEKKARD account. This happens if the
                  store due to the peculiarities of its work did not check the
                  available balance on your GEKKARD. You need to replenish your
                  GEKKARD account to close this negative balance. After that
                  GEKKARD will work as usual.
                </p>
              </>
            ),
          },
          {
            title:
              'What should I do if I incorrectly entered the card PIN many times?',
            content: (
              <>
                <p>
                  For security reasons all card payments are blocked when the
                  card PIN is entered incorrectly 3 times. Contact our support
                  team so we can help you.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'atm-transactions': {
    icon: <Atm />,
    title: "atm_transactions",
    area: (
      <FAQTemplate
        title="atm_transactions"
        items={[
          {
            title: 'What is ATM?',
            content: (
              <>
                <p>An automated teller machine (ATM) or cash machine.</p>
              </>
            ),
          },
          {
            title: 'My GEKKARD has been swallowed by an ATM?',
            content: (
              <>
                <p>Please contact our support center so they can help you.</p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'money-transfers': {
    icon: <History />,
    title: "money_transfers",
    area: (
      <FAQTemplate
        title="money_transfers"
        items={[
          {
            title: 'What are SEPA Transfers?',
            content: (
              <>
                <p>
                  SEPA (or the Single Euro Payments Area) is the format for
                  cross-border Euro bank transfers. SEPA is made up of the
                  Eurozone &nbsp;and countries within the EU
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'fees': {
    icon: <Euro />,
    title: "fees",
    area: (
      <FAQTemplate
        title="fees"
        items={[
          {
            title: 'How much does a GEKKARD account cost?',
            content: (
              <>
                <p>
                  In accordance with Tariff <a href="price.html">Tariff</a>
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'other': {
    icon: <Other />,
    title: "other",
    area: (
      <FAQTemplate
        title="other"
        items={[
          {
            title: 'Where can I see more information?',
            content: (
              <>
                <div>Please, read:</div>
                <ol>
                  <li>
                    {' '}
                    <a href="terms-and-conditions.html">
                      General terms and conditions
                    </a>
                    ,{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <a href="data-protection-policy.html">
                      Data protection policy
                    </a>
                    ,{' '}
                  </li>{' '}
                  <li>
                    {' '}
                    <a href="fair-usage.html">
                      Secure usage of the card and the APP
                    </a>{' '}
                  </li>
                </ol>
              </>
            ),
          },
          {
            title: 'My GEKKARD has been compromised?',
            content: (
              <>
                <p>
                  If you believe that your GEKKARD has been used without your
                  permission, please block the card immediately &nbsp;within the
                  mobile application. Then contact our support team so they can
                  help you.
                </p>
              </>
            ),
          },
        ]}
      />
    ),
  },
  'support-chat': {
    icon: <SupportIcon />,
    title: "support_chat",
    area: <FAQTemplate title="support_chat" items={[]} />,
  },
}
export type AvailableFaqAreas = keyof typeof faqAreasMap
export const faqAreasMapKeys = Object.keys(faqAreasMap) as AvailableFaqAreas[]
