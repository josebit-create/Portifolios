import { Link2, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";

interface AddNewLinkImportantModalProps {
  closeAddNewLinkImportantModal: () => void;
  createNewLink: (event: FormEvent<HTMLFormElement>) => void;
  setLinkTitle: (title: string) => void;
  setLinkUrl: (url: string) => void;
}

export function AddNewLinkImportantModal({
  closeAddNewLinkImportantModal,
  createNewLink,
  setLinkTitle,
  setLinkUrl,
}: AddNewLinkImportantModalProps) {

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar Link</h2>
            <button onClick={closeAddNewLinkImportantModal}>
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos convidados podem visualizar os links importantes.
          </p>
        </div>

        <form onSubmit={createNewLink} className="space-y-3">
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-8">
            <Tag className="text-zinc-400 size-5" />
            <input
              type="text"
              name="linkTitle"
              placeholder="Título do Link"
              className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none"
              onChange={(e) => setLinkTitle(e.target.value)}
            />
          </div>
          <div className="h-14 px-5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-8">
            <Link2 className="text-zinc-400 size-5" />
            <input
              type="text"
              name="linkUrl"
              placeholder="URL"
              className="bg-transparent text-lg placeholder-zinc-400 w-full outline-none"
              onChange={(e) => setLinkUrl(e.target.value)}
            />
          </div>
          <Button type="submit" variant="primary" size="full">
            Salvar Link
          </Button>
        </form>
      </div>
    </div>
  );
}
