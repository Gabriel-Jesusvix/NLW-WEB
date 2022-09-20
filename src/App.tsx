import { useEffect, useState } from "react";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { GameBanner } from "./components/GameBanner";
import * as Dialog from "@radix-ui/react-dialog";
import "./styles/main.css";
import logo from "./assets/logo.svg";
import { Input } from "./components/Form/Input";

interface Game {
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
    fetch("http://localhost:3000/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  });
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
            <Dialog.Portal>
              <Dialog.Overlay className="bg-black/60 inset-0 fixed" />
              <Dialog.Content className="fixed bg-[#121214] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-3xl  font-black">
                  Publique um anúncio
                </Dialog.Title>

                <form className="mt-8 flex flex-col gap-4 ">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Qual o game</label>
                    <Input
                      placeholder="Selecione o jogo que deseja jogar"
                      id="game"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name">Seu nome (ou nickname)</label>
                    <Input
                      id="name"
                      placeholder="Como te chamam dentro do jogo"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="yearsPlaying">
                        Joga ha quantos anos?
                      </label>
                      <Input
                        type="number"
                        id="yearsPlaying"
                        placeholder="Tudo bem ser ZERO"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="yearsPlaying">Qual seu discord?</label>
                      <Input id="discord" placeholder="Usuario#000" />
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="weekDays">Quando costuma jogar?</label>

                      <div className="grid grid-cols-4 gap-2 ">
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Domingo"
                        >
                          D
                        </button>
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Segunda"
                        >
                          S
                        </button>
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Terça"
                        >
                          T
                        </button>
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Quarta"
                        >
                          Q
                        </button>
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Quinta"
                        >
                          Q
                        </button>
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Sexta"
                        >
                          S
                        </button>
                        <button
                          className="w-8 h-8 rounded bg-zinc-900 "
                          title="Sábado"
                        >
                          S
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <label htmlFor="hourStart">Qual horário do dia?</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="time" id="hourStart" placeholder="De" />
                        <Input type="time" id="hourEnd" placeholder="até" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 flex gap-2 text-sm">
                    <Input type="checkbox" />
                    Costumo me conectar ao chat de voz
                  </div>
                  <footer className="mt-4 flex justify-end gap-4">
                    <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-700">
                      Cancelar
                    </Dialog.Close>
                    <button
                      type="submit"
                      className="bg-violet-500 flex  gap-3 items-center px-5 h-12 rounded-md font-semibold
                      hover:bg-violet-600
                      "
                    >
                      <GameController size={24} />
                      Encontrar seu duo
                    </button>
                  </footer>
                </form>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </div>
  );
}