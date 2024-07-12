import "./style.css";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getCookieData } from "../utils/shared";
import { CtxAuthInfo, ICtxAuth } from "../contexts/AuthContext";
import { apiGetUas, UasInfo } from "../api/gate/get-uas";
import { apiGetClientDetails } from "../api/gate/get-client-details";

interface IParams {
  children?: any;
}

const cookies = getCookieData();

export default function UasTokenProvider({ children }: IParams) {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<ICtxAuth | null>(null);
  const [uasInfo, setUasInfo] = useState<UasInfo | undefined>();

  const onFocus = () => {
    if (!visible) setVisible(true);
  };

  useEffect(() => {
    document.getElementById("chat-main-container")!.addEventListener("focusin", onFocus);
  }, []);

  const getUasInfo = async () => {
    // @ts-ignore
    const accountId = cookies["accountId"];

    if (!accountId) {
      setState({ token: "UAS anonymous" });
      setLoading(false);
      return;
    }

    const detailsRes = await apiGetClientDetails();

    if (detailsRes.status !== "success" || !detailsRes.data?.result?.phone) {
      setState({ token: "UAS anonymous" });
      setLoading(false);
      return;
    }

    const uasRes = await apiGetUas({
      accountId: accountId,
      phone: detailsRes.data.result.phone
    });

    if (uasRes.status !== "success") {
      setState({ token: "UAS anonymous" });
      setLoading(false);
      return;
    }

    if (uasRes.data.result?.token) {
      setState({
        phone: detailsRes.data.result.phone,
        token: `UAS ${uasRes.data.result.token}`
      });
      setLoading(false);
    } else {
      // @ts-ignore
      setState({ phone: detailsRes.data.result.phone });
      setUasInfo(uasRes.data.result);
    }
  };

  useEffect(() => {
    (async () => {
      if (visible) {
        setLoading(true);

        await getUasInfo();
      }
    })();
  }, [visible]);

  useEffect(() => {
    (async () => {
      if (state?.phone && uasInfo) {
        const { value } = await Swal.fire({
          input: "text",
          allowEscapeKey: true,
          showCloseButton: true,
          title: "Enter SMS code",
          showConfirmButton: true,
          allowOutsideClick: true
        });

        if (!value) {
          setState({ token: "UAS anonymous" });
          setLoading(false);
          return;
        }

        const uasRes = await apiGetUas({
          code: value,
          sessid: uasInfo.sessid,
          phone: state.phone,
          // @ts-ignore
          accountId: cookies["accountId"]
        });

        if (uasRes.status === "success") {
          if (uasRes.data.result?.token) {
            setState({
              phone: state.phone,
              token: `UAS ${uasRes.data.result.token}`
            });
          } else {
            // @ts-ignore
            setState({ phone: detailsRes.data.result.phone });
            setUasInfo(uasRes.data.result);
          }
        }

        setLoading(false);
      }
    })();
  }, [uasInfo]);

  return (
    <CtxAuthInfo.Provider
      value={{
        config: state,
        loading: loading
      }}
    >
      {children}
    </CtxAuthInfo.Provider>
  );
}
