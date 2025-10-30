import { lazy, Suspense } from "react";
import styles from "./App.module.css";
import { Modal } from "@/common/components/Modal";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 동적 import로 필요할 때만 로드
const Login = lazy(() => import("@/features/user/components/login/Login"));
const SignUp = lazy(() => import("@/features/user/components/signup/SignUp"));
const Map = lazy(() => import("@/features/map/components/Map"));
const ShelterDetail = lazy(() => import("@/features/shelter-detail/components/ShelterDetail"));

const queryClient = new QueryClient();

function LoadingFallback() {
  return <div className={styles.mobileFullscreen}>로딩 중...</div>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={styles.mobileFullscreen}>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/map" element={<Map />} />
              <Route path="/detail" element={<ShelterDetail />} />
            </Routes>
          </Suspense>
          <Modal />
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
