import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";

const KakaoLogin = () => {
    const router = useRouter();
    const { refresh, access, user_pk } = router.query;

    useEffect(() => {
        const CheckTable = async () => {
            if (refresh && access && user_pk) {
                sessionStorage.setItem("refresh", refresh);
                sessionStorage.setItem("access", access);

                try {
                    const response = await axios.get(
                        // `http://127.0.0.1:8000/api/caketables/${user_pk}/`
                        `https://manage.naekkukae.store/api/caketables/${user_pk}/`
                    );
                    console.log(response.data);
                    if (
                        Array.isArray(response.data) &&
                        response.data[0].tablecolor &&
                        response.data[0].tablecolor.trim() !== ""
                    ) {
                        router.push(`/caketables/${user_pk}/`);
                    } else {
                        router.push("/Useruse");
                    }
                } catch (error) {
                    console.error(error);
                    router.push("/Useruse");
                }
            }
        };
        CheckTable();
    }, [refresh, access, user_pk, router]);

    console.log(refresh, access, user_pk);
    return <div>{/* <h1>카카오 로그인 중...</h1> */}</div>;
};

export default KakaoLogin;

// const KakaoLogin = () => {
//   const router = useRouter();
//   const { refresh, access, user_pk } = router.query;

//   useEffect(() => {
//     if (refresh && access && user_pk) {
//       sessionStorage.setItem("refresh", refresh);
//       sessionStorage.setItem("access", access);
//       router.push(`/caketables/${user_pk}/`); // 로그인 후 원하는 페이지로 변경
//     }
//   }, [refresh, access, user_pk, router]);

//   return <div>{/* <h1>카카오 로그인 중...</h1> */}</div>;
// };

// export default KakaoLogin;

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
