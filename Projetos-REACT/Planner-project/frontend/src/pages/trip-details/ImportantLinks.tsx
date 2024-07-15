import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface ImportantLinksProps {
  openAddNewLinkImportantModal: () => void;
}

interface Links {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks({
  openAddNewLinkImportantModal,
}: ImportantLinksProps) {
  const { tripId } = useParams();

  const [links, setLinks] = useState<Links[]>([]);

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then((res) => setLinks(res.data.links));
  }, [tripId]);

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>
      <div className="space-y-5">
        {links &&
          links.map((link) => (
            <div key={link.id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-zinc-100">
                  {link.title}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                >
                  {link.url}
                </a>
              </div>
              <Link2 className="size-5 text-zinc-400 shrink-0" />
            </div>
          ))}
      </div>

      <Button
        onClick={openAddNewLinkImportantModal}
        variant="secondary"
        size="full"
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  );
}
