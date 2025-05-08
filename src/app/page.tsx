"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { FlipText } from "@/components/magicui/flip-text";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { SiInstagram, SiGithub, SiHuggingface } from "react-icons/si";

export default function Page() {
  const [inputText, setInputText] = useState<string>(""); // state untuk input user
  const [response, setResponse] = useState<string | null>(null); // state untuk menyimpan hasil

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      setShowAlert(true); // handle ketika input tidak ada
      return;
    }
    setLoading(true);
    audioRef.current?.play();
    try {
      // fetch api
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      setResponse("[ Terjadi Error ]");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setResponse(null); // reset response when input changes
  };

  return (
    <main className="w-svw h-svh flex items-center justify-center">
      <audio ref={audioRef} src="/audio/result_bgm.MP3" preload="auto" />
      <div className="h-svh w-140 px-4 flex flex-col items-center z-10">
        <SparklesText className="mt-10 mb-4 font-bold text-pink-500 text-center">
          <Image src="/image/logoWeb.png" width={400} height={400} alt="Logo by SirGhazian" />
        </SparklesText>

        <p className="mb-7 text-center text-[0.8rem] px-3">
          Yuk cari tau, orang yang lagi kamu chat itu lagi ngode kamu atau cuma basa-basi doang!
          <span className="font-bold text-pink-800"> Sadari sebelum terlambat!</span>
        </p>

        <Input
          value={inputText}
          onChange={handleInputChange} // update this handler
          placeholder="kamu cantik banget!"
          className="text-center bg-white ring-1 ring-pink-400"
        />

        <Button
          className="w-full my-2 bg-pink-400 hover:bg-pink-500 font-semibold"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Loading..." : "Cek"}
        </Button>

        {showAlert && (
          <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
            <AlertDialogContent className="bg-white font-[Poppins]">
              <AlertDialogHeader>
                <AlertDialogTitle>⚠️ Input tidak boleh kosong!</AlertDialogTitle>
                <AlertDialogDescription>Silakan isi teks terlebih dahulu!</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setShowAlert(false)}>Tutup</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}

        {/* Tampilkan hasil jika ada */}
        {/* <div>{response && !loading ? response : ""}</div> */}

        {response && !loading ? (
          <div className="mt-4 p-4 bg-pink-100 rounded-lg w-full flex flex-col items-center">
            <div className="w-full h-13 ring-3 ring-pink-300 rounded-lg flex items-center justify-center mb-4">
              <FlipText
                delayMultiple={0.15}
                className="text-4xl font-bold text-pink-600 font-[Salsa]"
              >
                {response}
              </FlipText>
            </div>
            {response && response[0] === "Non-Flirty" && (
              <p className="text-gray-600 mt-2 text-center">
                Sayang sekali... sepertinya ini bukan ngode deh 😔...
              </p>
            )}
            {response && response[0] === "Flirty" && (
              <p className="text-gray-600 mt-2 text-center">
                Kayanya ada yang lagi ngode nich 👀...
              </p>
            )}
          </div>
        ) : (
          ""
        )}

        {!response && !loading && (
          <div className="text-sm space-y-2 my-2 text-center">
            <div className="bg-pink-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">⚠️ Catatan Penting:</h3>
              <p className="text-gray-600">
                Aplikasi ini hanyalah berupa prototipe, kesalahan deteksi teks mungkin saja terjadi
                karena keterbatasan dataset yang akurat, dan faktor lainnya.
              </p>
            </div>

            <div className="bg-pink-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">🤝 Bantuan:</h3>
              <p className="text-gray-600">
                Jika mengalami masalah atau ada pertanyaan, silakan hubungi creator di kontak yang
                tersedia di bawah. 👇
              </p>
            </div>

            <div className="bg-white p-3 rounded-lg flex items-center justify-center text-2xl text-pink-500">
              <a href="https://github.com/SirGhazian" target="_blank">
                <SiGithub className="hover:text-pink-300 duration-300" />
              </a>
              <a href="https://huggingface.co/SirGhazian" target="_blank">
                <SiHuggingface className="mx-7 hover:text-pink-300 duration-300" />
              </a>
              <a href="https://instagram.com/ghazian_tza" target="_blank">
                <SiInstagram className="hover:text-pink-300 duration-300" />
              </a>
            </div>

            <div className="p-2 grid grid-cols-3 items-center">
              <Separator orientation="horizontal" className="bg-black/20" />
              <p className="text-gray-700 font-medium flex items-center justify-center">
                2025 - SirGhazian
              </p>
              <Separator orientation="horizontal" className="bg-black/20" />
            </div>
          </div>
        )}

        {loading && <Skeleton className="my-2 h-[250px] w-full mb-2 bg-pink-200" />}
      </div>
    </main>
  );
}
