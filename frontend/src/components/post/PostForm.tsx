import { useState } from "react";
import { Image } from "lucide-react";
import { Buttons } from "../ui/Buttons";

export const PostForm = () => {
  const [text, setText] = useState("");

  return (
    <div className="max-w-full min-h-41 bg-white border border-gray-100 rounded-xl p-4 shadow-[4px_4px_10px_rgba(0,0,0,0.08)] font-sans flex flex-col justify-between transition-all duration-300">
      {/* Área de Texto */}
      <div className="grow">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="E aí, o que está rolando?"
          rows={3}
          className="w-full text-lg text-slate-900 placeholder:text-slate-400 resize-none outline-none border-none p-0 focus:ring-0 bg-transparent"
        />
      </div>

      {/* Container inferior (Linha + Ações) */}
      <div className="mt-2">
        {/* Linha Divisória */}
        <hr className="border-gray-100 mb-2" />

        {/* Rodapé de Ações */}
        <div className="flex items-center justify-between">
          {/* Ícone de Anexar Imagem */}
          <button
            type="button"
            className="text-button hover:bg-button/10 p-2 rounded-full transition-colors cursor-pointer outline-none"
            aria-label="Anexar imagem"
          >
            <Image size={24} strokeWidth={1.5} />
          </button>

          {/* Botão Postar */}
          <Buttons
            type="submit"
            disabled={!text.trim()}
            className="h-8 px-6 text-[14px] font-bold flex items-center justify-center shadow-[0_4px_12px_rgba(0,149,255,0.3)]"
          >
            Postar
          </Buttons>
        </div>
      </div>
    </div>
  );
};
