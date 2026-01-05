import React, { useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { fetchHelper } from "../services/FetchHelper";
// import { useAuth } from "../auth/AuthContext";
import { useAuth } from "../contexts/AuthContexts";
import { useAppProvider } from "../contexts/AppContext";
import Button from "../components/Button";
import Input from "../components/Input";
import { validationSchema } from "../services/GeneralHelper";
import { toast } from "react-toastify";

function LoginPage() {
  const navigate = useNavigate();
  const { LoadUser } = useAppProvider();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    satker: "",
    password: "",
  });

  // State untuk mendeteksi desktop
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  // Update isDesktop saat resize
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    var CryptoJS = require("crypto-js");
    var encryptedPass = CryptoJS.AES.encrypt(
      formData.password,
      "YzDWFXF8LmfUMdOn0RtZ0rYC90zF5wpoz87oCk"
    ).toString();

    try {
      const response = await fetchHelper(
        "https://rokeubmn.kemnaker.go.id/api/auth/login",
        "POST",
        { kode_biro: parseInt(formData.satker), password: encryptedPass }
      );
      if (response?.success) {
        login(response?.data?.access_token);
        sessionStorage.setItem("justLoggedIn", "true");
        LoadUser();
        navigate("/dashboard-utama");
        setErrorMessage(null);
      } else {
        toast.error(response?.message);
      }
    } catch (err) {
      setErrorMessage(
        err.toString().includes("Unauthorized")
          ? "Kode Satuan Kerja atau Password salah!"
          : err.toString()
      );
      console.log(err, err.toString());
      toast.error(err);
    } finally {
    }
  };
  const isMobile = window.innerWidth <= 768;

  return (
  <div style={{ height: "100vh", width: "100%", overflow: "hidden" }}>
    {/* HEADER */}
    <div
      style={{
        height: isMobile ? "180px" : "320px",
        background: "linear-gradient(90deg, #59c7ff, #2f8afd)",
        display: "flex",
        alignItems: "center",
        padding: isMobile ? "0 20px" : "0 70px",        
      }}
    >
      <img src="/logo-kemnaker.png" alt="logo" height="129" width="376" />
    </div>

    {/* BODY */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isDesktop ? "1fr 1fr" : "1fr",
        height: "calc(100vh - 110px)",
      }}
    >
      {/* LEFT CONTENT */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          paddingLeft: "25%",
          height: "70%",
          maxWidth: "80%",
        }}
      >
        <div style={{ width: "100%", maxWidth: 400 }}>
          <h1 style={{ fontWeight: 800, marginBottom: 4 , fontSize: isMobile ? 26 : 35, lineHeight: 1.2,}}>
            Selamat Datang di
            <br />
            <span style={{ fontWeight: 900 }}>SiAKBAR</span>
          </h1>
          <p style={{ color: "#777", marginBottom: isMobile ? 24 : 40, fontSize: isMobile ? 14 : 16,}}>
            Anggaran, Keuangan, dan Barang
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <Input
              label="Satuan Kerja"
              name="satker"
              required
              value={formData.satker}
              validate={validationSchema.onlyNumber}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
            />

            {errorMessage && (
              <span style={{ color: "red", textAlign: "center" }}>
                {errorMessage}
              </span>
            )}

            <Button type="submit" style={{ width: "100%" }}>
              Login
            </Button>
          </form>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      {isDesktop && (
        <div
          style={{
            position: "absolute",
            top: "170px",        //  naik ke atas
            right: "30px",
            left:"50%",
            width: "40%",
            height: "80%",
            backgroundImage: 'url("/background-ver1.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",

            borderRadius: "160px 20px 160px 20px",
            boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
          }}
        />
      )}

    </div>
  </div>
);

}

export default LoginPage;
