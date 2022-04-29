import { FC, useState, useEffect, useRef } from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { adminActions } from "../../../../store/slice/adminSlice";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

import SectionWrapper from "../UI/Section";
import SectionHeading from "../UI/SectionHeading";
import Field from "../UI/Field";
import Label from "../UI/Label";
import { useAppSelector } from "../../../../hooks/useAppSelector";

const DriveLabel = styled(Label)`
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  cursor: pointer;
`;

const SectionMedia: FC = () => {
  const router = useRouter();
  const hasGetCode = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const { driveToken } = useAppSelector((state) => state.admin);
  const [test, setTest] = useState<string>("");
  const [accessToTokenUri, setAccessToTokenUri] =
    useState<string>("/admin/new");
  console.log(driveToken);
  // const getDriveUri = async () => {
  //   try {
  //     const response = await fetch("/api/admin/form/drive/auth").catch(() => {
  //       throw new Error("沒有取得前往開權限的連結");
  //     });
  //     const data = await response.json().catch(() => {
  //       throw new Error("轉換連結失敗");
  //     });

  //     setAccessToTokenUri(data.data.uri);
  //     hasGetCode.current = true;
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };
  const query = router.query;
  console.log(query);

  // const getDriveToken = async () => {
  //   const { code } = query;
  //   try {
  //     const response = await fetch("/api/admin/form/drive/auth", {
  //       method: "POST",
  //       headers: { "content-type": "application/json" },
  //       body: JSON.stringify({ code }),
  //     }).catch(() => {
  //       throw new Error("發送取得token的post失敗");
  //     });
  //     const data = await response.json().catch(() => {
  //       throw new Error("轉換token的json失敗");
  //     });
  //     dispatch(adminActions.setUserDriveToken(data.data));
  //     setTest("1");
  //     router.push("/admin/new");
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };

  useEffect(() => {
    if (!router.isReady) return;
    if (query.code) {
      console.log("d");
      // getDriveToken();
      return;
    }
    // getDriveUri();
  }, [router.isReady]);

  return (
    <SectionWrapper>
      <SectionHeading>媒體設定</SectionHeading>
      <Field>
        {test !== "" ? (
          <DriveLabel style={{ cursor: "default", color: "#aaa" }}>
            已連結至雲端
          </DriveLabel>
        ) : (
          <Link href={accessToTokenUri}>
            <DriveLabel>連接雲端硬碟</DriveLabel>
          </Link>
        )}
      </Field>
    </SectionWrapper>
  );
};

export default SectionMedia;
