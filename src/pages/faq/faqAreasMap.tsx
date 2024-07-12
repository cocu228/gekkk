import { FAQTemplate } from "./components/FAQTemplate";

export const faqAreasMap = (t: (str: string) => string | null = () => null) => ({
  account: {
    title: "support.faq.account.title",
    area: (
      <FAQTemplate
        title='support.faq.account.title'
        items={[
          {
            title: "support.faq.account.what_is_a_gekkard_account",
            content: (
              <>
                <p>{t("support.faq.account.answers.it_is_account_established")}</p>
              </>
            )
          },
          {
            title: "support.faq.account.can_i_hold_more_than_one_currency",
            content: (
              <>
                <p>{t("support.faq.account.answers.gekkard_accounts_are_opened")}</p>
              </>
            )
          },
          {
            title: "support.faq.account.how_to_find_my_iban",
            content: (
              <>
                <p>{t("support.faq.account.answers.you_can_find_your_iban")}</p>
              </>
            )
          },
          {
            title: "support.faq.account.how_can_i_choose_my_account",
            content: (
              <>
                <p>
                  {t("support.faq.account.answers.following_your_initiative")}
                  <br />
                  {t("support.faq.account.answers.more_detailed")}{" "}
                  <a href='terms-and-conditions.html'>
                    {t("support.faq.account.answers.general_terms_and_conditions")}
                  </a>
                </p>
              </>
            )
          },
          {
            title: "support.faq.account.my_account_is_negative",
            content: (
              <>
                <p>{t("support.faq.account.answers.the_most_common")}</p>
              </>
            )
          },
          {
            title: "support.faq.account.am_i_able_to_get_an_account_statement",
            content: (
              <>
                <p>{t("support.faq.account.answers.yes_you_can")}</p>
              </>
            )
          },
          {
            title: "support.faq.account.what_happens_to_funds_coming",
            content: (
              <>
                <p>{t("support.faq.account.answers.any_incoming_transfers")}</p>
              </>
            )
          },
          {
            title: "support.faq.account.can_i_see_the_new_gekkard",
            content: (
              <>
                <p>{t("support.faq.account.answers.before_receiving")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  "account-opening": {
    title: "support.faq.account_opening.title",
    area: (
      <FAQTemplate
        title='support.faq.account_opening.title'
        items={[
          {
            title: "support.faq.account_opening.who_can_open_gekkard",
            content: (
              <>
                <div>{t("support.faq.account_opening.answers.you_can_open_an_gekkard")}</div>
                <ol>
                  <li> {t("support.faq.account_opening.answers.are_at_least")} </li>{" "}
                  <li> {t("support.faq.account_opening.answers.own_a_compatible")} </li>{" "}
                  <li> {t("support.faq.account_opening.answers.hold_a_supported")} </li>{" "}
                  <li> {t("support.faq.account_opening.answers.dont_already")} </li>
                </ol>
              </>
            )
          },
          {
            title: "support.faq.account_opening.how_to_open_gekkard",
            content: (
              <>
                <ol>
                  <li>{t("support.faq.account_opening.answers.step_1")}</li>
                  <li>{t("support.faq.account_opening.answers.step_2")} </li>
                  <li>{t("support.faq.account_opening.answers.step_3")}</li>
                  <li>{t("support.faq.account_opening.answers.step_4")}</li>
                  <li>{t("support.faq.account_opening.answers.step_5")}</li>
                </ol>
                <p>{t("support.faq.account_opening.answers.if_you_meet_our_minimum")}</p>
              </>
            )
          },
          {
            title: "support.faq.account_opening.what_is_age_limit",
            content: (
              <>
                <p>{t("support.faq.account_opening.answers.in_order_to_open_gekkard")}</p>
              </>
            )
          },
          {
            title: "support.faq.account_opening.can_i_hold_more_than_one_currency",
            content: (
              <>
                <p>{t("support.faq.account_opening.answers.currently_gekkard_accounts_are_opened")}</p>
              </>
            )
          },
          {
            title: "support.faq.account_opening.how_to_provide_my_identity",
            content: (
              <>
                <p>{t("support.faq.account_opening.answers.as_a_financial_institution")}</p>
              </>
            )
          }
        ]}
      />
    )
  },

  "account-balance": {
    title: "support.faq.account_balance.title",
    area: (
      <FAQTemplate
        title='support.faq.account_balance.title'
        items={[
          {
            title: "support.faq.account_balance.balance_hasnt_been_updated",
            content: (
              <>
                <p>{t("support.faq.account_balance.answers.an_incoming_patment")}</p>
              </>
            )
          },
          {
            title: "support.faq.account_balance.am_i_able_to_get_a_bank_statement",
            content: (
              <>
                <p>{t("support.faq.account_balance.answers.the_statement")}</p>
              </>
            )
          },
          {
            title: "support.faq.account_balance.my_account_balance_is_negative",
            content: (
              <>
                <p>{t("support.faq.account_balance.answers.in_rare_cases")}</p>
              </>
            )
          },
          {
            title: "support.faq.account_balance.how_can_i_check_gekkard_transactions",
            content: (
              <>
                <p>{t("support.faq.account_balance.answers.you_can_check")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  "personal-information": {
    title: "support.faq.personal_information.title",
    area: (
      <FAQTemplate
        title='support.faq.personal_information.title'
        items={[
          {
            title: "support.faq.personal_information.who_is_a_politically_exposed_person",
            content: (
              <>
                <p>
                  {t("support.faq.personal_information.answers.natural_persons")}{" "}
                  <a href='terms-and-conditions.html'>
                    {t("support.faq.personal_information.answers.general_terms_and_conditions")}
                  </a>
                  .
                </p>
              </>
            )
          },
          {
            title: "support.faq.personal_information.who_is_a_person_closely_related",
            content: (
              <>
                <p>{t("support.faq.personal_information.answers.pep_family_member")}</p>
              </>
            )
          },
          {
            title: "support.faq.personal_information.who_is_a_politically_exposed_person_family",
            content: (
              <>
                <ol>
                  <li> {t("support.faq.personal_information.answers.the_spouse_of_pep")} </li>{" "}
                  <li> {t("support.faq.personal_information.answers.the_children_of_pep")} </li>{" "}
                  <li>{t("support.faq.personal_information.answers.the_parents_of_pep")} </li>
                </ol>
              </>
            )
          },
          {
            title: "support.faq.personal_information.who_is_a_person_known_to_be_close",
            content: (
              <>
                <ol>
                  <li> {t("support.faq.personal_information.answers.a_natural_person_known")} </li>{" "}
                  <li> {t("support.faq.personal_information.answers.a_natural_person_who")} </li>
                </ol>
              </>
            )
          },
          {
            title: "support.faq.personal_information.why_do_we_request_information",
            content: (
              <>
                <p>{t("support.faq.personal_information.answers.to_fulfill")}</p>
              </>
            )
          },
          {
            title: "support.faq.personal_information.what_does_personal_data",
            content: (
              <>
                <p>{t("support.faq.personal_information.answers.any_information")}</p>
              </>
            )
          },
          {
            title: "support.faq.personal_information.what_is_gdpr",
            content: (
              <>
                <p>{t("support.faq.personal_information.answers.general_data")}</p>
              </>
            )
          },
          {
            title: "support.faq.personal_information.why_do_we_process_your_personal_data",
            content: (
              <>
                <div>{t("support.faq.personal_information.answers.we_process")}</div>
                <ol>
                  <li> {t("support.faq.personal_information.answers.the_performance")} </li>{" "}
                  <li>{t("support.faq.personal_information.answers.the_protection")}</li>{" "}
                  <li> {t("support.faq.personal_information.answers.the_ensuring")} </li>{" "}
                  <li> {t("support.faq.personal_information.answers.the_execution")} </li>{" "}
                  <li>
                    {" "}
                    {t("support.faq.personal_information.answers.other_purposes")}{" "}
                    <a href='data-protection-policy.html'>
                      {t("support.faq.personal_information.answers.data_protection")}
                    </a>
                    .{" "}
                  </li>
                </ol>
              </>
            )
          },
          {
            title: "support.faq.personal_information.is_my_personal_data_protected",
            content: (
              <>
                <p>
                  {t("support.faq.personal_information.answers.we_collect")}{" "}
                  <a href='data-protection-policy.html'>
                    {t("support.faq.personal_information.answers.data_protection")}
                  </a>
                  .
                </p>
                <p>
                  {t("support.faq.personal_information.answers.we_use")}{" "}
                  <a href='data-protection-policy.html'>
                    {t("support.faq.personal_information.answers.data_protection")}
                  </a>
                  .
                </p>
              </>
            )
          }
        ]}
      />
    )
  },
  security: {
    title: "support.faq.security.title",
    area: (
      <FAQTemplate
        title='support.faq.security.title'
        items={[
          {
            title: "support.faq.security.what_is_card_pin",
            content: (
              <>
                <p>
                  {t("support.faq.security.answers.pin_is")}
                  <br />
                  {t("support.faq.security.answers.do_not")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.security.what_should_i_do_if_i_incorrectly",
            content: (
              <>
                <p>{t("support.faq.security.answers.or_security")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.i_forgot_card_pin",
            content: (
              <>
                <p>{t("support.faq.security.answers.you_can_view")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.what_is_mobile_application_pin",
            content: (
              <>
                <p>{t("support.faq.security.answers.this_is_a_digital")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.can_i_change_my_application_pin",
            content: (
              <>
                <p>{t("support.faq.security.answers.yes_you_can")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.can_i_use_my_mobile_application",
            content: (
              <>
                <p>{t("support.faq.security.answers.no_you_can_not")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.do_the_card_pin_and_mobile",
            content: (
              <>
                <p>{t("support.faq.security.answers.no_they_are_different")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.what_is_cvc2",
            content: (
              <>
                <p>{t("support.faq.security.answers.security_feature")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.what_is_cvc2_for",
            content: (
              <>
                <p>
                  {t("support.faq.security.answers.cvc2_is")} <br />
                  {t("support.faq.security.answers.do_not_share")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.security.are_the_funds_on_gekkard_account",
            content: (
              <>
                <p>
                  {t("support.faq.security.answers.yes_your_funds")}
                  <br />
                  {t("support.faq.security.answers.so_in_the_unlikely")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.security.what_is_3d_secure",
            content: (
              <>
                <p>{t("support.faq.security.answers.this_is_an")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.how_does_3d_secure_work",
            content: (
              <>
                <p>{t("support.faq.security.answers.3d_secure_protects")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.how_can_i_activate_3d_secure",
            content: (
              <>
                <p>{t("support.faq.security.answers.it_is_automatically")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.why_do_i_need_to_verify",
            content: (
              <>
                <p>{t("support.faq.security.answers.you_need_to")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.my_card_has_been_compromised",
            content: (
              <>
                <p>{t("support.faq.security.answers.if_you_believe")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.how_do_i_keep_my_gekkard",
            content: (
              <>
                <p>{t("support.faq.security.answers.never_share")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.how_to_block_my_gekkard",
            content: (
              <>
                <p>{t("support.faq.security.answers.you_can_block")}</p>
              </>
            )
          },
          {
            title: "support.faq.security.my_card_has_been_lost_or_stolen",
            content: (
              <>
                <p>{t("support.faq.security.answers.please_block")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  card: {
    title: "support.faq.card.title",
    area: (
      <FAQTemplate
        title='support.faq.card.title'
        items={[
          {
            title: "support.faq.card.what_is_a_gekkard",
            content: (
              <>
                <p>{t("support.faq.card.answers.it_is_prepaid")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.how_to_apply_for_the_gekkard",
            content: (
              <>
                <div>
                  {t("support.faq.card.answers.you_can")}
                  <br />
                  {t("support.faq.card.answers.step_1")}
                  <br />
                  {t("support.faq.card.answers.step_2")}
                  <br /> {t("support.faq.card.answers.step_3")} <br />
                  {t("support.faq.card.answers.step_4")}
                  <br />
                  {t("support.faq.card.answers.step_5")}
                  <br /> <div> {t("support.faq.card.answers.if_you_meet_our_minimum")} </div>
                </div>
              </>
            )
          },
          {
            title: "support.faq.card.what_is_the_difference",
            content: (
              <>
                <p>{t("support.faq.card.answers.the_use_of_virtual")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.where_do_i_use_a_gekkard",
            content: (
              <>
                <p>
                  {t("support.faq.card.answers.gekkard_may_be_used")}
                  <br />
                  {t("support.faq.card.answers.virtual_gekkard")}
                  <br />
                  {t("support.faq.card.answers.plastic_gekkard")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.card.when_does_my_card_expire",
            content: (
              <>
                <p>{t("support.faq.card.answers.your_card_expires")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.how_to_change_gekkard_limits",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_can_change")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.how_to_block_my_gekkard",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_can_block")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.why_has_my_top_up",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_have_had")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.i_have_not_received_my_card",
            content: (
              <>
                <div>{t("support.faq.card.answers.depending_on_the")}</div>
                <ol>
                  <li> {t("support.faq.card.answers.up_to_10")}</li> <li> {t("support.faq.card.answers.up_to_15")}</li>
                </ol>
                <p>{t("support.faq.card.answers.if_you_haven")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.my_card_has_been_lost_or_stolen",
            content: (
              <>
                <p>{t("support.faq.card.answers.please_block")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.can_i_see_the_new_account",
            content: (
              <>
                <p>{t("support.faq.card.answers.before_receiving")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_should_i_do_if_i_incorrectly",
            content: (
              <>
                <p>{t("support.faq.card.answers.for_security_reasons")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.does_the_gekkard_have_an_expiry_date",
            content: (
              <>
                <p>
                  {t("support.faq.card.answers.yes_gekkard_is")}
                  <br />
                  {t("support.faq.card.answers.information_of_validity")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.card.is_it_possible_to_link_gekkard",
            content: (
              <>
                <p>{t("support.faq.card.answers.we_open_gekkard")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_is_a_virtual_gekkard",
            content: (
              <>
                <p>{t("support.faq.card.answers.it_is_a_non_physical")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_documents_or_information",
            content: (
              <>
                <p>{t("support.faq.card.answers.during_registration")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.when_will_my_card_be_delivered",
            content: (
              <>
                <div>{t("support.faq.card.answers.your_virtual_gekkard_will")}</div>
                <ol>
                  <li> {t("support.faq.card.answers.up_to_10_working")} </li>{" "}
                  <li> {t("support.faq.card.answers.up_to_15_working")} </li>
                </ol>
                <p>{t("support.faq.card.answers.if_you_have_not")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.will_my_personal_details",
            content: (
              <>
                <p>{t("support.faq.card.answers.yes")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.when_will_my_gekkard_arrive",
            content: (
              <>
                <div>{t("support.faq.card.answers.depending_on_the_destination")}</div>
                <ol>
                  <li> {t("support.faq.card.answers.up_to_10_working_days")}</li>{" "}
                  <li> {t("support.faq.card.answers.up_to_15_working_days")}</li>
                </ol>
                <p>{t("support.faq.card.answers.if_you_have_not_received")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.how_to_activate_my_plastic",
            content: (
              <>
                <p>{t("support.faq.card.answers.to_use_your_plastic")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.how_to_set_my_card_pin",
            content: (
              <>
                <p>
                  {t("support.faq.card.answers.we_do_not_send")}
                  <br />
                  {t("support.faq.card.answers.go_to_show")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.card.can_i_change_gekkard_limits",
            content: (
              <>
                <p>{t("support.faq.card.answers.yes_in_the_mobile")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.my_gekkard_has_been_compromised",
            content: (
              <>
                <p>{t("support.faq.card.answers.if_you_believe")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.my_gekkard_account_is_negative",
            content: (
              <>
                <p>{t("support.faq.card.answers.the_most_common")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_should_i_do_if_i_incorrectly",
            content: (
              <>
                <p>{t("support.faq.card.answers.or_security")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.i_forgot_card_pin",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_can_view")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.can_i_use_my_mobile_application",
            content: (
              <>
                <p>{t("support.faq.card.answers.no_you_can_not")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_is_an_additional_card",
            content: (
              <>
                <p>{t("support.faq.card.answers.this_is_a_card")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.for_whom_can_i_order_an_additional_card",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_can_order")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_is_a_prepaid_debit_card",
            content: (
              <>
                <p>{t("support.faq.card.answers.this_is_a_card_for")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.what_are_the_advantages",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_can_easily")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.can_my_card_be_reloaded",
            content: (
              <>
                <p>{t("support.faq.card.answers.can_my_card")}</p>
              </>
            )
          },
          {
            title: "support.faq.card.how_can_i_replenish_my_card",
            content: (
              <>
                <p>{t("support.faq.card.answers.you_can_replenish")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  card_limits: {
    title: "support.faq.card_limits.title",
    area: (
      <FAQTemplate
        title='support.faq.card_limits.title'
        items={[
          {
            title: "",
            content: (
              <>
                <p>{t("support.faq.card_limits.answers.the_function")}</p>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <div className='mt-[10px]'>
                  {t("support.faq.card_limits.answers.cash")}
                  <br />
                  {t("support.faq.card_limits.answers.payment")}
                </div>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <p className='mt-[10px]'>{t("support.faq.card_limits.answers.day_limit")}</p>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <p className='mt-[10px]'>{t("support.faq.card_limits.answers.possible")}</p>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <p className='mt-[10px]'>{t("support.faq.card_limits.answers.month_limit")}</p>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <p className='mt-[10px]'>{t("support.faq.card_limits.answers.monts_limit_ans")}</p>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <p className='mt-[10px]'>{t("support.faq.card_limits.answers.temporarily")}</p>
              </>
            )
          },
          {
            title: "",
            content: (
              <>
                <p className='mt-[10px]'>{t("support.faq.card_limits.answers.temporarily_ans")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  "card-purchases": {
    title: "support.faq.card_purchases.title",
    area: (
      <FAQTemplate
        title='support.faq.card_purchases.title'
        items={[
          {
            title: "support.faq.card_purchases.where_do_i_use_a_gekkard",
            content: (
              <>
                <p>
                  {t("support.faq.card_purchases.answers.gekkard_may_be_used")}
                  <br />
                  {t("support.faq.card_purchases.answers.virtual_gekkard")}
                  <br />
                  {t("support.faq.card_purchases.answers.plastic_gekkard")}
                </p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.what_is_the_difference",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.the_use_of_virtual")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.can_i_make_purchases_on_credit",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.no_gekkard_is")}</p>
                <p>{t("support.faq.card_purchases.answers.the_transaction_will")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.what_is_pos",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.a_point_of_sale")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.what_is_3d_secure",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.this_is_an")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.how_does_3d_secure_work",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.3d_secure_protects")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.why_has_my_card_payment_been_declined",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.some_of_the_most")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.my_account_is_negative",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.in_rare_cases")}</p>
              </>
            )
          },
          {
            title: "support.faq.card_purchases.what_should_i_do_if_i_incorrectly",
            content: (
              <>
                <p>{t("support.faq.card_purchases.answers.for_security_reasons")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  "atm-transactions": {
    title: "support.faq.atm_transactions.title",
    area: (
      <FAQTemplate
        title='support.faq.atm_transactions.title'
        items={[
          {
            title: "support.faq.atm_transactions.what_is_atm",
            content: (
              <>
                <p>{t("support.faq.atm_transactions.answers.an_automated")}</p>
              </>
            )
          },
          {
            title: "support.faq.atm_transactions.my_gekkard_has_been_swallowed",
            content: (
              <>
                <p>{t("support.faq.atm_transactions.answers.please_contact")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  "money-transfers": {
    title: "support.faq.money_transfers.title",
    area: (
      <FAQTemplate
        title='support.faq.money_transfers.title'
        items={[
          {
            title: "support.faq.money_transfers.what_are_sepa_transfers",
            content: (
              <>
                <p>{t("support.faq.money_transfers.answers.sepa_is_the")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  fees: {
    title: "support.faq.fees.title",
    area: (
      <FAQTemplate
        title='support.faq.fees.title'
        items={[
          {
            title: "support.faq.fees.how_much_does_a_gekkard_account_cost",
            content: (
              <>
                <p>
                  {t("support.faq.fees.answers.in_accordance")}{" "}
                  <a href='price.html'>{t("support.faq.fees.answers.tariff")}</a>
                </p>
              </>
            )
          }
        ]}
      />
    )
  },
  partnership_program: {
    title: "support.faq.partnership.title",
    area: (
      <FAQTemplate
        title='support.faq.partnership.title'
        items={[
          {
            title: "",
            content: (
              <>
                <p>{t("support.faq.partnership.answers.info")}</p>
              </>
            )
          }
        ]}
      />
    )
  },
  other: {
    title: "support.faq.other.title",
    area: (
      <FAQTemplate
        title='support.faq.other.title'
        items={[
          {
            title: "support.faq.other.where_can_i_see_more_information",
            content: (
              <>
                <div>{t("support.faq.other.answers.please_read")}</div>
                <ol>
                  <li>
                    {" "}
                    <a href='terms-and-conditions.html'>{t("support.faq.other.answers.general_terms")}</a>,{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href='data-protection-policy.html'>{t("support.faq.other.answers.data_protection")}</a>,{" "}
                  </li>{" "}
                  <li>
                    {" "}
                    <a href='fair-usage.html'>{t("support.faq.other.answers.secure_usage")}</a>{" "}
                  </li>
                </ol>
              </>
            )
          },
          {
            title: "support.faq.other.my_gekkard_has_been_compromised",
            content: (
              <>
                <p>{t("support.faq.other.answers.if_you_believe")}</p>
              </>
            )
          }
        ]}
      />
    )
  }
});

const areas = faqAreasMap();

export type AvailableFaqAreas = keyof typeof areas;
export const faqAreasMapKeys = Object.keys(areas) as AvailableFaqAreas[];
