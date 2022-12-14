import { useEffect, useState } from "react";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { GameBanner } from "./components/GameBanner";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles/main.css";
import logo from "./assets/logo.svg";
import { CreateAddModal } from "./components/CreateAddModal";
import axios from "axios";

export interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

export function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios(`${import.meta.env.VITE_API_KEY}/games`).then((response) => {
      setGames(response.data);
    });
  }, []);
  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{" "}
        <span className="bg-bg-gradient text-transparent bg-clip-text">
          duo
        </span>{" "}
        está aqui
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>
      <div className="pt-1 bg-bg-gradient self-stretch rounded-lg mt-8 overflow-hidden ">
        <div className="bg-[#2A2634] px-8 py-6 flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo
            </strong>
            <span className="text-zinc-400 block">Publique um anúncio.</span>
          </div>
          <Dialog.Root>
            <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 transition text-white rounded flex items-center gap-3">
              <MagnifyingGlassPlus size={24} />
              Publicar Anuncio
            </Dialog.Trigger>

            <CreateAddModal />
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}
