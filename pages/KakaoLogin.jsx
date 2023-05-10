// // pages/kakaoLogin.js
import { useRouter } from "next/router";
import { useEffect } from "react";


const KakaoLogin = () => {
  const router = useRouter();
  const { refresh, access, user_pk } = router.query;

  useEffect(() => {
    if (refresh && access && user_pk) {
      sessionStorage.setItem("refreshToken", refresh);
      sessionStorage.setItem("accessToken", access);
      router.push(`/caketables/${user_pk}/`); // 로그인 후 원하는 페이지로 변경
    }
  }, [refresh, access, user_pk, router]);

  return <div>{/* <h1>카카오 로그인 중...</h1> */}</div>;
};

export default KakaoLogin;




// const KakaoLogin = () => {
//   const router = useRouter();
//   const { refresh, access } = router.query;

//   useEffect(() => {
//     if (refresh && access) {
//       sessionStorage.setItem("refreshToken", refresh);
//       sessionStorage.setItem("accessToken", access);
//       router.push("/Useruse"); // 로그인 후 원하는 페이지로 변경
//     }
//   }, [refresh, access, router]);

//   return <div>{/* <h1>카카오 로그인 중...</h1> */}</div>;
// };

// export default KakaoLogin;
